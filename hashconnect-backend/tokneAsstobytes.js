const {    TokenCreateTransaction,    Client,    TokenType,    TokenInfoQuery,    Hbar,    TransactionId,    PublicKey,AccountId,    TokenAssociateTransaction,    TransferTransaction,    AccountCreateTransaction,    AccountBalanceQuery, PrivateKey, Wallet, TokenAllowance} = require("@hashgraph/sdk");
require('dotenv').config();
const bodyparser = require('body-parser');

const clientid=process.env.A2_account_id;
const clieintPrivatekey = PrivateKey.fromString(process.env.A2_pkey);

const token = '0.0.3362740'
const acc = '0.0.653440'

 const Associatetoken = async(token,acc)=>{

    const transectionId =await TransactionId.generate(clientid);

    const tx =await new TokenAssociateTransaction()
        .setAccountId(acc)
        .setTokenIds([token])
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(transectionId)
        .freeze()
    
    const bytes = tx.toBytes()

    return bytes
    
}


const executetokenAss = async(bytes,sign,acc) =>{
    const client = Client.forTestnet().setOperator(clientid,clieintPrivatekey);
    
    let url = "https://testnet.mirrornode.hedera.com/api/v1/accounts/" + acc;

    const accountinfo = await fetch(url,{method:"GET"});
    const data = accountinfo.json();
    console.log(data.key)
    const userspubkey  = data.key;

    const newtnx = TokenAssociation.fromBytes(bytes);
    const tnxwithSign = newtnx.addSignature(userspubkey,sign);
    const submittnx = await tnxwithSign.execute(client);
    const recipt = await submittnx.getRecipt(client);
    const transectionStatus = `the status of trasection is`+ recipt.status;

    return( transectionStatus);
}

const getSign = (bytes) =>{
    const newtnx = TokenAssociateTransaction.fromBytes(bytes);
    const singnature = clieintPrivatekey.signTransaction(newtnx);
     return singnature;}

const tnx = async()=>  {const bytes = Associatetoken(token,clientid);
const sign =await  getSign(bytes);
const laststep = await executetokenAss(bytes,sign,clientid);
console.log(laststep)
}
tnx();

// module.exports ={Associatetoken,executetokenAss};




