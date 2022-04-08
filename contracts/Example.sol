// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Status.sol";

contract Example {
    Status public status;
    mapping(address => uint256) public myMap;

    constructor() {
        status = Status.Accepted;
    }

    function get(address _addr) public view returns (uint256) {
        return myMap[_addr];
    }

    function set(address _addr, uint256 _i) public {
        myMap[_addr] = _i;
    }

    function remove(address _addr) public {
        delete myMap[_addr];
    }
}
