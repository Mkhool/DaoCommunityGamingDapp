const { assert, expect } = require("chai");
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("Test Jeton ERC20", function () {
  let DeployedJeton, owner

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const jetonFactory = await ethers.getContractFactory("Jeton");
    DeployedJeton = await jetonFactory.deploy();
  });

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

  it("should have a total supply of 100,000", async function () {
    expect(await DeployedJeton.totalSupply()).to.eq(
      ethers.parseUnits("1000000"))
  })
  it("should mint total supply to deployer", async function () {
    expect(await DeployedJeton.balanceOf(owner.address)).to.eq(
      ethers.parseUnits("1000000"))

  })
  // a utiliser dans le 2eme contract
  describe("transfer", function () {
    let DeployedJeton, owner, addr1, addr2;

    beforeEach(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      const Jeton = await ethers.getContractFactory("Jeton");
      DeployedJeton = await Jeton.deploy();
      await DeployedJeton;
    });

    const amount = ethers.parseUnits("100", 18);

    it("should transfer amount", async function () {
      const [from, to] = await ethers.getSigners();
      await expect(DeployedJeton.transfer(to.address, amount)).to.changeTokenBalances(DeployedJeton, [from, to], [-amount, amount]);
    });

    it("should transfer amount from a specific account", async function () {
      await DeployedJeton.transfer(addr1.address, amount);
      await DeployedJeton.connect(addr1).approve(owner.address, amount);
      await expect(DeployedJeton.connect(owner).transferFrom(addr1.address, addr2.address, amount)).to.changeTokenBalances(DeployedJeton, [addr1, addr2], [-amount, amount]);
    });
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
      .to.be.revertedWith("Seul le proprietaire peut mint des tokens");
    });
  });

});