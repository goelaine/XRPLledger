const xrpl = require("xrpl");

async function createToken() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233"); // XRPL Testnet
    await client.connect();

    // Replace with your own wallet's secret
    const wallet = xrpl.Wallet.fromSeed('sEdScnVvxQ7gapd1f4HveTUTgVzVkW9 XRP Balance');

    const tokenDetails = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        Domain: "www.example.com", // Optional, you can leave this blank
        Flags: 0
    };

    // Create a transaction
    const prepared = await client.autofill(tokenDetails);
    const signed = wallet.sign(prepared);
    const tx = await client.submitAndWait(signed.tx_blob);
    console.log(tx);

    await client.disconnect();
}

createToken().catch(console.error);
