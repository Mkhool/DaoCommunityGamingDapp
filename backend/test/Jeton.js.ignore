const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("Test Jeton ERC20", function () {
  let DeployedJeton, owner, DeployedJetonAdress

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const jetonFactory = await ethers.getContractFactory("Jeton");
    DeployedJeton = await jetonFactory.deploy();
  });

   // Tests relatifs au déploiement du contrat
  describe("Deployment", function() {
    it('should deploy the smart contract', async function () {
      let theOwner = await DeployedJeton.owner();
      assert.equal(owner.address, theOwner);
    });

    it("should be named JETON", async function () {
      expect(await DeployedJeton.name()).to.eq("JETON")
    })
  
    it("should have JET symbol", async function () {
      expect(await DeployedJeton.symbol()).to.eq("JET")
    })
});

    describe("Supply", function() {
      it("should have a total supply of 100,000", async function () {
        expect(await DeployedJeton.totalSupply()).to.eq(
          ethers.parseUnits("1000000"))
      })
      it("should mint total supply to deployer", async function () {
        expect(await DeployedJeton.balanceOf(owner.address)).to.eq(
          ethers.parseUnits("1000000"))
      })
    });
    
  describe("Minting tokens", async function () {
    let DeployedJeton, owner, addr1

    beforeEach(async function () {
      [owner, addr1] = await ethers.getSigners();
      const Jeton = await ethers.getContractFactory("Jeton");
      DeployedJeton = await Jeton.deploy();
     
    });
    it("Should mint if owner", async function () {
      const mintAmount = ethers.parseUnits("1000000", 18); 
      await DeployedJeton.mint(owner.address, mintAmount);
      const expectedBalance = ethers.parseUnits("2000000", 18);
      expect(await DeployedJeton.balanceOf(owner.address)).to.equal(expectedBalance);
    });

    it("Shouldn't mint if not owner", async function () {
      const mintAmount = ethers.parseUnits("1000000", 18); 
      await expect(DeployedJeton.connect(addr1).mint(addr1.address, mintAmount))
      .to.be.reverted;
    });
  });
});