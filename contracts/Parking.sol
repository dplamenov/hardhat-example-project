// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Parking {
    struct PPM {
        string name;
        string entrance;
    }

    mapping(address => PPM[]) ppms;

    function addPPM(string memory name) public {
        ppms[msg.sender].push(PPM(name, "1"));
    }

    function getPPMs() public view returns (PPM[] memory) {
        return ppms[msg.sender];
    }
}
