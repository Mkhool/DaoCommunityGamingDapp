const { assert, expect } = require("chai");

const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');


async function deployContractFixture() {
    // Déployer le contract Quest
    [owner, addr1] = await ethers.getSigners();
    const QuestFactory = await ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();
    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer unityContract avec l'adresse de Quest 
    const questContractFactory = await ethers.getContractFactory("UnityQuest");
    unityContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
    const questContractAddress = await unityContract.getAddress();

    return { quest, unityContract, questContractAddress, stakingContract, stakingContractAddress, owner, addr1 };
};

async function deployTESTContractFixture() {
    // Déployer le contract Quest
    [owner, addr1] = await ethers.getSigners();
    const QuestFactory = await ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();
    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer unityContract avec l'adresse de Quest 
    const testContractFactory = await ethers.getContractFactory("TestUnityQuest");
    testContract = await testContractFactory.deploy(questAdress, stakingContractAddress);
    const testContractAdress = await unityContract.getAddress();
    return { quest, questAdress, testContract, testContractAdress, stakingContract, stakingContractAddress, owner, addr1 };
};

async function deployStakingOwnerFixture() {
    // Déployer le contract Quest
    [owner, addr1] = await ethers.getSigners();
    const QuestFactory = await ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();
    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    // Déployer unityContract avec l'adresse de Quest 
    const questContractFactory = await ethers.getContractFactory("UnityQuest");
    unityContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
    const questContractAddress = await unityContract.getAddress();
    // Simuler le staking
    const stakeAmount = ethers.parseUnits("100000", 18);
    await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
    await stakingContract.connect(owner).Stake(stakeAmount);
    await unityContract.connect(owner).ProposeGame("Valid Game")

    return { quest, unityContract, questContractAddress, stakingContract, stakingContractAddress, owner, addr1 };
};

async function deployInGameFixture() {

    // Déployer le contract Quest et les signers 
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const QuestFactory = await ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();

    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();

    // Déployer unityContract avec l'adresse de Quest 
    const questContractFactory = await ethers.getContractFactory("UnityQuest");
    unityContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
    const questContractAddress = await unityContract.getAddress();

    // Simuler le staking pour owner addr2 et addr3
    const initialStakingContractSupply = ethers.parseUnits("1000", 18);
    const stakeAmount = ethers.parseUnits("1000", 18);
    const transfertAmount = ethers.parseUnits("1000", 18);

    await quest.connect(owner).transfer(stakingContractAddress, initialStakingContractSupply);
    await quest.connect(owner).transfer(addr2, transfertAmount);
    await quest.connect(owner).transfer(addr3, transfertAmount);
    await quest.connect(owner).transfer(addr4, transfertAmount);

    await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
    await quest.connect(addr2).approve(stakingContractAddress, transfertAmount);
    await quest.connect(addr3).approve(stakingContractAddress, transfertAmount);
    await quest.connect(addr4).approve(stakingContractAddress, transfertAmount);

    await stakingContract.connect(owner).Stake(stakeAmount);
    await stakingContract.connect(addr2).Stake(transfertAmount);
    await stakingContract.connect(addr3).Stake(transfertAmount);
    await stakingContract.connect(addr4).Stake(transfertAmount);

    // // propose un jeu 
    await unityContract.connect(owner).ProposeGame("Valid Game")
    // // Demmarrer 
    await unityContract.connect(owner).StartGameSession(1)
    // // rejoindre la partie
    await unityContract.connect(owner).ParticipateInGame(1)
    await unityContract.connect(addr2).ParticipateInGame(1)
    await unityContract.connect(addr3).ParticipateInGame(1)

    return { quest, unityContract, questContractAddress, stakingContract, stakingContractAddress, owner, addr1, addr2, addr3, addr4 };
};

async function deployTESTInGameFixture() {

    // Déployer le contract Quest et les signers 
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const QuestFactory = await ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();

    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();

    // Déployer unityContract avec l'adresse de Quest 
    const TestUnityQuestFactory = await ethers.getContractFactory("TestUnityQuest");
    testContract = await TestUnityQuestFactory.deploy(questAdress, stakingContractAddress);
    const TestquestContractAddress = await testContract.getAddress();

    // Simuler le staking pour owner addr2 et addr3
    const initialStakingContractSupply = ethers.parseUnits("10000", 18);
    const stakeAmount = ethers.parseUnits("10000", 18);
    const transfertAmount = ethers.parseUnits("1000", 18);

    await quest.connect(owner).transfer(stakingContractAddress, initialStakingContractSupply);
    await quest.connect(owner).transfer(addr2, transfertAmount);
    await quest.connect(owner).transfer(addr3, transfertAmount);
    await quest.connect(owner).transfer(addr4, transfertAmount);

    await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
    await quest.connect(addr2).approve(stakingContractAddress, transfertAmount);
    await quest.connect(addr3).approve(stakingContractAddress, transfertAmount);
    await quest.connect(addr4).approve(stakingContractAddress, transfertAmount);

    await stakingContract.connect(owner).Stake(stakeAmount);
    await stakingContract.connect(addr2).Stake(transfertAmount);
    await stakingContract.connect(addr3).Stake(transfertAmount);
    await stakingContract.connect(addr4).Stake(transfertAmount);

    // // propose un jeu 
    await testContract.connect(owner).ProposeGame("Valid Game")
    // // Demmarrer 
    await testContract.connect(owner).StartGameSession(1)
    // // rejoindre la partie
    await testContract.connect(owner).ParticipateInGame(1)
    await testContract.connect(addr2).ParticipateInGame(1)
    await testContract.connect(addr3).ParticipateInGame(1)

    return { quest, testContract, TestquestContractAddress, stakingContract, stakingContractAddress, owner, addr1, addr2, addr3, addr4 };
};

describe("UnityQuest", function () {

    // :::::::::::::::::::: Deployment and Initial Configuration :::::::::::::::::::::::::: //
    describe("Deployment and Initial Configuration", function () {
        it("Should set the right owner", async function () {
            const { unityContract, owner } = await loadFixture(deployContractFixture);
            expect(await unityContract.owner()).to.equal(owner.address);
        });

        it("Should successfully interact with the Quest contract", async function () {
            const { questAdress, testContract } = await loadFixture(deployTESTContractFixture);
            const retrievedQuestAdress = await testContract.getQuestContractAddress();
            expect(retrievedQuestAdress).to.equal(questAdress);
        });
        it("Should successfully interact with the StakingContract", async function () {
            const { testContract, stakingContractAddress } = await loadFixture(deployTESTContractFixture);
            const retrievedStakingContractAdress = await testContract.getStakingContractAddress();
            expect(retrievedStakingContractAdress).to.equal(stakingContractAddress);
        });
    });

    // :::::::::::::::::::: Levels and Ranks :::::::::::::::::::::::::: //
    describe("Levels and Ranks", function () {

        it("Should set the right level based on experience", async function () {
            const { testContract, owner } = await loadFixture(deployTESTContractFixture);

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
                await testContract.resetExperienceForTesting(owner.address); // Réinitialise l'expérience
                const experienceToAdd = ethers.parseUnits(exp, 0);
                await testContract.addExperienceForTesting(owner.address, experienceToAdd);

                const resultLevel = await testContract.DetermineLevelByExperience(owner.address);
                expect(resultLevel).to.equal(level);
            }
        });

        describe("UnityQuest Rank Determination", function () {
            let quest, unityContract, stakingContract, owner, stakingContractAddress, addr1;

            before(async function () {
                ({ quest, unityContract, stakingContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture));
                const initialStakingContractSupply = ethers.parseUnits("1000", 18);
                await quest.connect(owner).transfer(stakingContractAddress, initialStakingContractSupply);
            });

            afterEach(async function () {
                // Réinitialiser l'état de staking en retirant tous les quests stakés pour owner
                const stakedAmount = await stakingContract.stakingBalance(owner.address);
                if (stakedAmount > 0) {
                    await stakingContract.connect(owner).Unstake(stakedAmount);
                }
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
                    await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
                    await stakingContract.connect(owner).Stake(stakeAmount);

                    // Obtention du rang après staking
                    const calculatedRank = await unityContract.connect(owner).DetermineRankByStake(owner.address);

                    // Vérification que le rang calculé correspond au rang attendu
                    expect(calculatedRank).to.equal(rank);
                });
            });
            it("Should assign aucun rank if no token stake", async function () {
                const rank = await unityContract.connect(owner).DetermineRankByStake(owner.address);
                expect(rank).to.equal("Aucun rang");
            });
        });
    });
    // :::::::::::::::::::: Administrative Functions :::::::::::::::::::::::::: //
    describe("Administrative Functions", function () {
        beforeEach(async function () {
            const { quest, stakingContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture);
            const sendAmount = ethers.parseUnits("1", 18);
            const stakeAmount = ethers.parseUnits("1", 18);
            await quest.connect(owner).transfer(addr1.address, sendAmount);
            await quest.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
        })

        it("Should allow the owner to ban a gamer", async function () {
            // Le propriétaire bannit le joueur
            await expect(unityContract.connect(owner).BanGamer(addr1.address))
                .to.emit(unityContract, "GamerBanned")
        });

        it("Should allow to set the minimum amount to stake to be a gamer", async function () {
            const _minimumStakeAmount = ethers.parseUnits("1", 18);
            await unityContract.connect(owner).SetMinimumStakeAmount(_minimumStakeAmount)
                
        });

        it("Should not allow other account to set the minimum amount to stake to be a gamer", async function () {
            const _minimumStakeAmount = ethers.parseUnits("1", 18);
            await expect(unityContract.connect(addr1).SetMinimumStakeAmount(_minimumStakeAmount)).to.be.revertedWithCustomError(
                unityContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )
                
        });

        it("Should allow the owner to make decision for a cycle", async function () {


            await expect(unityContract.connect(owner).SetChoiceAsOwner(1, "haut"))
                .to.emit(unityContract, "ChoiceMade")
                .withArgs(1, 0, "haut");
        });

        it("Should not allow other acount to make decision for a cycle", async function () {


            await expect(unityContract.connect(addr1).SetChoiceAsOwner(1, "haut")).to.be.revertedWithCustomError(
                unityContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )

        });


        it("Should not allow random account to ban a gamer", async function () {
            const { unityContract, owner, addr1 } = await loadFixture(deployContractFixture);
            // Le propriétaire bannit le joueur
            await expect(unityContract.connect(addr1).BanGamer(owner.address)).to.be.revertedWithCustomError(
                unityContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )
        });
    });
    // :::::::::::::::::::: Quorum Functionality :::::::::::::::::::::::::: //
    describe("Quorum Functionality", function () {

        it("should correctly calculate the quorum", async function () {
            const { stakingContractAddress } = await loadFixture(deployTESTContractFixture);
            const stakeAmount = ethers.parseUnits("100", 18);
            await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);
            const calculatedQuorum = await testContract.testCalculateQuorum();
            const expectedQuorum = ethers.parseUnits("20", 18);
            expect(calculatedQuorum).to.equal(expectedQuorum);
        });

        beforeEach(async function () {
            const { quest, stakingContract, unityContract, stakingContractAddress, owner, addr1 } = await loadFixture(deployContractFixture);
            const sendAmount = ethers.parseUnits("1", 18);
            const stakeAmount = ethers.parseUnits("1", 18);
            await quest.connect(owner).transfer(addr1.address, sendAmount);
            await quest.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
        });

        it("Should only allow the owner to set the quorum percentage", async function () {
            const newQuorumPercentage = 60;
            // Fonctionne car owner est le propriétaire
            await unityContract.connect(owner).SetQuorumPercentage(newQuorumPercentage);

        });
        it("Should not allow random account to set the quorum percentage", async function () {
            const newQuorumPercentage = 60;

            // Doit échouer car addr1 n'est pas le propriétaire
            await expect(unityContract.connect(addr1).SetQuorumPercentage(newQuorumPercentage))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "OwnableUnauthorizedAccount",
                ).withArgs(
                    addr1.address
                )
        });

        it("Should reject quorum percentages outside of the 1-100 range", async function () {
            const tooLowQuorumPercentage = 0;
            const tooHighQuorumPercentage = 101;

            await expect(unityContract.connect(owner).SetQuorumPercentage(tooLowQuorumPercentage))
                .to.be.revertedWith("Quorum percentage must be between 1 and 100");
            await expect(unityContract.connect(owner).SetQuorumPercentage(tooHighQuorumPercentage))
                .to.be.revertedWith("Quorum percentage must be between 1 and 100");
        });
    });
    // :::::::::::::::::::: Proposal functionality :::::::::::::::::::::::::: //
    describe("Proposal functionality", function () {
        it("Should allow a staking gamer to propose a game", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await expect(unityContract.connect(owner).ProposeGame("Valid Game"))
                .to.emit(unityContract, "GameProposed")
                .withArgs(2, "Valid Game");
        });

        it("Should allow a staking gamer to vote for a game", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await unityContract.connect(owner).VoteForGame(1);
        });

        it("Should emit a game if quorum have been reach", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await expect(unityContract.connect(owner).VoteForGame(1)).to.emit(unityContract, "GameProposalAccepted").withArgs(1);
        });

        it("Should allow to get a proposal", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await unityContract.connect(owner).GetProposal(1)
        });

        it("Should not emit a game if quorum have not been reach", async function () {
            const { unityContract, owner, addr1, stakingContractAddress } = await loadFixture(deployStakingOwnerFixture);
            const sendAmount = ethers.parseUnits("1000", 18);
            const stakeAmount = ethers.parseUnits("1000", 18);
       
            await quest.connect(owner).transfer(addr1.address, sendAmount);
            await quest.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(sendAmount);
           
            await unityContract.connect(addr1).VoteForGame(1)
        });

        it("Should not allow to get a proposal Id of 0", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await expect(unityContract.connect(owner).GetProposal(0)).to.be.revertedWithCustomError(
                unityContract,
                "ProposalIdOutOfBounds",
            ).withArgs(
                0, 2
            )
        });

        it("Should not allow to get a proposal that does exist ", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await expect(unityContract.connect(owner).GetProposal(3)).to.be.revertedWithCustomError(
                unityContract,
                "ProposalIdOutOfBounds",
            ).withArgs(
                3, 2
            )
        });

        it("Should not allow a non staking gamer to vote for a game", async function () {
            const { unityContract, owner } = await loadFixture(deployContractFixture);

            await expect(unityContract.connect(owner).VoteForGame(1)).to.be.revertedWithCustomError(
                unityContract,
                "InsufficientStake",
            )
        });

        it("Should not allow a staking gamer to vote for a game that does not exist", async function () {
            const { unityContract, owner } = await loadFixture(deployStakingOwnerFixture);

            await expect(unityContract.connect(owner).VoteForGame(3))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "GameProposalDoesNotExist",
                )
        });

        it("Should not allow a staking gamer to propose an empty proposal", async function () {
            const { quest, stakingContract, stakingContractAddress, unityContract, owner } = await loadFixture(deployStakingOwnerFixture);
            // Simuler le staking
            const stakeAmount = ethers.parseUnits("100", 18);
            await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);
            // Essayer d'envoyer une proposition vide
            await expect(unityContract.connect(owner).ProposeGame("")).to.be.revertedWithCustomError(unityContract, "EmptyProposal");
        });

        it("Should not allow a non-staking gamer to propose a game", async function () {
            const { unityContract, addr1 } = await loadFixture(deployContractFixture);

            // Essayer de proposer un jeu sans avoir de tokens stakés
            await expect(unityContract.connect(addr1).ProposeGame("Valid Game")).to.be.revertedWithCustomError(
                unityContract,
                "InsufficientStake",
            )

        });

        it("Should return my level as Niveau 1", async function () {
            const { quest, unityContract, stakingContract, stakingContractAddress, owner } = await loadFixture(deployContractFixture);

            // Simulate staking
            const stakeAmount = ethers.parseUnits("100", 18); // Make sure to use the correct variable name if it's `stakingContractAddress` instead of `stakingContractAddress`
            await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Directly call the view function and check its return value
            const level = await unityContract.connect(owner).DetermineLevelByExperience(owner.address);
            expect(level).to.equal("Niveau 1");
        });

    });
    // :::::::::::::::::::: Game Status and / Gameplay :::::::::::::::::::::::::: //
    describe("Game Status and in game function", function () {

        beforeEach(async function () {
            const { quest, stakingContract, stakingContractAddress, unityContract, owner, addr1, addr2 } = await loadFixture(deployStakingOwnerFixture);
        });

        it("Should allow starting a game session when status is NotStarted", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)

        });

        it("Should allow Ending a game session when status is Started", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await unityContract.connect(owner).EndGameSession(1)

        });

        it("Should allow Ending a game session when status is NotStarted", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await expect(unityContract.connect(owner).EndGameSession(1))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "UnauthorizedStateTransition",
                ).withArgs(
                    1, 0
                )
        });

        it("Should allow player to participe to a game", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await unityContract.connect(owner).ParticipateInGame(1)

        });

        it("Should allow player to participe to a game that is not active", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await expect(unityContract.connect(owner).ParticipateInGame(999))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "SessionNotActive",
                ).withArgs(
                    999
                )
        });

        it("Should not allow starting a game session when game id does not exist", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            expect(unityContract.connect(owner).StartGameSession(5))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "GameDoesNotExist",
                ).withArgs(
                    5
                )
        });

        it("Should not allow starting a game session when status is NotStarted and you are not Owner", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await expect(unityContract.connect(addr1).StartGameSession(1)).to.be.revertedWithCustomError(
                unityContract,
                "OwnableUnauthorizedAccount",
            ).withArgs(
                addr1.address
            )

        });

        it("Should not allow starting a game session when status is not NotStarted", async function () {
            // Modifier l'état du jeu pour qu'il ne soit pas NotStarted

            await unityContract.connect(owner).StartGameSession(1); // Démarrez une session pour changer l'état

            // Tentative de démarrer une autre session de jeu, ce qui devrait échouer
            await expect(unityContract.connect(owner).StartGameSession(2))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "UnauthorizedStateTransition",
                ).withArgs(
                    0, 1
                )
        });

        it("Should not allow non player to participe to a game", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await expect(unityContract.connect(addr1).ParticipateInGame(999)).to.be.revertedWithCustomError(
                unityContract,
                "InsufficientStake",
            )
        });


        it("Should not allow player to make choice when in game if not started", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await expect(unityContract.connect(owner).MakeChoice(1, "haut"))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "UnauthorizedStateTransition",
                ).withArgs(
                    1, 0
                )
        });

        it("Should not allow non player to make choice when in game", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await unityContract.connect(owner).ParticipateInGame(1)
            await expect(unityContract.connect(addr1).MakeChoice(1, "haut")).to.be.revertedWithCustomError(
                unityContract,
                "InsufficientStake",
            );
        });

        it("Should not allow Ending a game session if you are not the owner", async function () {
            await unityContract.connect(owner).ProposeGame("Valid Game")
            await unityContract.connect(owner).StartGameSession(1)
            await expect(unityContract.connect(addr1).EndGameSession(1))
                .to.be.revertedWithCustomError(
                    unityContract,
                    "OwnableUnauthorizedAccount",
                ).withArgs(
                    addr1.address
                )
        });

        // :::::::::::::::::::: Test InGame :::::::::::::::::::::::::: //
        describe("Test InGame", function () {

            it("Should add a player to the game session if they are not already in it when making a choice", async function () {
                const { testContract, addr4 } = await loadFixture(deployTESTInGameFixture);
                let isInSessionBefore = await testContract.XtestIsGamerInSession(addr4.address, 1);
                expect(isInSessionBefore).to.be.false;
                await testContract.connect(addr4).MakeChoice(1, "haut");
                let isInSessionAfter = await testContract.XtestIsGamerInSession(addr4.address, 1);
                expect(isInSessionAfter).to.be.true;
            });

            beforeEach(async function () {

                const { quest, unityContract, questContractAddress, stakingContract, stakingContractAddress, owner, addr1, addr2, addr3 } = await loadFixture(deployInGameFixture);
            });

            it("Should allow player to make choice when in game", async function () {
                await unityContract.connect(owner).MakeChoice(1, "haut")
            });
            
            it("Should give player experience when the game is ended", async function () {
                await unityContract.connect(owner).MakeChoice(1, "haut")
                await unityContract.connect(addr2).MakeChoice(1, "haut")
                await unityContract.connect(addr3).MakeChoice(1, "haut")

                const experienceBefore = await unityContract.experience(addr2.address);
                await unityContract.connect(owner).EndGameSession(1);
                const experienceAfter = await unityContract.experience(addr2.address);
                expect(experienceAfter > experienceBefore);
            });

            it("Should not play more than one per cycle", async function () {

                await unityContract.connect(addr3).MakeChoice(1, "bas")
                await unityContract.connect(addr2).MakeChoice(1, "gauche")         
                await expect(unityContract.connect(addr2).MakeChoice(1, "haut"))
                    .to.be.revertedWithCustomError(
                        unityContract,
                        "AlreadyParticipatedInCurrentCycle",
                    ).withArgs(
                        addr2.address
                        , 1
                    )
            });

            
            it("Should not choice a direction that not allowed", async function () {     
                await expect(unityContract.connect(addr2).MakeChoice(1, "test"))
                    .to.be.revertedWithCustomError(
                        unityContract,
                        "InvalidChoice",
                    )
            });

            it("Should emit a choice after 20secondes if not majority", async function () {
                const voteDuration = 25
                await unityContract.connect(owner).MakeChoice(1, "haut")
                await unityContract.connect(addr2).MakeChoice(1, "droite")
                await network.provider.send("evm_increaseTime", [voteDuration + 1]);
                await network.provider.send("evm_mine");         
                await unityContract.connect(addr3).MakeChoice(1, "bas");
            });
        });
    });
    describe("Branch", function () {

        it("Should count the correct choice of a gamer when it is not correct", async function () {
            const { testContract, addr2, owner } = await loadFixture(deployTESTInGameFixture);
            await testContract.connect(addr2).testMakeChoice(1, "haut");
            await testContract.connect(owner).setWinningDirectionForCycle(1, 1, "bas");
            const correctChoices = await testContract.testCountCorrectChoices(1, addr2.address);
            expect(correctChoices).to.equal(0);
        });

        it("Should count the correct choice of a gamer when it is correct", async function () {
            const { testContract, addr2, owner } = await loadFixture(deployTESTInGameFixture);
            await testContract.connect(addr2).testMakeChoice(1, "haut");
            await testContract.connect(owner).setWinningDirectionForCycle(1, 1, "haut");
            const correctChoices = await testContract.testCountCorrectChoices(1, addr2.address);
            expect(correctChoices).to.equal(1);
        });

        it("Should award bonus experience for correct choices when ending a game session", async function () {
            const { testContract, addr2, owner } = await loadFixture(deployTESTInGameFixture);
            const bonusExperience = 100;
            const baseExperienceReward = 10;
            const initialExperience = await testContract.experience(addr2.address);
        
            await testContract.connect(addr2).testMakeChoice(1, "haut");
            await testContract.connect(owner).setWinningDirectionForCycle(1, 1, "haut");
            await testContract.connect(owner).testEndGameSession(1);
        
            // Récupération de l'expérience de addr2 après la fin de la session
            const finalExperience = await testContract.experience(addr2.address);
        
            // Vérification que addr2 a reçu le bonusExperience pour son choix correct
            expect(finalExperience - initialExperience).to.equal(bonusExperience + baseExperienceReward);
        });

        it("Should only award base experience for participation without correct choices", async function () {
            const { testContract, addr2, owner } = await loadFixture(deployTESTInGameFixture);            
            const baseExperienceReward = 10; // La récompense de base pour la participation
        
            // Voter avec un choix incorrect
            await testContract.connect(addr2).testMakeChoice(1, "haut");
            await testContract.connect(owner).setWinningDirectionForCycle(1, 1, "bas");
            await testContract.connect(owner).testEndGameSession(1);
        
            // Vérifier l'expérience finale
            const finalExperience = await testContract.experience(addr2.address);
            expect(finalExperience).to.equal(baseExperienceReward);
        });
    });
})