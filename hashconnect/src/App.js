
import './App.css';
import pairing from './pairing';
import { pairHashpack } from './walletconn';
import { authenticateUser } from './walletconn';
import { tokensell } from './tokensell';
// import { singtnx } from './HashpackConn';
import { tnxbytes } from './tnxtobytes';
import { singTnxBytesHashpackSide } from './HashpackConn';
// import { HashConnect } from 'hashconnect';
import sendTrasaction from './signtnx';
// import { Key } from '@hashgraph/sdk';
// import { TransferTransaction } from '@hashgraph/sdk';
// import { AccountId } from '@hashgraph/sdk';

// let hashconnect = new HashConnect();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          connect to hashpack
        </a>



        <button onClick={() => {
          pairing();

        }}>pair with hashconnect</button>
        <></>


        <button onClick={() => {
          const initData1 = pairHashpack();
          console.log(initData1)
        }}>
          pair hashpack
        </button>


        <button onClick={() => {
          authenticateUser();

        }}>
          Authenticate
        </button>


        <button onClick={
          () => {
            console.log('hi buying your token');
            tokensell();
          }
        }>
          sell tokens
        </button>

        <button onClick={async () => {


          console.log('signtnx is clicked');
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic);
          console.log(accountid);
          console.log(ekey);

          const bytes = tnxbytes(accountid,'0.0.653440');
          const status =await singTnxBytesHashpackSide(bytes);
          if (status){
          console.log(`sing tnx is completed`)};
        }}>singtnx</button>


        <button onClick={() => {
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic
          console.log(topic);
          console.log(accountid);
        }}>
          local storage data
        </button>
        <button onClick={() => {
        }}>consleing the hahsconnect data</button>

        <hi> 
          the second type of transections beings from here 
        </hi>
        <button onClick={async ()=>
        {
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic);
          console.log(accountid);
          console.log(ekey);
           
          const res = await sendTrasaction(topic,accountid,ekey);
          console.log(res);
          
        }
        }>clicke to dend h bar to google from your acc 

        </button>
      </header>
    </div>
  );
}
export default App;
