const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("StakingContract", function () {
    let DeployedJeton, stakingContract, owner, addr1;

    async function deployContractFixture() {
        [owner, addr1] = await ethers.getSigners();
        const JetonFactory = await ethers.getContractFactory("Jeton");
        DeployedJeton = await JetonFactory.deploy();
        await DeployedJeton.waitForDeployment();
        const DeployedJetonAdress = await DeployedJeton.getAddress();
        console.log("JetonToken deployed to:", DeployedJetonAdress);
        // return {owner, otherAccount, DeployedJetonAdress };
    }


    // beforeEach(async function () {

    
    //     [owner, addr1] = await ethers.getSigners();

    //     // Déployer Jeton
    //     const JetonFactory = await ethers.getContractFactory("Jeton");
    //     DeployedJeton = await JetonFactory.deploy();
    //     console.log("JetonToken deployed to:", DeployedJeton.address);
    //     // Déployer StakingContract avec l'adresse de Jeton
    //     const StakingContractFactory = await ethers.getContractFactory("StakingContract");
    //     stakingContract = await StakingContractFactory.deploy(DeployedJeton.address);
    //     console.log("StakingContract deployed to:", stakingContract.address);
    // });

    // it("Should allow staking", async function () {
    //     const stakeAmount = ethers.parseUnits("100", 18);
    //     // Assurez-vous que le propriétaire approuve d'abord le contrat de staking pour dépenser ses jetons
    //     await DeployedJeton.approve(stakingContract.address, stakeAmount);
    //     // Ensuite, staker des jetons
    //     await stakingContract.stakeTokens(stakeAmount);
    //     //     // expect(await stakingContract.stakedBalance(owner.address)).to.equal(stakeAmount);
    //     //   });

    //     //   it("Should not allow staking without approval", async function () {
    //     //     const stakeAmount = ethers.parseUnits("100", 18);
    //     //     // Essayer de staker sans approbation préalable devrait échouer
    //     //     await expect(stakingContract.stakeTokens(stakeAmount)).to.be.reverted;
    //     //   });

    //     // Ajouter d'autres tests selon les fonctionnalités de votre contrat de staking...
    // });
});
// describe("Test StakingContract", function () {

//     async function deployContractFixture() {
//         const [owner, otherAccount] = await ethers.getSigners();
//         const contractFactory = await ethers.getContractFactory("StakingContract");
//         DeployedContract = await contractFactory.deploy();
//         return { contract, owner, otherAccount };
//     }

//     describe("Deployment", function () {
//         it("Should set the right owner", async function () {
//             const { contract, owner } = await loadFixture(deploycontractFixture);
//             expect(await contract.owner()).to.equal(owner.address);
//         });

//         it("Should mint initial supply to owner", async function () {
//             const { contract, owner } = await loadFixture(deployContractFixture);
//             const initialOwnerBalance = await contract.balanceOf(owner.address);
//             expect(initialOwnerBalance).to.be.above(0);
//         });
//     });

//     describe("Transactions", function () {
//         it("Should transfer tokens between accounts", async function () {
//             const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//             await contract.mint(owner.address, ethers.parseUnits("100", 18));
//             await contract.transfer(otherAccount.address, ethers.parseUnits("50", 18));
//             const balanceOtherAccount = await contract.balanceOf(otherAccount.address);
//             expect(balanceOtherAccount).to.equal(ethers.parseUnits("50", 18));
//         });

//         it("Should fail if sender doesn’t have enough tokens", async function () {
//             const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//             await expect(contract.connect(otherAccount).transfer(owner.address, 1)).to.be.reverted;
//         });

//         describe("Staking", function () {
//             it("Should allow users to stake tokens", async function () {
//                 const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);    
//                 // Mint 100 tokens pour le propriétaire
//                 await contract.mint(owner.address, ethers.parseUnits("100", 18));
//                 // Tentative de staking de 50 tokens
//                 await contract.stake(ethers.parseUnits("50", 18)); 
//                 const ownerBalance = await contract.balanceOf(owner.address);
//                 expect(ownerBalance).to.equal(ethers.parseUnits("50", 18));
//             });

//             describe("Unstaking", function () {
//                 it("Should allow users to unstake tokens and receive rewards", async function () {
//                     const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//                     await contract.mint(owner.address, ethers.parseUnits("100", 18));
//                     await contract.stake(ethers.parseUnits("100", 18));
//                     await increaseTime(86400); // 24 heures
//                     await mine(1);
//                     await contract.unstake(ethers.parseUnits("50", 18));

//                 });
//             });

//             describe("Minting", function () {
//                 it("Should allow only the owner to mint tokens", async function () {
//                     const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//                     await expect(contract.connect(otherAccount).mint(otherAccount.address, ethers.parseUnits("100", 18))).to.be.reverted;
//                     await expect(contract.mint(owner.address, ethers.parseUnits("100", 18))).to.not.be.reverted;
//                 });


//                 it("Should respect the max supply", async function () {
//                     const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//                     const maxSupply = await contract.maxSupply();
//                     await expect(contract.mint(owner.address, maxSupply)).to.be.reverted;
//                 });
//             });

//             describe("Interest Rate Management", function () {
//                 it("Should allow only the owner to change the interest rate", async function () {
//                     const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//                     await expect(contract.connect(otherAccount).setDailyInterestRate(200)).to.be.reverted;
//                     await expect(contract.setDailyInterestRate(200)).to.not.be.reverted;
//                 });
//             });
//         });

//         describe("Staking Rewards", function () {
//             it("Should calculate rewards correctly after time", async function () {
//                 const { contract, owner, otherAccount } = await loadFixture(deployContractFixture);
//                 await contract.mint(owner.address, ethers.parseUnits("100", 18)); // Mint 100 JETON pour le propriétaire
//                 await contract.stake(ethers.parseUnits("100", 18)); // Stake 100 JETON
//                 // Simule le passage de 10 minutes
//                 await increaseTime(600);
//                 // Minez un nouveau bloc pour que le changement de temps prenne effet
//                 await mine(1);
//                 // Calculez la récompense après le temps écoulé
//                 const expectedReward = ethers.parseUnits("1", 18); // 10 JETON
//                 expect(reward).to.be.above(expectedReward);
//             });
//         });
//     });
// })

