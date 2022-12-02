import React from "react";

const Dsign = () => {
  return (
    <div className="dsign">
      <div className="container">
        <span className="reg">Regiter as Doctor</span>
        <form>
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
