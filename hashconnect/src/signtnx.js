import { AccountId, Hbar, TransferTransaction } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect"
import SimpleCrypto from 'simple-crypto-js';

let hashconnect = new HashConnect(); 
const sendTrasaction  = async(topic,accountToSign,ekey)=>{
    // const simpleCrypto = new SimpleCrypto();
    const simpleCrypto = new SimpleCrypto(ekey);

    const plaintext = JSON.stringify({
    to: accountToSign,
    amount: 1
});
    
   const tnxdata = simpleCrypto.encrypt(plaintext);

    const provider = hashconnect.getProvider('testnet',topic,accountToSign);
    const signer = hashconnect.getSigner(provider);

    const tnx  = await new TransferTransaction().addHbarTransfer(AccountId.fromString(accountToSign),new Hbar(-tnxdata.length))
                .addHbarTransfer(AccountId.fromString('0.0.3'),new Hbar(tnxdata.length))
                     .freezeWithSigner(signer);

//    const tnx1 = simpleCrypto.encrypt(tnx.toBytes());

    let res = await tnx.executeWithSigner(signer);

    console.log(res)
    window.alert(`trasections is doneer with this response ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------the responses is =========>${res}`);
}
export default sendTrasaction;
