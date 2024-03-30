const { expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');


async function deployContractFixture() {
    // Déployer le contract Jeton
    [owner, addr1] = await ethers.getSigners();
    const JetonFactory = await ethers.getContractFactory("Jeton");
    jeton = await JetonFactory.deploy();
    await jeton.waitForDeployment();
    const jetonAdress = await jeton.getAddress();

    // Déployer StakingContract avec l'adresse de Jeton 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(jetonAdress);
    const stakingContractAdress = await stakingContract.getAddress();

    return { jeton, stakingContract, stakingContractAdress, owner, addr1 };
};

async function deployContractFixtureForInternalFunction() {
    // Déployer le contract Jeton
    [owner, addr1] = await ethers.getSigners();
    const JetonFactory = await ethers.getContractFactory("Jeton");
    jeton = await JetonFactory.deploy();
    await jeton.waitForDeployment();
    const jetonAdress = await jeton.getAddress();

    // Déployer TestStakingContract avec l'adresse de Jeton 
    const TestStakingContractFactory = await ethers.getContractFactory("TestStakingContract");
    TestStakingContract = await TestStakingContractFactory.deploy(jetonAdress);
    const TestStakingContractAdress = await TestStakingContract.getAddress();

    return { jeton, TestStakingContract, TestStakingContractAdress, owner, addr1 };
};

describe("StakingContract", function () {

    describe("Deployment", function () {
        // Tests relatifs au déploiement du contrat
        it("Should set the right owner", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            expect(await stakingContract.owner()).to.equal(owner.address);
        });
    });

    // Tests relatifs à la fonctionnalité de staking
    describe("Staking", function () {

        it("Should allow staking", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);

            // Mint des jetons pour le propriétaire pour tester le staking
            await jeton.Mint(owner.address, stakeAmount);

            // Approbation du contrat de staking pour dépenser les jetons du propriétaire
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

            // Staking des jetons
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Vérifier le solde de staking
            const balance = await stakingContract.stakingBalance(owner.address);
            expect(balance).to.equal(stakeAmount);
        });


        it("Should return 0 reward for no stake", async function () {
            const { TestStakingContract, owner } = await loadFixture(deployContractFixtureForInternalFunction);

            // Cas où le montant staké est 0
            let reward = await TestStakingContract.testCalculateReward(owner.address);
            expect(reward).to.equal(0);
        });

        it("Should return 0 reward immediately after staking", async function () {
            const { jeton, TestStakingContract, owner, TestStakingContractAdress } = await loadFixture(deployContractFixtureForInternalFunction);
            const stakeAmount = ethers.parseUnits("100", 18);

            // Approbation et staking
            await jeton.connect(owner).approve(TestStakingContractAdress, stakeAmount);
            await TestStakingContract.connect(owner).Stake(stakeAmount);

            // Calculer immédiatement la récompense après le staking
            const reward = await TestStakingContract.testCalculateReward(owner.address);
            // Vérifier que la récompense est 0 puisque le temps de staking n'a pas encore commencé à accumuler des récompenses
            expect(reward).to.equal(0);
        });

        it("Should not allow staking without approval", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);

            // Essayer de staker sans approbation préalable devrait être rejeté
            await expect(stakingContract.connect(owner).Stake(stakeAmount)).to.be.reverted;
        });
    });

    // Tests relatifs à la fonctionnalité d'unstaking
    describe("Unstaking", function () {

        it("Should allow unstaking", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            const initialStakingContractSupply = ethers.parseUnits("500000", 18);

            // Le propriétaire transfère des tokens au contrat de staking pour les récompenses futures
            await jeton.connect(owner).transfer(stakingContractAdress, initialStakingContractSupply);

            // Approbation et staking
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Unstaking des jetons
            await expect(stakingContract.connect(owner).Unstake(stakeAmount))
            .to.emit(stakingContract, 'Unstaked')
            .withArgs(owner.address, stakeAmount); 
        });

        it("Should receive correct amount rewards when unstaking", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            const initialStakingContractSupply = ethers.parseUnits("500000", 18);

            // Montant initialement minté au déploiement pour le propriétaire
            const initialMintAmount = ethers.parseUnits("500000", 18);

            // Transfert des tokens au contrat de staking pour les récompenses futures
            await jeton.connect(owner).transfer(stakingContractAdress, initialStakingContractSupply);

            // Approbation et staking
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Simuler le passage du temps pour accumuler des récompenses
            await ethers.provider.send("evm_increaseTime", [86400]); // 1 jour
            await ethers.provider.send("evm_mine", []);

            // Unstake des jetons
            await stakingContract.connect(owner).Unstake(stakeAmount);

            // Vérification du solde de jetons après unstaking, incluant les récompenses
            const finalBalance = await jeton.balanceOf(owner.address);
            const expectedRewards = stakeAmount; // Avec un taux d'intérêt de 100% par jour
            const expectedFinalBalance = initialMintAmount + expectedRewards; // Montant initial + récompenses

            // Définir une tolérance pour tenir compte des petites différences dans le calcul des récompenses
            const tolerance = ethers.parseUnits("0.002", 18); // Tolérance de 0.002 jetons

            // Convertir en bigint pour la comparaison
            const finalBalanceBigInt = BigInt(finalBalance.toString());
            const expectedFinalBalanceBigInt = BigInt(expectedFinalBalance.toString());
            const toleranceBigInt = BigInt(tolerance.toString());

            // Calculer la différence absolue entre le solde final attendu et le solde final réel
            const difference = finalBalanceBigInt > expectedFinalBalanceBigInt ?
                finalBalanceBigInt - expectedFinalBalanceBigInt :
                expectedFinalBalanceBigInt - finalBalanceBigInt;

            // Vérifier que la différence est inférieure ou égale à la tolérance
            expect(difference <= toleranceBigInt).to.be.true;
        });

        it("Should not allow unstaking if contract balance is insufficient", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);

            // Approbation et staking
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Unstaking des jetons
            await expect(stakingContract.connect(owner).Unstake(stakeAmount)).to.be.revertedWithCustomError(
                stakingContract,
                "NotEnoughFundInContract"
            )            
        });

        it("Should not allow unstake more than you have staked", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const approveAmount = ethers.parseUnits("120", 18);
            const stakeAmount = ethers.parseUnits("100", 18);
            const moreThanAmount = ethers.parseUnits("110", 18);
            // Approbation et staking
            await jeton.connect(owner).approve(stakingContractAdress, approveAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);
            await expect(stakingContract.connect(owner).Unstake(moreThanAmount)).to.be.revertedWithCustomError(
                stakingContract,
                "CannotwithdrawMorThanYouHaveStake"
            )
        });

        it("Should not allow unstaking if you have not stake tokens", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            await expect(stakingContract.connect(owner).Unstake(stakeAmount)).to.be.revertedWithCustomError(
                stakingContract,
                "YouDontHaveTokenToUnstake"
            )
        });

        it("Should not allow staking 0 tokens", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("0", 18);
            await expect(stakingContract.connect(owner).Stake(stakeAmount)).to.be.revertedWithCustomError(
                stakingContract,
                "CanStakeZeroToken"
            )
        });
        it("should keep isStaking as true when staking balance is not zero after unstaking", async function() {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const initialStakingContractSupply = ethers.parseUnits("500000", 18);
            await jeton.connect(owner).transfer(stakingContractAdress, initialStakingContractSupply);
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.approve(stakingContractAdress, stakeAmount);
            await stakingContract.Stake(stakeAmount);
        
            // Unstake d'un montant inférieur à celui staké
            const unstakeAmount = ethers.parseUnits("50", 18);
            await stakingContract.Unstake(unstakeAmount);
        
            // Vérifier que isStaking est toujours true pour le sender
            const isStakingAfter = await stakingContract.isStaking(owner.address);
            expect(isStakingAfter).to.equal(true);
        });
    });

    describe("Rewards Calculation & Interest Rate Management", function () {
        it("Should allow owner to change the daily interest rate", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            const newInterestRate = 200; // Exemple de nouveau taux d'intérêt

            // Tentative de modification du taux par le propriétaire doit réussir
            await expect(stakingContract.connect(owner).SetDailyInterestRate(newInterestRate))
                .to.not.be.reverted;

            // Vérifier que le taux d'intérêt a été mis à jour
            const updatedRate = await stakingContract.DailyInterestRate();
            expect(updatedRate).to.equal(newInterestRate);
        });

        it("Should not allow other account than owner to change the daily interest rate", async function () {
            const { addr1 } = await loadFixture(deployContractFixture);
            const newInterestRate = 200; 
            // Tentative de modification du taux par un autre compte doit échouer
            await expect(stakingContract.connect(addr1).SetDailyInterestRate(newInterestRate))
                .to.be.reverted;
        })
    });

    describe("Event", function () {
        it("should emit the skate", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.Mint(owner.address, stakeAmount);
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

            const allowance = await jeton.allowance(owner.address, stakingContractAdress);
            expect(allowance).to.be.at.least(stakeAmount);

            // Staking des jetons et attente de l'événement Staked
            await expect(stakingContract.connect(owner).Stake(stakeAmount))
                .to.emit(stakingContract, "Staked")
                .withArgs(owner.address, stakeAmount);
        })

        it("should emit the Unstaked event on unstaking", async function () {
            const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            const initialStakingContractSupply = ethers.parseUnits("500000", 18);
            // Le propriétaire transfère des tokens au contrat de staking pour les récompenses futures
            await jeton.connect(owner).transfer(stakingContractAdress, initialStakingContractSupply);

            // Mint et approbation pour permettre au contrat de staking de retirer les jetons
            await jeton.Mint(owner.address, stakeAmount);
            await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

            // Staking des jetons
            await stakingContract.connect(owner).Stake(stakeAmount);

            // S'assurer que les jetons sont stakés avant de tenter de les unstake
            const initialStakeBalance = await stakingContract.stakingBalance(owner.address);
            expect(initialStakeBalance).to.equal(stakeAmount);

            // Unstaking des jetons et attente de l'événement Unstaked
            await expect(stakingContract.connect(owner).Unstake(stakeAmount))
                .to.emit(stakingContract, "Unstaked")
                .withArgs(owner.address, stakeAmount);
        });
    });
})




