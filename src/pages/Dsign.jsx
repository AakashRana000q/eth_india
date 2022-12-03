import React from "react";
import Web3 from "web3";
import { useNavigate, Link } from "react-router-dom";

const Dsign = () => {
  const navigate = useNavigate();
  const handleSign=async(e)=>{
    e.preventDefault();
    const doc_name = e.target[0].value;
    const doc_adhaar = e.target[1].value;
    const number = e.target[2].value;
    const issue_center = e.target[3].value;
    const doc_id = e.target[4].value;

    const web3Provider = new Web3.providers.HttpProvider(
      "https://goerli.infura.io/v3/b233d4b0b43b4370982d3a0fe41d1080"
    );
    const web3 = new Web3(web3Provider);
  
    const account = web3.eth.accounts.create();
    let dict={
      "doc_name": doc_name,
      "doc_adhaar":doc_adhaar,
      "number":number,
      "issue_center":issue_center,
      "doc_id":doc_id,
      "doc_wallet":account.address,
      "function":"newdoc/",
    };

    try {
      console.log(dict);
      const response = await fetch('http://127.0.0.1:8000/newdoc/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict),
      });
      console.log(response.json);
      navigate("/dhome");
    }catch (err) {
      console.log(err);
    }
    
  }
  return (
    <div className="dsign">
      <div className="container">
        <span className="reg">Regiter as Doctor</span>
        <form onSubmit={handleSign}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Aadhar Number" />
          <input type="text" placeholder="Mobile Number" />
          <input type="text" placeholder="Hospital Id" />
          <input type="text" placeholder="Doctor Identification Number" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Dsign;
