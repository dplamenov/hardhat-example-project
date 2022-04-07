const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        hardhatToken = await Token.deploy();
    });


    it("Owner", async function () {
        expect(await hardhatToken.owner()).to.be.equal(owner.address)
    });

    it("should asign tokens to owner", async function () {
        expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(await hardhatToken.totalSupply())
    })

    it("transfer", async function () {
        await hardhatToken.transfer(addr1.address, 150);
        expect(await hardhatToken.balanceOf(owner.address)).to.be.equal((await hardhatToken.totalSupply()) - 150)
        expect(await hardhatToken.balanceOf(addr1.address)).to.be.equal(150)

    })

    it("should throw", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

        await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
        expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(initialOwnerBalance)
    })

    it("e2e transfer", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

        await hardhatToken.transfer(addr1.address, 50);
        await hardhatToken.connect(addr1).transfer(addr2.address, 30);

        expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(initialOwnerBalance - 50)
        expect(await hardhatToken.balanceOf(addr1.address)).to.be.equal(20);
        expect(await hardhatToken.balanceOf(addr2.address)).to.be.equal(30);
    })
});
