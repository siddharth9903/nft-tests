const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quantumk9s", function () {
    let Quantumk9s;
    let Token;
    let quantumk9s;
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Token contract
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("erc20","erc");
        await token.waitForDeployment();

        // console.log("Token Contract Address:", await token.getAddress());

        // Deploy Quantumk9s contract with the address of the Token contract
        Quantumk9s = await ethers.getContractFactory("Quantumk9s");
        quantumk9s = await Quantumk9s.deploy(await token.getAddress());
        await quantumk9s.waitForDeployment();

        // console.log("Quantumk9s Contract Address:", await quantumk9s.getAddress());
    });


    describe("ERC20 Token Deployment", function () {
        it("Should set the right name", async function () {
            expect(await token.name()).to.equal("erc20");
        });

        it("Should set the right symbol", async function () {
            expect(await token.symbol()).to.equal("erc");
        });

        it("Should mint initial supply to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);

            const expectedBalance = 100n * (10n ** (await token.decimals()))
            console.log("expectedBalance", expectedBalance.toString());

            expect(ownerBalance).to.equal(expectedBalance);
        });
    });

    describe("NFT sc Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await quantumk9s.owner()).to.equal(owner.address);
        });

        it("Should set the right token address", async function () {
            expect(await quantumk9s.TOKEN_ADDRESS()).to.equal(await token.getAddress());
        });
    });

    
    describe("Minting", function () {
        it("Should mint an NFT", async function () {
            // Approve QuantumK9s contract to spend 1 custom token on behalf of the owner
            await token.connect(owner).approve(quantumk9s.getAddress(), ethers.parseEther("1"));

            // Mint an NFT
            await quantumk9s.connect(owner).mint({ value: ethers.parseEther("0.01") });

            // Check owner's balance of QuantumK9s NFTs
            const ownerBalance = await quantumk9s.balanceOf(owner.address);
            console.log("ownerBalance", ownerBalance.toString());
            expect(ownerBalance).to.equal(1);
        });


        it("Should not allow minting more than MAX_NFT_PER_WALLET", async function () {
            // Mint the maximum allowed NFTs
            await token.connect(owner).approve(quantumk9s.getAddress(), ethers.parseEther("1"));

            for (let i = 0; i < 25; i++) {
                await quantumk9s.connect(owner).mint({ value: ethers.parseEther("0.01") });
            }

            // Try to mint one more, should fail
            await expect(quantumk9s.connect(owner).mint({ value: ethers.parseEther("0.01") }))
                .to.be.revertedWith("Max mints per wallet reached");
        });
    });
});
