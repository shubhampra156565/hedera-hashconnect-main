import { HashConnect } from "hashconnect";
// import {fetch} from 'node-fetch';
// import { recieveAuth } from "../../hashconnect-backend/auth";
// import {fetch} from "fetch-node";
let hashconnect = new HashConnect(true);


let appMetaData = {
    name: "dpa-fintech",
    description: "first-draft",
    icon: "ddddsdsssdsdsdsd.com"
}
export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetaData, 'testnet', true);
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

    // console.log(initData);
    return initData
}

export let authenticateUser = async () => {
    const paylaod = {
        url: window.location.hostname,
        data: {
            token: "skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"
        }
    }

    const res = await fetch('http://localhost:8080/authenticate');
    const { signingData } = await res.json();
    console.log({ signingData });

    const serverSigasArr = Object.values(signingData.serverSignature);
    const serverSignAsBuffer = Buffer.from(serverSigasArr);

    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);


    // let hashconnect1 = new HashConnect(appMetaData,'testnet',false);
    // let initData = await hashconnect1.init(appMetaData, 'testnet', false) 

    let auth = await hashconnect.authenticate(
        hashconnectSaveData.topic,
        hashconnectSaveData.pairingData[0].accountIDS[0],
        signingData.serverSigningAccount,
        serverSignAsBuffer,
        paylaod);
        
    const recieveAuthData = {
        singingAccount: hashconnectSaveData.pairingData[0].accountIDS[0],
        auth
    }

    const res2 = fetch('http://localhost:8080/recieveAuth',{
        method:"POST",
        mode:"cors",
        headers:{ 
            'Content-type':'application/json'
        },
        body: JSON.stringify(recieveAuthData)
    });
    const msg = await res2.json();

    console.log(msg );


    
}

