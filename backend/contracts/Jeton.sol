// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title JETON - Un contrat de token ERC20 de base
/**
 * @dev Ce contrat implémente le token Jeton ERC20 standard avec une fonction de minting.
 * Le token est destiné à être utilisé pour CommunityPlaysDAO, il sera une récompense distribué aux joueurs,
 * servira pour le staking, et d'autres applications. Le propriétaire du contrat
 * a le pouvoir  de mint de nouveaux tokens.
 */

contract Jeton is ERC20 {
    address public owner;

    /// @notice Crée un token ERC20 nommé "JETON" avec le symbole "JET" et minte une offre initiale.
    /**
     * @dev À la création du contrat, minte `1000000 * (10**decimals())` tokens au `msg.sender`.
     * Définit `msg.sender` comme le propriétaire du contrat.
     */
    constructor() ERC20("JETON", "JET") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10**uint(decimals())); 
    }

/// @notice Minte des tokens `JETON` à une adresse spécifiée.
    /**
     * @dev Mint une quantité spécifiée de tokens `JETON` à l'adresse `to`.
     * Cette fonction est restreinte au propriétaire du contrat.
     * Émet un événement `Transfer` avec `address(0)` comme émetteur.
     * Requiert que l'appelant soit le propriétaire du contrat.
     * @param to L'adresse destinataire des tokens mintés.
     * @param amount La quantité de tokens à mint.
     */
    function mint(address to, uint256 amount) public {
    require(msg.sender == owner, "You are not the owner");
        _mint(to, amount);
    }
}