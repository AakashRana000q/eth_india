import React, { useState } from "react";
import Web3 from "web3";
const Psign = () => {
  const [modal, setModal] = useState(false);
  const toggleDown = () => {
    setModal(!modal);
  };
  const web3Provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/b233d4b0b43b4370982d3a0fe41d1080"
  );
  const web3 = new Web3(web3Provider);

  const account = web3.eth.accounts.create();
  console.log("My New Account:", account);

  return (
    <div className="psign">
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleDown}></div>
          <div className="content">
            <span className="otp">Enter basic health details</span>
            <input type="text" placeholder="Gender" />
            <input type="text" placeholder="Blood Group" />
            <input type="text" placeholder="Height" />
            <input type="text" placeholder="Weight" />
            <input
              type="text"
              placeholder="Important Medical Conditions (List all)"
            />
            <input
              type="text"
              placeholder="Phone Number to notify in emergency"
            />
            <button className="proc">Proceed</button>
          </div>
        </div>
      )}
      <div className="container">
        <span className="reg">Register as Patient</span>
        <div className="form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Aadhar Number" />
          <input type="text" placeholder="Mobile Number" />
          <input type="text" placeholder="Issue Center Number" />
          <div onClick={toggleDown}>Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default Psign;
