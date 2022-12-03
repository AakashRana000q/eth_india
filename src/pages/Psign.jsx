import React, { useState } from "react";
import Web3 from "web3";
const Psign = () => {
  const [modal, setModal] = useState(false);
  const [patient_adhaar, setPatad] = useState("");
  const [patient_name, setPatname] = useState("");
  const [number, setPatnum] = useState("");
  const [issue_center, setPatissue] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [height, setHeight] = useState("");
  const [meds, setMeds] = useState("");
  const [emnum ,setEmnum] = useState("");
  const [weight ,setWeight] = useState("");
  const toggleDown = () => {
    setModal(!modal);
  };
  const handleSubmit=async()=>{
    const web3Provider = new Web3.providers.HttpProvider(
      "https://goerli.infura.io/v3/b233d4b0b43b4370982d3a0fe41d1080"
    );
    const web3 = new Web3(web3Provider);
  
    const account = web3.eth.accounts.create();
    let dict1={
      "gender":gender,
      "blood_group":blood,
      "height":height,
      "weight":weight,
      "medical_conditions":meds,
      "emergency_number":emnum
    };
    let dict2={
      "patient_name": patient_name,
      "patient_adhaar":patient_adhaar,
      "number":number,
      "issue_center":issue_center,
      "patient_wallet":account.address,
      "file":dict1,
      "function":"newpatient/",
    };
    try {
      console.log(dict2);
      const response = await fetch('http://127.0.0.1:8000/newpatient/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict2),
      });
      console.log(response.json);
    }catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="psign">
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleDown}></div>
          <div className="content">
            <span className="otp">Enter basic health details</span>
            <input type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)}/>
            <input type="text" placeholder="Blood Group" onChange={(e) => setBlood(e.target.value)}/>
            <input type="text" placeholder="Height" onChange={(e) => setHeight(e.target.value)}/>
            <input type="text" placeholder="Weight" onChange={(e) => setWeight(e.target.value)}/>
            <input
              type="text"
              placeholder="Important Medical Conditions (List all)" 
              onChange={(e) => setMeds(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number to notify in emergency"
              onChange={(e) => setEmnum(e.target.value)}
            />
            <button className="proc" onClick={handleSubmit}>Proceed</button>
          </div>
        </div>
      )}
      <div className="container">
        <span className="reg">Register as Patient</span>
        <div className="form">
          <input type="text" placeholder="Name" onChange={(e) => setPatname(e.target.value)}/>
          <input type="text" placeholder="Aadhar Number" onChange={(e) => setPatad(e.target.value)}/>
          <input type="text" placeholder="Mobile Number" onChange={(e) => setPatnum(e.target.value)}/>
          <input type="text" placeholder="Issue Center Number" onChange={(e) => setPatissue(e.target.value)}/>
          <div onClick={toggleDown}>Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default Psign;
