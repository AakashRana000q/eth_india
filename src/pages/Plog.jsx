import React, { useState } from "react";

const Plog = () => {
  const [modal, setModal] = useState(false);
  const toggleDown = () => {
    setModal(!modal);
  };
  return (
    <div className="dlog">
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleDown}></div>
          <div className="content">
            <span className="otp">Please Enter OTP</span>
            <input type="text" placeholder="Enter Here" />
            <button className="proc">Proceed</button>
          </div>
        </div>
      )}
      <div className="container">
        <span className="reg">Login as Patient</span>
        <div className="form">
          <input type="text" placeholder="Patient Aadhar Number" />
          <div onClick={toggleDown}>Log in</div>
        </div>
      </div>
    </div>
  );
};

export default Plog;
