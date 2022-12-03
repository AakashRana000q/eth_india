import React, { useState } from "react";
import signeddoc from '../utils/signedInd';
import { parts } from "../utils/parts";
import { useNavigate, Link } from "react-router-dom";

const Dhome = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [modal8, setModal8] = useState(false);
  const navigate = useNavigate();
  const [patid,setPatid] = useState("");
  const [loading,setLoading] = useState(true);
  const [emlist,setEmlist]  = useState(null);
  const [list,setList]  = useState(null);
  const [otp,setOtp] = useState(null);
  const [checkedState, setCheckedState] = useState(
    new Array(parts.length).fill(false)
  );
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
    setModal7(false);
    setModal8(false);
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
        navigate("/records");
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
      emergencyacc();
      // let new_dict={
      //   "patient_id":patid,
      //   "doc_id":signeddoc.id,
      //   "type":"1",
      //   "function":"get_permission/"
      // }
      // const response1 = await fetch('http://127.0.0.1:8000/get_permission/', {
      //     method: 'POST',
      //     mode: 'cors',
      //     credentials: 'same-origin',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(new_dict),
      //   });
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
    let rese;
    await fetch('http://127.0.0.1:8000/emergency/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict1),
      }).then((response)=>
        response.json()
      ).then((res)=>{
        rese=res;
        setEmlist(res);
        console.log(res);
      })
    let nlist=[]
    
    Object.keys(rese).forEach(function(key, index) {
      nlist.push(rese[key]);
    });
    setEmlist(nlist);
    setList(nlist);
    setLoading(false);
    toggleall();
    setModal7(!modal7);
  }
  const getmyrecords=async()=>{
    setModal4(!modal4);
    setModal8(!modal8);
  }
  const docspat=async()=>{
    let dict1={
      "patient_id":patid,
      "doc_id":signeddoc.id,
      "function":"get_patient_records/",
    }
    let rese;
    await fetch('http://127.0.0.1:8000/get_patient_records/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict1),
      }).then((response)=>
        response.json()
      ).then((res)=>{
        rese=res.Files;
        setEmlist(res);
        console.log(res);
      })
    let nlist=[]
    
    Object.keys(rese).forEach(function(key, index) {
      nlist.push(rese[key]);
    });
    setEmlist(nlist);
    setList(nlist);
    setLoading(false);
    toggleall();
    setModal7(!modal7);
  }
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  const applyFilter=async()=>{
    let final_list=[];
    setLoading(true);
    for(var i=0;i<emlist.length;i++){
      if(emlist[i].category=="ENT" && checkedState[0]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Orthopedic" && checkedState[1]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Reproductive" && checkedState[2]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Respiratory" && checkedState[3]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Cardiological" && checkedState[4]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Infections" && checkedState[5]){
        final_list.push(emlist[i]);
      }
      else if(emlist[i].category=="Neurological" && checkedState[6]){
        final_list.push(emlist[i]);
      }
    }
    setList(final_list);
    console.log(final_list);
    setLoading(false);
  }
  const navrecord=()=>{
    navigate("/records");
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
              <button onClick={navrecord}>Create</button>
            </div>
          </div>
        </div>
      )}
      {modal4 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content1">
            <button onClick={getmyrecords}>My Records</button>
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
      {modal7 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content3">
            <div className="fils">
              <span className="filters">Filters</span>
              <div className="all_fils">
                {parts.map(({ name }, index) => {
                  return (
                    <div className="parts-list-item">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="btn">
                <button onClick={applyFilter}>Apply</button>
              </div>
            </div>
            {!loading && list.map((meds) => {
            return (
              <div className="doc">
              <div className="horow">
                  <span>Doctor ID</span>
                  <div className="text">
                    <p>{meds.doc_id}</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Patient Aadhar</span>
                  <div className="text">
                    <p>{meds.patient_id}</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Hospital ID</span>
                  <div className="text">
                    <p>{meds.issue_center}</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Anatomy Category</span>
                  <div className="text">
                    <p>{meds.category}</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Summary</span>
                  <div className="text2">
                    <p>{meds.summary}</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Prescription</span>
                  <div className="text2">
                    <p>{meds.prescription}</p>
                  </div>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      )}
      {modal8 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" onChange={(e) => setPatid(e.target.value)}/>
              <button onClick={docspat}>Access</button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <span>Welcome, {signeddoc.name}</span>
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
