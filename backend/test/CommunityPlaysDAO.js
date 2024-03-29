const { assert, expect } = require("chai");
const { ethers, waffle } = require('hardhat');
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
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer daoContract avec l'adresse de Jeton 
    const daoContractFactory = await ethers.getContractFactory("CommunityPlaysDAO");
    daoContract = await daoContractFactory.deploy(jetonAdress, stakingContractAddress);
    const daoContractAddress = await daoContract.getAddress();

    return { jeton, daoContract, daoContractAddress, stakingContract, stakingContractAddress, owner, addr1 };
};

async function deployTESTContractFixture() {
    // Déployer le contract Jeton
    [owner, addr1] = await ethers.getSigners();
    const JetonFactory = await ethers.getContractFactory("Jeton");
    jeton = await JetonFactory.deploy();
    await jeton.waitForDeployment();
    const jetonAdress = await jeton.getAddress();
    // Déployer StakingContract avec l'adresse de Jeton 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(jetonAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer daoContract avec l'adresse de Jeton 
    const testDaoContractFactory = await ethers.getContractFactory("TestCommunityPlaysDAO");
    testDaoContract = await testDaoContractFactory.deploy(jetonAdress, stakingContractAddress);
    const testDaoContractAdress = await daoContract.getAddress();
    return { jeton, jetonAdress, testDaoContract, testDaoContractAdress, stakingContract, stakingContractAddress, owner, addr1 };
};

async function deployStakingOwnerFixture() {
    // Déployer le contract Jeton
    [owner, addr1] = await ethers.getSigners();
    const JetonFactory = await ethers.getContractFactory("Jeton");
    jeton = await JetonFactory.deploy();
    await jeton.waitForDeployment();
    const jetonAdress = await jeton.getAddress();
    // Déployer StakingContract avec l'adresse de Jeton 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(jetonAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer daoContract avec l'adresse de Jeton 
    const daoContractFactory = await ethers.getContractFactory("CommunityPlaysDAO");
    daoContract = await daoContractFactory.deploy(jetonAdress, stakingContractAddress);
    const daoContractAddress = await daoContract.getAddress();
    // Simuler le staking
    const stakeAmount = ethers.parseUnits("100", 18);
    await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
    await stakingContract.connect(owner).Stake(stakeAmount);
    return { jeton, daoContract, daoContractAddress, stakingContract, stakingContractAddress, owner, addr1 };
};

describe("CommunityPlaysDAO", function () {

    // Tests relatifs au déploiement et à la configuration initiale
    describe("Deployment and Initial Configuration", function () {
        it("Should set the right owner", async function () {
            const { daoContract, owner } = await loadFixture(deployContractFixture);
            expect(await daoContract.owner()).to.equal(owner.address);
        });

        it("Should successfully interact with the Jeton contract", async function () {
            const { jetonAdress, testDaoContract } = await loadFixture(deployTESTContractFixture);
            const retrievedJetonAdress = await testDaoContract.getJetonContractAddress();
            expect(retrievedJetonAdress).to.equal(jetonAdress);
        });
        it("Should successfully interact with the StakingContract", async function () {
            const { testDaoContract, stakingContractAddress } = await loadFixture(deployTESTContractFixture);
            const retrievedStakingContractAdress = await testDaoContract.getStakingContractAddress();
            expect(retrievedStakingContractAdress).to.equal(stakingContractAddress);
        });
    });


    describe("TestCommunityPlaysDAO Levels", function () {

        it("Should set the owner's level based on experience", async function () {
            const { testDaoContract, owner } = await loadFixture(deployTESTContractFixture);

            const levels = [
                { exp: "1000", level: "Niveau 2" },
                { exp: "1500", level: "Niveau 3" },
                { exp: "2000", level: "Niveau 4" },
                { exp: "2500", level: "Niveau 5" },
                { exp: "3000", level: "Niveau 6" },
                { exp: "3500", level: "Niveau 7" },
                { exp: "4000", level: "Niveau 8" },
                { exp: "4500", level: "Niveau 9" },
                { exp: "5000", level: "Niveau 10" },
            ];

            for (const { exp, level } of levels) {
                await testDaoContract.resetExperienceForTesting(owner.address); // Réinitialise l'expérience
                const experienceToAdd = ethers.parseUnits(exp, 0);
                await testDaoContract.addExperienceForTesting(owner.address, experienceToAdd);

                const resultLevel = await testDaoContract.DetermineLevelByExperience(owner.address);
                expect(resultLevel).to.equal(level);
            }
        });
        describe.skip("CommunityPlaysDAO Rank Determination", function () {
            let jeton, daoContract, stakingContract, owner, stakingContractAddress;

            before(async function () {

                ({ jeton, daoContract, stakingContract, stakingContractAddress, owner } = await loadFixture(deployContractFixture));
            });

            const ranks = [
                { tokens: "500", rank: "Diamant" },
                { tokens: "400", rank: "Platine" },
                { tokens: "300", rank: "Or" },
                { tokens: "200", rank: "Argent" },
                { tokens: "100", rank: "Bronze" },
            ];

            ranks.forEach(({ tokens, rank }) => {
                it(`Should assign rank ${rank} for staking ${tokens} tokens`, async function () {
                    // Convertir le montant en unités de tokens
                    const stakeAmount = ethers.parseUnits(tokens, 18);

                    // Approbation et Staking
                    await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
                    await stakingContract.connect(owner).Stake(stakeAmount);

                    // Obtention du rang après staking
                    const calculatedRank = await daoContract.connect(owner).DetermineRankByStake(owner.address);

                    // Vérification que le rang calculé correspond au rang attendu
                    expect(calculatedRank).to.equal(rank);

                    // Optionnel : Réinitialiser le staking pour le test suivant
                    // Cela dépend de votre logique de contrat et si elle permet de "dé-staker" facilement
                });
            });
        });
        describe.skip("CommunityPlaysDAO Rank Determination for Or Rank", function () {

            it("Should assign rank Or for staking 300 tokens", async function () {
                const { jeton, stakingContract, stakingContractAddress, daoContract, owner } = await loadFixture(deployContractFixture);
                // Montant à staker pour le rang "Or"
                const stakeAmount = ethers.parseUnits("300", 18);

                await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
                await stakingContract.connect(owner).Stake(stakeAmount);

                // Vérification du rang
                const calculatedRank = await daoContract.connect(owner).DetermineRankByStake(owner.address);
                expect(calculatedRank).to.equal("Or");
            });
        });

    });

    describe("CommunityPlaysDAO Administrative Functions", function () {
        beforeEach(async function () {
            const { jeton, stakingContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture);
            const sendAmount = ethers.parseUnits("1", 18);
            const stakeAmount = ethers.parseUnits("1", 18);
            await jeton.connect(owner).transfer(addr1.address, sendAmount);
            await jeton.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
        })

        it("Should allow the owner to ban a gamer", async function () {
            // Le propriétaire bannit le joueur
            await expect(daoContract.connect(owner).BanGamer(addr1.address))
                .to.emit(daoContract, "GamerBanned")
        });

        it("Should not allow random account to ban a gamer", async function () {
            const {daoContract, owner, addr1 } = await loadFixture(deployContractFixture);
            // Le propriétaire bannit le joueur
            await expect(daoContract.connect(addr1).BanGamer(owner.address)).to.be.revertedWithCustomError(
                daoContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )
        });
    });

    describe("Quorum Functionality", function () {
    
        it("should correctly calculate the quorum", async function () {
            const {stakingContractAddress } = await loadFixture(deployTESTContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);
            const calculatedQuorum = await testDaoContract.testCalculateQuorum();
            const expectedQuorum = ethers.parseUnits("50", 18);
            expect(calculatedQuorum).to.equal(expectedQuorum);
        });

        beforeEach(async function () {
            const { jeton, stakingContract, daoContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture);
            const sendAmount = ethers.parseUnits("1", 18);
            const stakeAmount = ethers.parseUnits("1", 18);
            await jeton.connect(owner).transfer(addr1.address, sendAmount);
            await jeton.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
        });
    
        it("Should only allow the owner to set the quorum percentage", async function () {
            const newQuorumPercentage = 60;
            // Fonctionne car owner est le propriétaire
            await expect(daoContract.connect(owner).SetQuorumPercentage(newQuorumPercentage))
                .to.not.be.reverted;
    
            // Doit échouer car addr1 n'est pas le propriétaire
            await expect(daoContract.connect(addr1).SetQuorumPercentage(newQuorumPercentage))
            .to.be.revertedWithCustomError(
                daoContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )
        });
    
        it("Should reject quorum percentages outside of the 1-100 range", async function () {
            const tooLowQuorumPercentage = 0;
            const tooHighQuorumPercentage = 101;

            await expect(daoContract.connect(owner).SetQuorumPercentage(tooLowQuorumPercentage))
                .to.be.revertedWith("Quorum percentage must be between 1 and 100");
            await expect(daoContract.connect(owner).SetQuorumPercentage(tooHighQuorumPercentage))
                .to.be.revertedWith("Quorum percentage must be between 1 and 100");
        });
    
        it("Should correctly update the quorum percentage when set by the owner", async function () {
            const newQuorumPercentage = 50;
            await daoContract.connect(owner).SetQuorumPercentage(newQuorumPercentage);
            const currentQuorumPercentage = await daoContract.quorumPercentage();
            expect(currentQuorumPercentage).to.equal(newQuorumPercentage);
        });
    });
    describe.skip("CommunityPlaysDAO Game Status", function () {
    
        beforeEach(async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner } = await loadFixture(deployContractFixture);
        });
    
        it("Should allow starting a game session when status is NotStarted", async function () {

            await expect(daoContract.connect(owner).StartGameSession(1))
                .to.not.be.reverted;
        });
    
        it.skip("Should not allow starting a game session when status is not NotStarted", async function () {
            // Modifier l'état du jeu pour qu'il ne soit pas NotStarted
            // Par exemple, si vous avez une fonction pour démarrer le jeu, l'utiliser ici
            await daoContract.connect(owner).StartGameSession(1); // Démarrez une session pour changer l'état
    
            // Tentative de démarrer une autre session de jeu, ce qui devrait échouer
            await expect(daoContract.connect(owner).StartGameSession(2))
                .to.be.revertedWith("Transition d'etat non autorisee");
        });
    });
    describe("Proposal functionality", function () {
        it("Should allow a staking gamer to propose a game", async function () {
            const {daoContract, owner } = await loadFixture(deployStakingOwnerFixture);

            // Essayer de proposer un jeu après le staking
            // await expect(daoContract.connect(owner).ProposeGame("Valid Game"))
            //     .not.to.be.revertedWith("Must have tokens staked to participate");

            await expect(daoContract.connect(owner).ProposeGame("ValidGame"))
            .to.emit(daoContract, "GameProposed")
            .withArgs(1, "Valid Game");


        });

        it.skip("Should not allow a staking gamer to propose an empty proposal", async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner } = await loadFixture(deployContractFixture);

            // Simuler le staking
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Essayer d'envoyer une proposition vide

            // await expect(daoContract.connect(owner).ProposeGame("")).to.be.reverted;
            await expect(daoContract.connect(owner).ProposeGame("")).to.be.revertedWithCustomError(daoContract, "EmptyProposal");
        });

        it("Should not allow a non-staking gamer to propose a game", async function () {
            const { daoContract, addr1 } = await loadFixture(deployContractFixture);

            // Essayer de proposer un jeu sans avoir de tokens stakés
            await expect(daoContract.connect(addr1).ProposeGame("Valid Game"))
                .to.be.reverted;
        });

        // it("Should staking gamer to vote", async function () {
        //     const {  jeton, daoContract, daoContractAddress, stakingContract, stakingContractAddress, owner, addr1  } = await loadFixture(deployContractFixture);

        //     // Simuler le staking
        //     const stakeAmount = ethers.parseUnits("100", 18);
        //     await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
        //     await stakingContract.connect(owner).Stake(stakeAmount);

        //     // Essayer de proposer un jeu après le staking
        //     await daoContract.connect(owner).ProposeGame("Valid Game")
        //     // await daoContract.connect(owner).ProposeGame("Valid Game 2")

        //     // // await daoContract.connect(owner).ProposeGame("Valid Game")
        //     // console.log("Game proposed successfully");
        //     // const proposal = await daoContract.GetProposal(1);
        //     // console.log("Game proposal details:", proposal);
        //     // await expect(daoContract.connect(owner).VoteForGame(1)).to.be.not.reverted;
        // });
        it("Should return my level as Niveau 1", async function () {
            const { jeton, daoContract, daoContractAddress, stakingContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture);

            // Simulate staking
            const stakeAmount = ethers.parseUnits("100", 18); // Make sure to use the correct variable name if it's `stakingContractAddress` instead of `stakingContractAddress`
            await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Directly call the view function and check its return value
            const level = await daoContract.connect(owner).DetermineLevelByExperience(owner.address);
            expect(level).to.equal("Niveau 1");
        });

    });
    
})