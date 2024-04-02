// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title QUEST - Un contrat de token ERC20 de base
 * @author Khoule Medhi
 * @dev Ce contrat implémente le token Quest ERC20 standard avec une fonction de minting. BuyTokens 
 * pour acheter des tokens et withdraw qui est utilisable uniquement par l'owner du contrat.
 * Le token est destiné à être utilisé pour UnityQuest, il sera une récompense distribué aux joueurs,
 * servira pour le staking, et d'autres applications. Le propriétaire du contrat
 * a le pouvoir de mint de nouveaux tokens.
 */

contract Quest is ERC20, Ownable, ReentrancyGuard {
    /// @notice Crée un token ERC20 nommé "QUEST" avec le symbole "QST" et minte une offre initiale.
    /**
     * @dev À la création du contrat, minte `1000000 * (10**decimals())` tokens au `msg.sender`.
     * Définit `msg.sender` comme le propriétaire du contrat.
     */

    uint256 public tokenPrice = 10 ** 15;

    constructor() ERC20("QUEST", "QST") Ownable(msg.sender) {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    /// @notice Minte des tokens `QUEST` à une adresse spécifiée.
    /**
     * @dev Mint une quantité spécifiée de tokens `QUEST` à l'adresse `to`.
     * Cette fonction est restreinte au propriétaire du contrat.
     * Émet un événement `Transfer` avec `address(0)` comme émetteur.
     * Requiert que l'appelant soit le propriétaire du contrat.
     * @param to L'adresse destinataire des tokens mintés.
     * @param amount La quantité de tokens à mint.
     */
    function Mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Permet aux utilisateurs d'acheter des tokens QUEST en envoyant de l'Ether à cette fonction.
     * @dev Calcule le nombre de tokens à mint en fonction du montant d'Ether envoyé et du prix du token.
     * Utilise le modificateur `nonReentrant` pour prévenir contre les attaques de réentrance.
     * Revert si aucun Ether n'est envoyé ou si le montant d'Ether envoyé ne permet pas d'acheter au moins un token.
     */
    function BuyTokens() external payable nonReentrant {
        require(msg.value > 0, "You need to send some Ether");
        uint256 tokensToMint = msg.value / tokenPrice;
        require(tokensToMint > 0, "Not enough Ether sent");
        _mint(msg.sender, tokensToMint);
    }

    /**
     * @notice Permet au propriétaire du contrat de retirer tous les Ethers accumulés par la vente de tokens.
     * @dev Transfère le solde total d'Ether du contrat à l'adresse du propriétaire.
     * Revert si l'appelant n'est pas le propriétaire du contrat, grâce au modificateur `onlyOwner`.
     */
    function Withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
