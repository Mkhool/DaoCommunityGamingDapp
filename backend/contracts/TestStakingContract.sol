// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingContract.sol";

contract TestStakingContract is StakingContract {
    constructor(address _stakingToken) StakingContract(_stakingToken) {
    }

    function testCalculateReward(address gamer) public view returns (uint256) {
        return CalculateReward(gamer);
    }
}
