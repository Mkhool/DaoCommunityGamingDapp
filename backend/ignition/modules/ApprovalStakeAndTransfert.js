const { ethers } = require("hardhat");

async function main() {
    const stakeAmount = ethers.parseUnits("100", 18);
    const initialStakingContractSupply = ethers.parseUnits("999000", 18);
    // Supposons que deployContractFixture est votre fonction de déploiement
    const { jeton, stakingContract, stakingContractAddress, owner } = await deployContractFixture();

    console.log("Approving Jeton for staking...");
    await jeton.connect(owner).approve(stakingContractAddress, stakeAmount);
    console.log("Approved.");

    console.log("Staking Jeton...");
    await stakingContract.connect(owner).Stake(stakeAmount);
    console.log("Staked.");

    // Transfert des tokens au contrat de staking pour les récompenses futures
    console.log("Transferring tokens to StakingContract for rewards...");
    await jeton.connect(owner).transfer(stakingContractAddress, initialStakingContractSupply);
    console.log("Transferred.");

    const balanceAfterStake = await jeton.balanceOf(owner.address);
    console.log(`Owner balance after staking: ${ethers.formatUnits(balanceAfterStake, 18)} JET`);

    // Affichage de la balance du contrat de staking
    const stakingContractBalance = await jeton.balanceOf(stakingContractAddress);
    console.log(`StakingContract balance: ${ethers.formatUnits(stakingContractBalance, 18)} JET`);
    console.log("Adresse du propriétaire (addr1):", addr1.address);
}

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

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});