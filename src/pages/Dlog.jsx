import React, { useState } from "react";

const Dlog = () => {
  const [modal, setModal] = useState(false);
  const [doc_id,setDocid] = useState("");
  const [otp,setOtp] = useState("");
  const toggleDown = () => {
    setModal(!modal);
  };
  const handleLogin=async()=>{
    let new_dict={
      "patient_id":doc_id,
      "otp":otp,
      "function":"verify_otp/"
    }
    const response1 = await fetch('http://127.0.0.1:8000/verify_otp/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_dict),
      });
      const buul = await response1.json();
      console.log(typeof buul,buul);
    if(buul=="True"){
      console.log("Welcome, you are logged in");
      let new_dict1={
        "id":doc_id,
        "function":"sign_in/"
      }
      const response2 = await fetch('http://127.0.0.1:8000/sign_in/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_dict1),
      });
    }
    else{
      console.log("Invalid OTP")
    }
  }
  const sendOtp=async()=>{
    setModal(!modal);
    let dict={
      "patient_id":doc_id,
      "function":"generate_otp/"
    }
    try{
    const response = await fetch('http://127.0.0.1:8000/generate_otp/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict),
      });
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="dlog">
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleDown}></div>
          <div className="content">
            <span className="otp">Please Enter OTP</span>
            <input type="text" placeholder="Enter Here" onChange={(e) => setOtp(e.target.value)}/>
            <button className="proc" onClick={handleLogin}>Proceed</button>
          </div>
        </div>
      )}
      <div className="container">
        <span className="reg">Login as Doctor</span>
        <div className="form">
          <input type="text" placeholder="Doctor Identification Number" onChange={(e) => setDocid(e.target.value)}/>
          <div onClick={sendOtp}>Log in</div>
        </div>
      </div>
    </div>
  );
};

export default Dlog;
