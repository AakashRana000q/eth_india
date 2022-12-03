import React, { useState } from "react";
import signeddoc from '../utils/signedInd';
import { parts } from "../utils/parts";
const Dhome = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);
  const [patid,setPatid] = useState("");
  const [emlist,setEmlist]  = useState(null);
  const [otp,setOtp] = useState(null);
  const toggle12 = () => {
    setModal1(!modal1);
    setModal2(!modal2);
  };
  const toggle13 = () => {
    setModal1(!modal1);
    setModal3(!modal3);
  };
  const toggle46 = () => {
    setModal4(!modal4);
    setModal6(!modal6);
  };
  const toggle1 = () => {
    setModal1(!modal1);
  };
  const toggle4 = () => {
    setModal4(!modal4);
  };
  const toggle5 = () => {
    setModal5(!modal5);
  };
  const toggleall = () => {
    setModal1(false);
    setModal2(false);
    setModal3(false);
    setModal4(false);
    setModal5(false);
    setModal6(false);
  };
  const sendOtp=async()=>{
    let dict={
      "patient_id":patid,
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
  const verifyOtpforcreating=async()=>{
    let new_dict={
      "patient_id":patid,
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
    if(buul=="True"){
      console.log("Welcome, you are logged in");
      let new_dict={
        "patient_id":patid,
        "doc_id":signeddoc.id,
        "function":"add_doc/"
      }
      const response1 = await fetch('http://127.0.0.1:8000/add_doc/', {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_dict),
        });
    }
    else{
      console.log("Invalid OTP")
    }
  }
  const verifyOtpforaccessing=async()=>{
    let new_dict={
      "patient_id":patid,
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
    if(buul=="True"){
      console.log("Welcome, you are logged in");
      let new_dict={
        "patient_id":patid,
        "doc_id":signeddoc.id,
        "type":"1",
        "function":"get_permission/"
      }
      const response1 = await fetch('http://127.0.0.1:8000/get_permission/', {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_dict),
        });
    }
    else{
      console.log("Invalid OTP")
    }
  }
  const emergencyacc=async()=>{
    let dict1={
      "patient_id":patid,
      "doc_id":signeddoc.id,
      "date":"04/12/2022",
      "function":"emergency/",
    }
    const response = fetch('http://127.0.0.1:8000/emergency/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dict1),
    })
    console.log(response);
    const res = await response.json();
    setEmlist(res.Files);
  }
  return (
    <div className="dhome">
      {modal1 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content1">
            <button onClick={toggle12}>New Patient</button>
            <button onClick={toggle13}>Existing Patient</button>
          </div>
        </div>
      )}
      {modal2 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" onChange={(e) => setPatid(e.target.value)}/>
              <button onClick={sendOtp}>Send OTP</button>
            </div>
            <div className="step">
              <input type="text" placeholder="Enter OTP sent to patient" onChange={(e) => setOtp(e.target.value)}/>
              <button onClick={verifyOtpforcreating}>Verify OTP</button>
            </div>
          </div>
        </div>
      )}
      {modal3 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" />
              <button>Create</button>
            </div>
          </div>
        </div>
      )}
      {modal4 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content1">
            <button>My Records</button>
            <button onClick={toggle46}>All records</button>
          </div>
        </div>
      )}
      {modal5 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" onChange={(e) => setPatid(e.target.value)}/>
              <button onClick={emergencyacc}>Access</button>
            </div>
          </div>
        </div>
      )}
      {modal6 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" onChange={(e) => setPatid(e.target.value)}/>
              <button onClick={sendOtp}>Send OTP</button>
            </div>
            <div className="step">
              <input type="text" placeholder="Enter OTP sent to patient" onChange={(e) => setOtp(e.target.value)}/>
              <button onClick={verifyOtpforaccessing}>Verify OTP</button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <span>Welcome Feynman</span>
        <div className="buttons">
          <div className="all" onClick={toggle1}>
            Create Record
          </div>
          <div className="filter" onClick={toggle4}>
            Access Record
          </div>
          <div className="emer" onClick={toggle5}>
            Emergency Access
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dhome;
