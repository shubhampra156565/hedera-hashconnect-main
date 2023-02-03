import { HashConnect } from "hashconnect";
import {TransferTransaction,AccountId} from '@hashgraph/sdk';

// import { tnxbytes } from "./tnxtobytes";
// import { recieveAuth } from "../../hashconnect-backend/auth";
// import {fetch} from "fetch-node";
let hashconnect = new HashConnect(true);

let appMetaData = {
    name: "dpa-fintech",
    description: "first-draft",
    icon: "ddddsdsssdsdsdsd.com"
}
export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetaData, 'testnet', false)
    hashconnect.foundExtensionEvent.once((walletMetaData) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetaData);
    })

    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet-paired');
        //gives u meta data have account ids and pairing data
        // console.log(`this is the paring data-------${pairingData}`);

        hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
            //do something with acknowledge response data
            console.log('listening to the akknledeged data')
            console.log(acknowledgeData);
        })
    })

    console.log(initData);
    return initData
}

export let authenticateUser = async () => {
    const paylaod = {
        url: window.location.hostname,
        data: {
            token: "skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"
        }
    }

    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);
    console.log(hashconnectSaveData);

    const res = await fetch('http://localhost:8080/authenticate');
    const { signingData } = await res.json();
    console.log({ signingData });
    const serverSigasArr = Object.values(signingData.serverSignature);
    const serverSignAsBuffer = Buffer.from(serverSigasArr);

    const auth = await hashconnect.authenticate(
        hashconnectSaveData.topic,
        hashconnectSaveData.pairingData[0].accountIDS[0],
        signingData.serverSigningAccount,
        serverSignAsBuffer,
        paylaod);

    const recieveAuthData = {
        singingAccount: hashconnectSaveData.pairingData[0].accountIDS[0],
        auth
    }

    const res2 = fetch('/recieveAuth',{
        method:"POST",
        mode:"cors",
        headers:{ 
            'content-type':'application/json'
        },
        body: JSON.stringify(recieveAuthData)
    });
    const msg = await res2.json();

    console.log(msg );
}

export const singtnx = async(tnxbytes) =>{
    // asssuming that the transection is the only TransferTransections and generating the same tnx object and returning sigranture of the same.
    const tnx = TransferTransaction.fromBytes(tnxbytes);
     let initdata = hashconnect.init(appMetaData,'testnet',true);
    const hashconnetData = window.localStorage.hashconnectData;
    
    const hashconnectSaveData = JSON.parse(hashconnetData);

    const singingAccount = hashconnectSaveData.pairingData[0].accountIDS[0];
    
    let response =await  hashconnect.sign(initdata.topic,new AccountId(singingAccount),tnx);
    
    // if (response.success){
    //     return{ status:response.success.,
    //             signature : response.userSignature}
    // }
    // else{
    //     return {status:false }
    // }
    return response.userSignature; 
}

//this will submitted from the side of the cliet or hashpack 
export const singTnxBytesHashpackSide = async(transactionBytes) =>{
    //neeeded init data 
    
    const r = window.localStorage.hashconnectData;
    const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic1 = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic1);
          console.log(accountid);
          console.log(ekey);

    const transaction = {
        topic: topic1,
        byteArray: transactionBytes,
        metadata: {
            accountToSign: accountid,
            returnTransaction: false,
            hideNft: false
        }
    }
    let response = await hashconnect.sendTransaction(topic1, transaction);
    return {status :response.success };
}







