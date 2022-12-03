import React, { useState } from "react";
import { parts } from "../utils/parts";
const Dhome = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const toggle12 = () => {
    setModal1(!modal1);
    setModal2(!modal2);
  };
  const toggle13 = () => {
    setModal1(!modal1);
    setModal3(!modal3);
  };
  const toggle42 = () => {
    setModal4(!modal4);
    setModal2(!modal2);
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
  };
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
              <input type="text" placeholder="Enter Patient's Aadhar Number" />
              <button>Send OTP</button>
            </div>
            <div className="step">
              <input type="text" placeholder="Enter OTP sent to patient" />
              <button>Verify OTP</button>
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
            <button onClick={toggle42}>All records</button>
          </div>
        </div>
      )}
      {modal5 && (
        <div className="modal">
          <div className="overlay" onClick={toggleall}></div>
          <div className="content2">
            <div className="step">
              <input type="text" placeholder="Enter Patient's Aadhar Number" />
              <button>Access</button>
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
