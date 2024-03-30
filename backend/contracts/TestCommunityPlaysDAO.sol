// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CommunityPlaysDAO.sol";

contract TestCommunityPlaysDAO is CommunityPlaysDAO {
    constructor(
        address _tokenAddress,
        address _stakingContractAddress
    ) CommunityPlaysDAO(_tokenAddress, _stakingContractAddress) {}

    // Exposer l'adresse du contrat Jeton
    function getJetonContractAddress() public view returns (address) {
        return address(jetonContract);
    }

    // Exposer l'adresse du contrat StakingContract
    function getStakingContractAddress() public view returns (address) {
        return address(stakingContract);
    }

    function addExperienceForTesting(
        address gamer,
        uint256 experienceToAdd
    ) external onlyOwner {
        experience[gamer] += experienceToAdd;
    }

    function resetExperienceForTesting(address gamer) public {
        experience[gamer] = 0;
    }
    function testCalculateQuorum() public view returns (uint256) {
        uint256 totalStaked = stakingContract.totalStaked();
        uint256 quorum = (totalStaked * quorumPercentage) / 100;
        return quorum;
    }
 
    
    function testIsGamerInSession(
        address _gamer,
        uint256 _sessionId
    ) public view returns (bool) {
        address[] memory gamers = gameSessions[_sessionId].gamerInSession;
        for (uint256 i = 0; i < gamers.length; i++) {
            if (gamers[i] == _gamer) {
                return true;
            }
        }
        return false;
    }
}
