// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JetonToken is ERC20, Ownable {
    uint256 private _maxSupply;
    uint256 private _dailyInterestRate; // taux fortement exagérés pour les besoins de la soutenance, il ne reflete pas un scénario d'utilisation réelle
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _stakeTimes; 

    event Staked(address indexed gamer, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(
        address initialOwner
    ) ERC20("JETON", "JET") Ownable(initialOwner)  {
        _maxSupply = 100000 * (10 ** uint256(decimals()));
        _mint(initialOwner, 10000 * (10 ** decimals()));
        transferOwnership(initialOwner);
        _dailyInterestRate = 100; // Initialisé avec une valeur par défaut, peut être ajusté par le propriétaire
    }

    // Fonction pour modifier le taux d'intérêt annuel par le propriétaire du contrat
    function setDailyInterestRate(uint256 newRate) public onlyOwner {
        _dailyInterestRate = newRate;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= _maxSupply, "JETON: cap exceeded");
        _mint(to, amount);
    }

//attention front run

    function stake(uint256 amount) public {
        require(amount > 0, "JETON: Cannot stake 0");
        require(balanceOf(msg.sender) >= amount, "JETON: Insufficient balance");
        _stakes[msg.sender] += amount;
        _stakeTimes[msg.sender] = block.timestamp;
        transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(_stakes[msg.sender] >= amount, "JETON: Insufficient staked amount");
        uint256 reward = calculateGamerReward(msg.sender);
        require(balanceOf(address(this)) >= amount + reward, "JETON: Insufficient contract balance");
        _stakes[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount + reward);
        emit Unstaked(msg.sender, amount, reward);
    }


    function calculateGamerReward(address gamer) public view returns (uint256) {
        uint256 stakedAmount = _stakes[gamer];
        if (stakedAmount == 0 || block.timestamp <= _stakeTimes[gamer]) {
            return 0;
        }

        uint256 stakedTimeInSeconds = block.timestamp - _stakeTimes[gamer];
        uint256 precision = 1e18;

        // taux journalier en taux par seconde, en ajustant par la précision ajoutée (86400 secondes dans un jour )
        uint256 rewardPerSecondRate = (_dailyInterestRate * precision) /
            (100 * 86400);
        uint256 reward = (stakedAmount *
            rewardPerSecondRate *
            stakedTimeInSeconds) / precision;
        return reward;
    }

    function gamerRank(address gamer) public view returns (string memory) {
        uint256 stakedAmount = _stakes[gamer];
        if (stakedAmount >= 500 * (10 ** decimals())) return "Diamant";
        if (stakedAmount >= 400 * (10 ** decimals())) return "Platine";
        if (stakedAmount >= 300 * (10 ** decimals())) return "Or";
        if (stakedAmount >= 200 * (10 ** decimals())) return "Argent";
        if (stakedAmount >= 100 * (10 ** decimals())) return "Bronze";
        return "Aucun rang";
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }
}
