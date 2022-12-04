import React, { useState } from "react";
import signeduser from '../utils/signedIn';
import { useNavigate, Link } from "react-router-dom";

const Plog = () => {
  const [modal, setModal] = useState(false);
  const [patient_adhaar,setAdhaar] = useState("");
  const [otp,setOtp] = useState("");
  const navigate = useNavigate();
  const toggleDown = () => {
    setModal(!modal);
  };
  const handleLogin=async()=>{
    let new_dict={
      "patient_id":patient_adhaar,
      "otp":otp,
      "function":"verify_otp/"
    }
    const response1 = await fetch(`${process.env.REACT_APP_URL}${new_dict.function}`, {
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
        "id":patient_adhaar,
        "function":"sign_in/"
      }
      const response2 = await fetch(`${process.env.REACT_APP_URL}${new_dict1.function}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_dict1),
      });
      navigate("/phome");
      // signeduser.adhaar = patient_adhaar;
      // Object.freeze(signeduser);

    }
    else{
      console.log("Invalid OTP")
    }
  }
  const sendOtp=async()=>{
    setModal(!modal);
    let dict={
      "patient_id":patient_adhaar,
      "function":"generate_otp/"
    }
    try{
    const response = await fetch(`${process.env.REACT_APP_URL}${dict.function}`, {
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
        <span className="reg">Login as Patient</span>
        <div className="form">
          <input type="text" placeholder="Patient Aadhar Number" onChange={(e) => setAdhaar(e.target.value)}/>
          <div onClick={sendOtp}>Log in</div>
        </div>
      </div>
    </div>
  );
};

export default Plog;
