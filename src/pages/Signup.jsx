import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="sign">
      <div className="container">
        <span className="welcome">Global Health Records</span>
        <div className="buttons">
          <div className="one">
            <button className="signup">Sign Up</button>
            <div className="hov">
              <Link to="/dsign"><span>Doctor</span></Link>
              <Link to="/psign"><span>Patient</span></Link>
            </div>
          </div>
          <div className="two">
            <button className="login">Login</button>
            <div className="hov">
              <Link to="/dlog"><span>Doctor</span></Link>
              <Link to="/plog"><span>Patient</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
