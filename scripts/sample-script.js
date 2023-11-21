// scripts/sample-script.js
async function main() {
    const accounts = await ethers.getSigners();
    console.log("Accounts:", accounts.map((account) => account.address));
}

main();
