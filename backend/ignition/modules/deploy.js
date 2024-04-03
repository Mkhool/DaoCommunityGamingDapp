const hre = require("hardhat");

async function main() {
  [owner, addr1] = await ethers.getSigners();

   // Déployer le contract Quest
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
   const stakingContractAddress = await stakingContract.getAddress();
   console.log(`StakingContract deployed to ${stakingContract.target}`);

   // Déployer questContract avec l'adresse de Quest 
   const questContractFactory = await hre.ethers.getContractFactory("UnityQuest");
   questContract = await questContractFactory.deploy(questAdress, stakingContractAddress);
   const questContractAddress = await questContract.getAddress();
   console.log(`UnityQuest deployed to ${questContract.target}`);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
