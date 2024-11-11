const xrpl = require("xrpl");

async function createToken() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233"); // XRPL Testnet
    await client.connect();

    // Replace with your own wallet's secret
    const wallet = xrpl.Wallet.fromSeed('sEdScnVvxQ7gapd1f4HveTUTgVzVkW9');

    const tokenDetails = {
        TransactionType: "AccountSet",
        Account: wallet.classicAddress,
        Domain: "", // Optional, you can leave this blank
        Flags: 0
    };

    console.log("1");
    // Autofill the transaction (this will fill in missing fields like Fee, Sequence)
    const prepared = await client.autofill(tokenDetails);
    console.log('Prepared Transaction:', prepared);

    // Sign the transaction with the wallet's secret
    const signed = wallet.sign(prepared);
    console.log('Signed Transaction:', signed);

    // Submit the signed transaction to the XRP Ledger
    const tx = await client.submitAndWait(signed.tx_blob);
    console.log('Transaction Result:', tx.result);

    await client.disconnect();
}

createToken().catch(console.error);
