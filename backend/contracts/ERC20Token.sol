// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JETON is ERC20, ERC20Permit, Ownable {
    uint256 private _maxSupply;
    uint256 private _dailyInterestRate = 100; // taux fortement exagérés pour les besoins de la soutenance, il ne reflete pas un scénario d'utilisation réelle
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _stakeTimes; // Temps de staking pour chaque adresse

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address initialOwner)
        ERC20("JETON", "JET")
        ERC20Permit("JETON")
        Ownable(initialOwner)
    {
        transferOwnership(initialOwner);
        _maxSupply = 100000 * (10**uint256(decimals()));
        _mint(initialOwner, 10000 * (10**decimals()));
    }

    // Fonction pour modifier le taux d'intérêt annuel par le propriétaire du contrat
    function setDailyInterestRate(uint256 newRate) public onlyOwner {
        _dailyInterestRate = newRate;
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= _maxSupply, "JETON: cap exceeded");
        _mint(to, amount);
    }

    function stake(uint256 amount) public {
        require(amount > 0, "JETON: Cannot stake 0");
        _stakes[msg.sender] += amount;
        _stakeTimes[msg.sender] = block.timestamp;
        _burn(msg.sender, amount); // Utilise `_burn` pour retirer les tokens de la circulation
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(
            amount > 0 && _stakes[msg.sender] >= amount,
            "JETON: Invalid unstake amount"
        );
        uint256 reward = calculateGamerReward(msg.sender);

        _stakes[msg.sender] -= amount;
        _mint(msg.sender, amount + reward); // Remet les tokens et les récompenses en circulation
        emit Unstaked(msg.sender, amount);
    }


    function calculateGamerReward(address gamer) public view returns (uint256) {
    uint256 stakedAmount = _stakes[gamer];
    if (stakedAmount == 0 || block.timestamp <= _stakeTimes[gamer]) {
        return 0;
    }

    uint256 stakedTimeInSeconds = block.timestamp - _stakeTimes[gamer];
    uint256 precision = 1e18; 

    // taux journalier en taux par seconde, en ajustant par la précision ajoutée
    // 86400 secondes dans un jour
    uint256 rewardPerSecondRate = (_dailyInterestRate * precision) / (100 * 86400);
    uint256 reward = (stakedAmount * rewardPerSecondRate * stakedTimeInSeconds) / precision;

    return reward;
}

    function gamerRank(address user) public view returns (string memory) {
        uint256 stakedAmount = _stakes[user];
        if (stakedAmount >= 500 * (10**decimals())) return "Diamant";
        if (stakedAmount >= 400 * (10**decimals())) return "Platine";
        if (stakedAmount >= 300 * (10**decimals())) return "Or";
        if (stakedAmount >= 200 * (10**decimals())) return "Argent";
        if (stakedAmount >= 100 * (10**decimals())) return "Bronze";
        return "Aucun rang";
    }
}
