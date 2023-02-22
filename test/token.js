const { expect } = require("chai");

describe("Token contract", function () {
  let owner, addr1, addr2, Token, hardhatToken;

  this.beforeAll(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token"); // instance contract
    hardhatToken = await Token.deploy();
  });

  it("Deployment should assign total supply to owner", async () => {
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.be.equal(ownerBalance);
  });

  it("should transfer tokens between accounts", async () => {
    await hardhatToken.connect(owner).transfer(addr1.address, 1000);
    expect(await hardhatToken.balanceOf(addr1.address)).to.be.equal(1000);

    await hardhatToken.connect(addr1).transfer(addr2.address, 10);
    expect(await hardhatToken.balanceOf(addr2.address)).to.be.equal(10);
    expect(await hardhatToken.balanceOf(addr1.address)).to.be.equal(990);
  });

  it("should fail if user does not have enough token", async () => {
    try {
      await hardhatToken.connect(addr2).transfer(addr1.address, 11); // addr2 only have 10 tokens
      expect.fail("expected an error to be thrown");
    } catch (error) {
      expect(error.message).to.include(
        "Dont' have enough funds for this transaction"
      );
    }
  });
});
