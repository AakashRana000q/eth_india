import React,{useState} from "react";

const Records = () => {
  const [docid,setDocid] = useState("");
  const [patad,setPatad] = useState("");
  const [hopid,setHopid] = useState("");
  const [cat,setCat] = useState("");
  const [sum,setSum] = useState("");
  const [pres,setPres] = useState("");
  const handleSubmit=async()=>{
    let dict={
        "patient_id":patad,
        "doc_id":docid,
        "issue_center":hopid,
        "file":{
            "patient_id":patad,
            "doc_id":docid,
            "issue_center":hopid,
            "category":cat,
            "summary":sum,
            "prescription":pres,
        },
        "function":"addrecord/",
    }
    const response = await fetch('http://127.0.0.1:8000/addrecord/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict),
      });
      const res= await response.json();
      console.log(res);
  }
  return (
    <div className="records">
      <div className="container">
        <div className="horow">
            <span>Doctor ID</span>
            <input type="text" placeholder="Enter " className="low" onChange={(e) => setDocid(e.target.value)}/>
        </div>
        <div className="horow">
            <span>Patient Aadhar</span>
            <input type="text" placeholder="Enter " className="low" onChange={(e) => setPatad(e.target.value)}/>
        </div>
        <div className="horow">
            <span>Hospital ID</span>
            <input type="text" placeholder="Enter " className="low" onChange={(e) => setHopid(e.target.value)}/>
        </div>
        <div className="horow">
            <span>Anatomy Category</span>
            <input type="text" placeholder="Enter " className="low" onChange={(e) => setCat(e.target.value)}/>
        </div>
        <div className="horow">
            <span>Summary</span>
            <input type="text" placeholder="Enter " className="high" onChange={(e) => setSum(e.target.value)}/>
        </div>
        <div className="horow">
            <span>Prescription</span>
            <input type="text" placeholder="Enter " className="high" onChange={(e) => setPres(e.target.value)}/>
        </div>
        <div className="btn">
            <button onClick={handleSubmit}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default Records;
