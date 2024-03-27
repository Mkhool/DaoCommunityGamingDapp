const { assert, expect } = require("chai");
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


describe("StakingContract", function () {

    it.skip("Should set the right owner", async function () {
        const { stakingContract, owner } = await loadFixture(deployContractFixture);
        expect(await stakingContract.owner()).to.equal(owner.address);
    });

    it.skip("Should allow staking", async function () {
        const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);

        // Mint des jetons pour le propriétaire pour tester le staking
        await jeton.mint(owner.address, stakeAmount);

        // Approbation du contrat de staking pour dépenser les jetons du propriétaire
        await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

        // Staking des jetons
        await stakingContract.connect(owner).stake(stakeAmount);

        // Vérifier le solde de staking
        const balance = await stakingContract.stakingBalance(owner.address);
        expect(balance).to.equal(stakeAmount);
    });

    it.skip("should emit the skake", async function () {
        const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);
        await jeton.mint(owner.address, stakeAmount);
        await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

        const allowance = await jeton.allowance(owner.address, stakingContractAdress);
        expect(allowance).to.be.at.least(stakeAmount);

        // Staking des jetons et attente de l'événement Staked
        await expect(stakingContract.connect(owner).stake(stakeAmount))
            .to.emit(stakingContract, "Staked")
            .withArgs(owner.address, stakeAmount);
    })

    it.skip("Should not allow staking without approval", async function () {
        const { stakingContract, owner } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);

        // Essayer de staker sans approbation préalable devrait être rejeté
        await expect(stakingContract.connect(owner).stake(stakeAmount)).to.be.reverted;
    });

    it("Should allow unstaking", async function () {
        const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);
        const initialStakingContractSupply = ethers.parseUnits("500000", 18);

        // Le propriétaire transfère des tokens au contrat de staking pour les récompenses futures
        await jeton.connect(owner).transfer(stakingContractAdress, initialStakingContractSupply);

        // Récupérer et loguer la balance du contrat de staking
        const stakingContractBalance = await jeton.balanceOf(stakingContractAdress);
        console.log("Staking contract balance:", ethers.formatUnits(stakingContractBalance, 18));

        // Approbation et staking
        await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);
        await stakingContract.connect(owner).stake(stakeAmount);

        // Récupérez et loguez le timestamp actuel avant le passage du temps
        let currentBlock = await ethers.provider.getBlock("latest");

        // Simuler le passage du temps pour accumuler des récompenses
        await ethers.provider.send("evm_increaseTime", [86400]); // 1 jour
        await ethers.provider.send("evm_mine", []);

        const contractBalance = await jeton.balanceOf(stakingContractAdress);
        console.log("Contract balance before unstaking:", contractBalance.toString());

        // Récupérez et loguez le timestamp après le passage du temps
        currentBlock = await ethers.provider.getBlock("latest");

        // Unstaking des jetons
        await stakingContract.connect(owner).unstake(stakeAmount);

        // Vérification du solde de jetons après unstaking
        const finalBalance = await jeton.balanceOf(owner.address);

        // La balance finale devrait être égale à la balance initiale
        const initialMintAmount = ethers.parseUnits("1000000", 18); // Montant minté au déploiement
        expect(finalBalance).to.equal(initialMintAmount);
    });


    it.skip("should emit the Unstaked event on unstaking", async function () {
        const { jeton, stakingContract, owner, stakingContractAdress } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);

        // Mint et approbation pour permettre au contrat de staking de retirer les jetons
        await jeton.mint(owner.address, stakeAmount);
        await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

        // Staking des jetons
        await stakingContract.connect(owner).stake(stakeAmount);

        // S'assurer que les jetons sont stakés avant de tenter de les unstake
        const initialStakeBalance = await stakingContract.stakingBalance(owner.address);
        expect(initialStakeBalance).to.equal(stakeAmount);

        // Unstaking des jetons et attente de l'événement Unstaked
        await expect(stakingContract.connect(owner).unstake(stakeAmount))
            .to.emit(stakingContract, "Unstaked")
            .withArgs(owner.address, stakeAmount);
    });

    it.skip("Should receive correct amount rewards", async function () {
        const { jeton, stakingContract, stakingContractAdress, owner } = await loadFixture(deployContractFixture);
        const stakeAmount = ethers.parseUnits("100", 18);

        // Vérifiez et loguez la balance initiale
        const initialBalance = await jeton.balanceOf(owner.address);
        console.log("Initial balance:", initialBalance.toString());

        // Approbation du contrat de staking pour dépenser les jetons du propriétaire
        await jeton.connect(owner).approve(stakingContractAdress, stakeAmount);

        // Staking des jetons
        await stakingContract.connect(owner).stake(stakeAmount);

        // Log la balance après le staking
        const balanceAfterStake = await jeton.balanceOf(owner.address);
        console.log("Balance after staking:", balanceAfterStake.toString());

        // Récupérez et log le timestamp actuel avant le passage du temps
        let currentBlock = await ethers.provider.getBlock("latest");
        console.log("Current timestamp before time increase:", currentBlock.timestamp);

        // Simuler le passage du temps pour accumuler des récompenses
        await ethers.provider.send("evm_increaseTime", [86400]); // Augmente le temps de 1 jour
        await ethers.provider.send("evm_mine", []);

        // Récupérez et loguez le timestamp après le passage du temps
        currentBlock = await ethers.provider.getBlock("latest");
        console.log("Current timestamp after time increase:", currentBlock.timestamp);

        // Unstaking des jetons + récompenses
        await stakingContract.connect(owner).unstake(stakeAmount);

        // Vérification du solde de jetons après unstaking
        const finalBalance = await jeton.balanceOf(owner.address);
        console.log("Final balance:", finalBalance.toString());

        const initialMintAmount = ethers.parseUnits("1000000", 18); // Montant minté au déploiement
        const expectedReward = stakeAmount; // Avec un taux d'intérêt de 100%, la récompense est égale au montant staké pour un jour

        // Le solde final attendu inclut le montant initialement minté, moins le montant staké puis restitué, plus les récompenses
        // Si le stakeAmount est restitué après unstake, on s'attend à avoir initialMintAmount + expectedReward comme solde final.
        const expectedFinalBalance = initialMintAmount + expectedReward;

        // Loguez les résultats finaux pour le débogage
        console.log("Expected final balance:", expectedFinalBalance.toString());

        expect(finalBalance).to.equal(expectedFinalBalance);
    });

    describe("StakingContract - Interest Rate Management", function () {
        it("Should allow owner to change the daily interest rate", async function () {
            const { stakingContract, owner } = await loadFixture(deployContractFixture);
            const newInterestRate = 200; // Exemple de nouveau taux d'intérêt de 2%

            // Tentative de modification du taux par le propriétaire doit réussir
            await expect(stakingContract.connect(owner).setDailyInterestRate(newInterestRate))
                .to.not.be.reverted;

            // Vérifier que le taux d'intérêt a été mis à jour
            const updatedRate = await stakingContract.dailyInterestRate();
            expect(updatedRate).to.equal(newInterestRate);
        });

        it("Should not allow other account than owner to change the daily interest rate", async function () {
            const { addr1 } = await loadFixture(deployContractFixture);
            const newInterestRate = 200; // Exemple de nouveau taux d'intérêt de 2%
            // Tentative de modification du taux par un autre compte doit échouer
            await expect(stakingContract.connect(addr1).setDailyInterestRate(newInterestRate))
                .to.be.reverted;
        })
    });
})




