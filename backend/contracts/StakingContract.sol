// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Un contrat de Staking pour le token ERC20 Jeton
/**
 * @dev Ce contrat permet aux utilisateurs de staker des tokens JETON, gagner des récompenses basées sur un taux d'intérêt quotidien,
 * et retirer leurs tokens plus les récompenses accumulées. Le propriétaire du contrat peut ajuster le taux d'intérêt.
 */

contract StakingContract is ReentrancyGuard, Ownable {
    IERC20 public stakingToken;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => uint256) private _stakeTimes;

    uint256 private _dailyInterestRate;
    uint256 public totalStaked;

    event Staked(address indexed gamer, uint256 amount);
    event Unstaked(address indexed gamer, uint256 amount);

    error CanStakeZeroToken();
    error YouDontHaveTokenToUnstake();
    error NotEnoughFundInContract();
    error CannotwithdrawMorThanYouHaveStake();

    /// @notice Constructeur pour initialiser le contrat avec le token de staking spécifique et un taux d'intérêt initial.
    /// @param _stakingToken L'adresse du token ERC20 à utiliser pour le staking.
    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
        _dailyInterestRate = 100; // taux fortement exagérés pour les besoins de la soutenance, il ne reflete pas un scénario d'utilisation réelle
    }

    /// @notice Permet à un utilisateur de déposer (staker) des tokens dans le contrat pour commencer à accumuler des récompenses.
    /// @dev Transfère les tokens du staker au contrat, met à jour les soldes, les états de staking et ajoute le montant au total staké
    /// @param _amount Le montant de tokens à staker.
    function Stake(uint256 _amount) external nonReentrant {
        // require(_amount > 0, "Vous ne pouvez pas staker 0 token");
        if (_amount <= 0) revert CanStakeZeroToken();
        totalStaked += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        isStaking[msg.sender] = true;
        _stakeTimes[msg.sender] = block.timestamp;
        emit Staked(msg.sender, _amount);
    }

    /// @notice Permet à un utilisateur de retirer (unstake) ses tokens et les récompenses accumulées du contrat.
    /// @dev Transfère les tokens du contrat au staker, calcule les récompenses, ajuste le solde de staking,  met à jour les états de staking et soustrait le montant du total staké.
    /// @param _amount Le montant de tokens à retirer.
    function Unstake(uint256 _amount) external nonReentrant {
        // require(isStaking[msg.sender], "Vous n'avez pas de token a unstake");
        if (!isStaking[msg.sender]) revert YouDontHaveTokenToUnstake();
        // require(_amount <= stakingBalance[msg.sender],"Vous ne pouvez pas retirer retirer plus que ce que vous avez stake");
        if (_amount > stakingBalance[msg.sender])
            revert CannotwithdrawMorThanYouHaveStake();
        totalStaked -= _amount;
        uint256 reward = CalculateReward(msg.sender);
        // require(stakingToken.balanceOf(address(this)) >= _amount + reward,"Pas assez de recompenses dans le contrat");
        if (stakingToken.balanceOf(address(this)) < _amount + reward)
            revert NotEnoughFundInContract();
        stakingBalance[msg.sender] -= _amount;
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
        uint256 amountToTransfer = _amount + reward;
        stakingToken.transfer(msg.sender, amountToTransfer);

        emit Unstaked(msg.sender, _amount);
    }

    /// @notice Permet au propriétaire de modifier le taux d'intérêt quotidien pour le calcul des récompenses.
    /// @dev Cette fonction est restreinte au propriétaire du contrat.
    /// @param newRate Le nouveau taux d'intérêt quotidien, exprimé en pourcentage avec une précision de deux décimales (par exemple, 100 pour 1%).
    function SetDailyInterestRate(uint256 newRate) public onlyOwner {
        _dailyInterestRate = newRate;
    }
    function DailyInterestRate() public view returns (uint256) {
        return _dailyInterestRate;
    }

    /// @notice Calcule la récompense accumulée pour un utilisateur en fonction de son montant en staking et du temps écoulé.
    /// @dev Cette fonction retourne le montant des récompenses calculé sans affecter le solde de l'utilisateur.
    /// @param gamer L'adresse de l'utilisateur pour lequel calculer les récompenses.
    /// @return reward Le montant des récompenses accumulées pour l'utilisateur.
    function CalculateReward(address gamer) internal view returns (uint256) {
        uint256 stakedAmount = stakingBalance[gamer];
        if (stakedAmount == 0 || block.timestamp <= _stakeTimes[gamer]) {
            return 0;
        }

        uint256 stakedTimeInSeconds = block.timestamp - _stakeTimes[gamer];
        uint256 precision = 1e18;

        uint256 rewardPerSecondRate = (_dailyInterestRate * precision) /
            (100 * 86400);
        uint256 reward = (stakedAmount *
            rewardPerSecondRate *
            stakedTimeInSeconds) / precision;
        return reward;
    }
//     fallback() external payable {}

//     receive() external payable {}
//     function decimals() public pure  returns (uint8) {
//     return 18;
// }

// function symbol() public pure  returns (string memory) {
//     return "JET";
// }

// function name() public pure  returns (string memory) {
//     return "JETON";
// }
}
