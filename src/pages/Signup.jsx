import React from "react";

const Signup = () => {
  return (
    <div className="sign">
      <div className="container">
        <span className="welcome">Welcome To Safe-Health</span>
        <div className="buttons">
          <div className="one">
            <button className="signup">Sign Up</button>
            <div className="hov">
              <span>Doctor</span>
              <span>Patient</span>
            </div>
          </div>
          <div className="two">
            <button className="login">Login</button>
            <div className="hov">
              <span>Doctor</span>
              <span>Patient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
