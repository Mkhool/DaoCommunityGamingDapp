const { ethers } = require("hardhat");
const hre = require("hardhat");
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

async function main() {
    const stakeAmount = ethers.parseUnits("10000", 18);
    const initialStakingContractSupply = ethers.parseUnits("999000", 18);
    // Supposons que deployContractFixture est votre fonction de déploiement
    const { quest, stakingContract, stakingContractAddress, owner } = await loadFixture(deployContractFixture);

    console.log("Approving Quest for staking...");
    await quest.connect(owner).approve(stakingContractAddress, stakeAmount);
    console.log("Approved.");

    console.log("Staking Quest...");
    await stakingContract.connect(owner).Stake(stakeAmount);
    console.log("Staked.");

    // Transfert des tokens au contrat de staking pour les récompenses futures
    console.log("Transferring tokens to StakingContract for rewards...");
    await quest.connect(owner).transfer(stakingContractAddress, initialStakingContractSupply);
    console.log("Transferred.");

    const balanceAfterStake = await quest.balanceOf(owner.address);
    console.log(`Owner balance after staking: ${ethers.formatUnits(balanceAfterStake, 18)} QST`);

    // Affichage de la balance du contrat de staking
    const stakingContractBalance = await quest.balanceOf(stakingContractAddress);
    console.log(`StakingContract balance: ${ethers.formatUnits(stakingContractBalance, 18)} QST`);
    console.log("Adresse du propriétaire (owner):", owner.address);
}

async function deployContractFixture() {
    // Déployer le contract Quest
    [owner, addr1] = await ethers.getSigners();
    const QuestFactory = await hre.ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();

    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await hre.ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    const stakingContractAddress = await stakingContract.getAddress();
    
    // Déployer questContract avec l'adresse de Quest 
    const questContractFactory = await hre.ethers.getContractFactory("UnityQuest");
    questContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
    const questContractAddress = await questContract.getAddress();

    return { quest, questContract, questContractAddress, stakingContract, stakingContractAddress, owner, addr1 };
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});