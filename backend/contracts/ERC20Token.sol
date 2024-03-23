// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract JETON is ERC20, ERC20Permit, Ownable {
    uint256 private _maxSupply;

    constructor(address initialOwner)
        ERC20("JETON", "JET")
        ERC20Permit("JETON")
        Ownable(initialOwner) 
    {
        transferOwnership(initialOwner); 
        _maxSupply = 100000 * (10 ** uint256(decimals())); 
        _mint(initialOwner, 100000 * (10 ** decimals()));
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= _maxSupply, "JETON: cap exceeded");
        _mint(to, amount);
    }

}