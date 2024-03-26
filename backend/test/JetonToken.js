// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// describe("JETON Contract", function () {
//     async function deployTokenFixture() {
//         const [owner, otherAccount] = await ethers.getSigners();
//         const JetonToken = await ethers.getContractFactory("JetonToken");
//         const token = await JetonToken.deploy(owner.address);
//         return { token, owner, otherAccount };
//     }

//     describe("Deployment", function () {
//         it("Should set the right owner", async function () {
//             const { token, owner } = await loadFixture(deployTokenFixture);
//             expect(await token.owner()).to.equal(owner.address);
//         });

//         it("Should mint initial supply to owner", async function () {
//             const { token, owner } = await loadFixture(deployTokenFixture);
//             const initialOwnerBalance = await token.balanceOf(owner.address);
//             expect(initialOwnerBalance).to.be.above(0);
//         });
//     });

//     describe("Transactions", function () {
//         it("Should transfer tokens between accounts", async function () {
//             const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
//             await token.mint(owner.address, ethers.parseUnits("100", 18));
//             await token.transfer(otherAccount.address, ethers.parseUnits("50", 18));
//             const balanceOtherAccount = await token.balanceOf(otherAccount.address);
//             expect(balanceOtherAccount).to.equal(ethers.parseUnits("50", 18));
//         });

//         it("Should fail if sender doesn’t have enough tokens", async function () {
//             const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
//             await expect(token.connect(otherAccount).transfer(owner.address, 1)).to.be.reverted;
//         });

//         describe("Staking", function () {
//             it("Should allow users to stake tokens", async function () {
//                 const { token, owner } = await loadFixture(deployTokenFixture);    
//                 // Mint 100 tokens pour le propriétaire
//                 await token.mint(owner.address, ethers.parseUnits("100", 18));
//                 // Tentative de staking de 50 tokens
//                 await token.stake(ethers.parseUnits("50", 18)); 
//                 const ownerBalance = await token.balanceOf(owner.address);
//                 expect(ownerBalance).to.equal(ethers.parseUnits("50", 18));
//             });

//             describe("Unstaking", function () {
//                 it("Should allow users to unstake tokens and receive rewards", async function () {
//                     const { token, owner } = await loadFixture(deployTokenFixture);
//                     await token.mint(owner.address, ethers.parseUnits("100", 18));
//                     await token.stake(ethers.parseUnits("100", 18));
//                     await increaseTime(86400); // 24 heures
//                     await mine(1);
//                     await token.unstake(ethers.parseUnits("50", 18));

//                 });
//             });

//             describe("Minting", function () {
//                 it("Should allow only the owner to mint tokens", async function () {
//                     const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
//                     await expect(token.connect(otherAccount).mint(otherAccount.address, ethers.parseUnits("100", 18))).to.be.reverted;
//                     await expect(token.mint(owner.address, ethers.parseUnits("100", 18))).to.not.be.reverted;
//                 });


//                 it("Should respect the max supply", async function () {
//                     const { token, owner } = await loadFixture(deployTokenFixture);
//                     const maxSupply = await token.maxSupply();
//                     await expect(token.mint(owner.address, maxSupply)).to.be.reverted;
//                 });
//             });

//             describe("Interest Rate Management", function () {
//                 it("Should allow only the owner to change the interest rate", async function () {
//                     const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
//                     await expect(token.connect(otherAccount).setDailyInterestRate(200)).to.be.reverted;
//                     await expect(token.setDailyInterestRate(200)).to.not.be.reverted;
//                 });
//             });
//         });

//         describe("Staking Rewards", function () {
//             it("Should calculate rewards correctly after time", async function () {
//                 const { token, owner } = await loadFixture(deployTokenFixture);
//                 await token.mint(owner.address, ethers.parseUnits("100", 18)); // Mint 100 JETON pour le propriétaire
//                 await token.stake(ethers.parseUnits("100", 18)); // Stake 100 JETON
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