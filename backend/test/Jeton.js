const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("Test Quest ERC20", function () {
  let DeployedQuest, owner, DeployedQuestAdress

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const questFactory = await ethers.getContractFactory("Quest");
    DeployedQuest = await questFactory.deploy();
  });

   // Tests relatifs au déploiement du contrat
  describe("Deployment", function() {
    it('should deploy the smart contract', async function () {
      let theOwner = await DeployedQuest.owner();
      assert.equal(owner.address, theOwner);
    });

    it("should be named QUEST", async function () {
      expect(await DeployedQuest.name()).to.eq("QUEST")
    })
  
    it("should have QST symbol", async function () {
      expect(await DeployedQuest.symbol()).to.eq("QST")
    })
});

    describe("Supply", function() {
      it("should have a total supply of 100,000", async function () {
        expect(await DeployedQuest.totalSupply()).to.eq(
          ethers.parseUnits("1000000"))
      })
      it("should mint total supply to deployer", async function () {
        expect(await DeployedQuest.balanceOf(owner.address)).to.eq(
          ethers.parseUnits("1000000"))
      })
    });
    
  describe("Minting tokens", async function () {
    let DeployedQuest, owner, addr1

    beforeEach(async function () {
      [owner, addr1] = await ethers.getSigners();
      const Quest = await ethers.getContractFactory("Quest");
      DeployedQuest = await Quest.deploy();
     
    });
    it("Should mint if owner", async function () {
      const mintAmount = ethers.parseUnits("1000000", 18); 
      await DeployedQuest.Mint(owner.address, mintAmount);
      const expectedBalance = ethers.parseUnits("2000000", 18);
      expect(await DeployedQuest.balanceOf(owner.address)).to.equal(expectedBalance);
    });

    it("Shouldn't mint if not owner", async function () {
      const mintAmount = ethers.parseUnits("1000000", 18); 
      await expect(DeployedQuest.connect(addr1).Mint(addr1.address, mintAmount))
      .to.be.reverted;
    });
  });
});