import React, { useState,useEffect } from "react";
import { parts } from "../utils/parts";
import signeduser from '../utils/signedIn';
const Phome = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [user, setUser] = useState(null);
  const [listall, setListall] = useState(null);
  const [list,setList] = useState(null);
  const [loading,setLoading] = useState(true);
  const [loading2,setLoading2] = useState(true);

  const [checkedState, setCheckedState] = useState(
    new Array(parts.length).fill(false)
  );
  useEffect(() => {
    let dict1={
      "patient_id":signeduser.adhaar,
      "doc_id":signeduser.adhaar,
      "date":"04/12/2022",
      "function":"emergency/",
    }
    fetch('http://127.0.0.1:8000/emergency/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict1),
      }).then((response)=>{
        response.json();
      }).then((res)=>{
        setListall(res);
      })  
      }, []);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const toggle1 = async() => {
    setModal1(!modal1);
    console.log(signeduser.adhaar);
    let dict={
      "patient_id":signeduser.adhaar,
      "function":"get_basic_record",
    }
    const response = await fetch('http://127.0.0.1:8000/get_basic_record/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict),
      });
      const res= await response.json();
      console.log(res.File);
      setUser(res.File);
      setLoading(false);
  };
  const toggle2 = () => {
    setModal2(!modal2);
    console.log(listall);
  };
  return (
    <div className="phome">
      {modal1 && (
        <div className="modal">
          <div className="overlay" onClick={toggle1}></div>
          <div className="content1">
            {!loading && <div className="layer">
              <span>Gender : {user.gender}</span>
              <span>Blood Group : {user.blood_group}</span>
              <span>Height : {user.height}</span>
              <span>Weight : {user.weight}</span>
              <span>Important Medical Conditions : {user.medical_conditions}</span>
              <span>Emergency Contact Number : {user.emergency_number}</span>
            </div>}
          </div>
        </div>
      )}
      {modal2 && (
        <div className="modal">
          <div className="overlay" onClick={toggle2}></div>
          <div className="content2">
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
                <button>Proceed</button>
              </div>
            </div>
            <div className="doc">
              <div className="horow">
                  <span>Doctor ID</span>
                  <div className="text">
                    <p>fs</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Patient Aadhar</span>
                  <div className="text">
                    <p>fs</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Hospital ID</span>
                  <div className="text">
                    <p>fs</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Anatomy Category</span>
                  <div className="text">
                    <p>fs</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Summary</span>
                  <div className="text2">
                    <p>fs</p>
                  </div>
              </div>
              <div className="horow">
                  <span>Prescription</span>
                  <div className="text2">
                    <p>fs</p>
                  </div>
              </div>
            </div>
            <div className="doc"></div>
            <div className="doc"></div>
            <div className="doc"></div>
            <div className="doc"></div>
          </div>
        </div>
      )}
      <div className="container">
        <span>Welcome Feynman</span>
        <div className="buttons">
          <div className="all" onClick={toggle1}>
            Basic Health Records
          </div>
          <div className="filter" onClick={toggle2}>
            All Records
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phome;
