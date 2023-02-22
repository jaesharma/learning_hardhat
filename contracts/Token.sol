// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol"; // allows javascript code to be used with solidity code

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HTT";
    address public owner;
    uint public totalSupply = 10000;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint _amount) external {
        require(
            _amount <= balances[msg.sender],
            "Dont' have enough funds for this transaction"
        );
        balances[_to] += _amount;
        balances[msg.sender] -= _amount;
    }

    function balanceOf(address _account) external view returns (uint) {
        return balances[_account];
    }
}
