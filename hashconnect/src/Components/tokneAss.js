import { HashConnect } from "hashconnect";
import React, { useState } from "react";

let hashconnect = new HashConnect();

const AssociatebyUserPaidbyDPA = () => {
  const [inputValue, setInputValue] = useState("");

  const handleClick = async() => {
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
    console.log(inputValue);
    const body = {inputValue,accountid};
    const res2 = fetch('http://localhost:8080/associate',{
      method:"POST",
      mode:"cors",
      headers:{ 
          'Content-type':'application/json'
      },
      body: JSON.stringify(body)
  });
  
  const bytes = await res2.json();
  console.log('trnasection bytes are recieved');
  console.log('creating the trasection')
  const transaction = {
    topic: topic,
    byteArray: bytes,
    metadata: {
        accountToSign: accountid,
        returnTransaction: true,
        hideNft: false
    }
}
console.log(`sening the transection to the server for the signature`);

const {response} = await hashconnect.sendTransaction(topic, transaction);
console.log(response)

const sign = response.signedTransaction;

const body2 = {byte:bytes,signature:sign,acc:accountid}

const res3 = fetch('http://localhost:8080/associate',{
  method:"POST",
  mode:"cors",
  headers:{ 
      'Content-type':'application/json'
  },
  body: JSON.stringify(body2)
});

const res = await res3.json 
console.log(res);
console.log(`you token is asssciated`);
console.log(`transection is recived`); 
  
  };




  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Associate token </button>
    </div>
  );
};

export default AssociatebyUserPaidbyDPA;