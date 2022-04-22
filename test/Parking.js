const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Parking", function () {
  it("getPPMs", async function () {
    const Parking = await ethers.getContractFactory("Parking");
    const parking = await Parking.deploy();
    await parking.deployed();

    expect(await parking.getPPMs()).to.deep.equal([]);
  });
});
