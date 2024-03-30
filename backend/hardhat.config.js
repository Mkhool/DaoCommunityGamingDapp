require("@nomicfoundation/hardhat-toolbox");
require("hardhat-docgen");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  docgen:{
    path: "./docgen",
    clear: true,
    runOnCompile:true
  }

};
