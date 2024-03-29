const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

async function main() {
  [owner, addr1] = await ethers.getSigners();

   // Déployer le contract Jeton
   [owner, addr1] = await ethers.getSigners();
   const JetonFactory = await ethers.getContractFactory("Jeton");
   jeton = await JetonFactory.deploy();
   await jeton.waitForDeployment();
   const jetonAdress = await jeton.getAddress();
   console.log(
     `Jeton deployed to ${jeton.target}`
   );
   // Déployer StakingContract avec l'adresse de Jeton 
   const StakingContractFactory = await ethers.getContractFactory("StakingContract");
   stakingContract = await StakingContractFactory.deploy(jetonAdress);
   const stakingContractAddress = await stakingContract.getAddress();
   console.log(`StakingContract deployed to ${stakingContract.target}`);

   // Déployer daoContract avec l'adresse de Jeton 
   const daoContractFactory = await ethers.getContractFactory("CommunityPlaysDAO");
   daoContract = await daoContractFactory.deploy(jetonAdress, stakingContractAddress);
   const daoContractAddress = await daoContract.getAddress();
   console.log(`CommunityPlaysDAO deployed to ${daoContract.target}`);


}
 

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
