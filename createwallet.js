const xrpl = require('xrpl');

async function createWallet() {
    // Create a random wallet
    const wallet = xrpl.Wallet.generate();
    
    // Log the wallet's details: address (public key) and secret (private key)
    console.log("Public Address:", wallet.classicAddress);
    console.log("Secret Key:", wallet.secret);
}

createWallet().catch(console.error);
