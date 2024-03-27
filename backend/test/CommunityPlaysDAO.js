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
    // Déployer daoContract avec l'adresse de Jeton 
    const daoContractFactory = await ethers.getContractFactory("CommunityPlaysDAO");
    daoContract = await daoContractFactory.deploy(jetonAdress);
    const daoContractAdress = await daoContract.getAddress();
    return { jeton, daoContract, daoContractAdress, stakingContract, stakingContractAdress, owner, addr1 };
};

describe("StakingContract", function () {

    describe("Deployment", function () {
        // Tests relatifs au déploiement du contrat
        it("Should set the right owner", async function () {
            const { daoContract, owner } = await loadFixture(deployContractFixture);
            expect(await daoContract.owner()).to.equal(owner.address);
        });
    });
})




