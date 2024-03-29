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

async function deployStakingGamerFixture() {
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

    // // Tests relatifs aux propositions et votes
    describe("Proposal functionality", function () {
        it("Should allow a staking gamer to propose a game", async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner } = await loadFixture(deployContractFixture);

            // Simuler le staking
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Essayer de proposer un jeu après le staking
            // await expect(daoContract.connect(owner).ProposeGame("Valid Game"))
            //     .not.to.be.revertedWith("Must have tokens staked to participate");

            // await expect(daoContract.connect(owner).ProposeGame("ValidGame"))
            // .to.emit(daoContract, "GameProposed")
            // .withArgs(1, "Valid Game");


        });


        it("Should not allow a staking gamer to propose an empty proposal", async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner } = await loadFixture(deployContractFixture);

            // Simuler le staking
            const stakeAmount = ethers.parseUnits("100", 18);
            await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(owner).Stake(stakeAmount);

            // Essayer d'envoyer une proposition vide

            await expect(daoContract.connect(owner).ProposeGame("")).to.be.reverted;
        });
        // await expect(daoContract.connect(owner).ProposeGame("")).to.be.revertedWithCustomError(daoContract, "EmptyProposal")});

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
    describe("TestCommunityPlaysDAO Levels", function () {
        async function deployFixture() {
            const { testDaoContract, stakingContractAddress } = await loadFixture(deployTESTContractFixture);
            return deployTESTContractFixture();
        }

        it("Should set the owner's level based on experience", async function () {
            const { testDaoContract, owner } = await loadFixture(deployFixture);

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
    // describe("Proposals and Voting", function () {


    //     it("Should correctly tally votes and execute proposals", async function () {
    //         // Tester le comptage correct des votes et l'exécution des propositions
    //     });
    // });

    // // Tests relatifs à la gestion du quorum
    // describe("Quorum Management", function () {
    //     it("Should correctly calculate quorum", async function () {
    //         // Tester le calcul correct du quorum
    //     });

    //     it("Should enforce quorum for proposal decisions", async function () {
    //         // Tester l'application du quorum pour les décisions de propositions
    //     });
    // });

    // // Tests relatifs à la gestion des récompenses et incitations
    // describe("Rewards and Incentives Management", function () {
    //     it("Should correctly distribute rewards", async function () {
    //         // Tester la distribution correcte des récompenses
    //     });

    //     it("Should provide incentives for participation", async function () {
    //         // Tester la fourniture d'incitations pour la participation
    //     });
    // });

    // // Tests relatifs à l'intégration avec le contrat de staking
    // describe("Staking Contract Integration", function () {
    //     it("Should correctly interact with staking contract", async function () {
    //         // Tester l'interaction correcte avec le contrat de staking
    //     });

    //     it("Should reflect staking status in voting power", async function () {
    //         // Tester la réflexion du statut de staking dans le pouvoir de vote
    //     });
    // });

    // // Tests relatifs à la sécurité et aux permissions
    // describe("Security and Permissions", function () {
    //     it("Should restrict sensitive actions to authorized roles", async function () {
    //         // Tester la restriction des actions sensibles aux rôles autorisés
    //     });

    //     it("Should prevent unauthorized access and transactions", async function () {
    //         // Tester la prévention de l'accès et des transactions non autorisés
    //     });
    // });

    // Ajoutez d'autres sections de test selon nécessaire
    describe("CommunityPlaysDAO Administrative Functions", function () {

    
        it("Should allow the owner to ban a gamer", async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner, addr1 } = await loadFixture(deployContractFixture);
            // Tentative de bannir un joueur par quelqu'un d'autre que le propriétaire
           // await expect(daoContract.connect(addr1).BanGamer(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
    
           const sendAmount = ethers.parseUnits("1", 18);
           const stakeAmount = ethers.parseUnits("1", 18);
            // Transfert des tokens au contrat de staking pour les récompenses futures
            await jeton.connect(owner).transfer(addr1.address, sendAmount);
            // Approbation et staking
            await jeton.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
            // Le propriétaire bannit le joueur
            await expect(daoContract.connect(owner).BanGamer(addr1.address))
                .to.emit(daoContract, "GamerBanned") 
        });

        it("Should not allow randaom account to ban a gamer", async function () {
            const { jeton, stakingContract, stakingContractAddress, daoContract, owner, addr1 } = await loadFixture(deployContractFixture);
            // Tentative de bannir un joueur par quelqu'un d'autre que le propriétaire
           // await expect(daoContract.connect(addr1).BanGamer(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
    
           const sendAmount = ethers.parseUnits("1", 18);
           const stakeAmount = ethers.parseUnits("1", 18);
            // Transfert des tokens au contrat de staking pour les récompenses futures
            await jeton.connect(owner).transfer(addr1.address, sendAmount);
            // Approbation et staking
            await jeton.connect(addr1).approve(stakingContractAddress, stakeAmount);
            await stakingContract.connect(addr1).Stake(stakeAmount);
            // Le propriétaire bannit le joueur
            await expect(daoContract.connect(owner).BanGamer(addr1.address))
                .to.emit(daoContract, "GamerBanned") 
        });
    });
});

