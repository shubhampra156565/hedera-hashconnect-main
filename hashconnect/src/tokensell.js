import { HashConnect } from "hashconnect";
// const  { TokenCreateTransaction, Client, TokenType, TokenInfoQuery, Hbar, PublicKey, TransferTransaction, AccountCreateTransaction, AccountBalanceQuery, PrivateKey, Wallet,AccountId } = require ( "@hashgraph/sdk");


// const { Buffer } = require("node:buffer");
let hashconnect = new HashConnect();
export const tokensell = async ()=>{
    console.log('hi form the token buy');

    
    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);

    const account  = hashconnectSaveData.pairingData[0].accountIDS[0];

    const sellingtnx = { token : "0.0.343556",
                         amount : 1,
                        acc : account};

    const tnx = await fetch('http://localhost:8080/sell',{
        method:"POST",
        mode:"cors",
        headers:{ 
            'Content-type':'application/json'
        },
        body: JSON.stringify(sellingtnx)
    });

    const {signedtnx} = await tnx.json();

    const signedTnxasArr = Buffer.from(signedtnx);
    

    const topic = hashconnectSaveData.topic

    let response = await hashconnect.sendTransaction(topic, signedTnxasArr);
    console.log(response)
    

    
};
