//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "My new token";
    string public symbol = "MNT";

    uint256 public maxSuply = 1000000;
    address public owner;

    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[owner] = maxSuply;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
