const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    [owner, addr1] = await ethers.getSigners();
    const QuestFactory = await hre.ethers.getContractFactory("Quest");
    quest = await QuestFactory.deploy();
    await quest.waitForDeployment();
    const questAdress = await quest.getAddress();
    console.log(
        `Quest deployed to ${quest.target}`
    );
    // Déployer StakingContract avec l'adresse de Quest 
    const StakingContractFactory = await hre.ethers.getContractFactory("StakingContract");
    stakingContract = await StakingContractFactory.deploy(questAdress);
    await stakingContract.waitForDeployment();
    const stakingContractAddress = await stakingContract.getAddress();
    console.log(`StakingContract deployed to ${stakingContract.target}`);

    // Déployer questContract avec l'adresse de Quest 
    const questContractFactory = await hre.ethers.getContractFactory("UnityQuest");
    questContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
    await questContract.waitForDeployment();
    const questContractAddress = await questContract.getAddress();
    console.log(`UnityQuest deployed to ${questContract.target}`);



    const stakeAmount = ethers.parseUnits("1000", 18);
    const initialStakingContractSupply = ethers.parseUnits("999000", 18);

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
    console.log("Proposing a new game: Zelda...");
    await questContract.connect(owner).ProposeGame("Zelda");
    console.log("Game proposed successfully.");


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});