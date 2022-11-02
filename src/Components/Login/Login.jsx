import React, { useState } from "react";
import "./Login.css";

function Login(props) {
  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
   
  };

  const handleSubmit = () => {
     console.log(role);
    sessionStorage.setItem("role", role);
    window.location = "/products";
    console.log(sessionStorage.getItem("role"));
  };
  return (
    <div className="Login">
      <div className="box">
        <h1> Do you Buyer or seller ?</h1>
        <div className="dropDown">
          <label htmlFor="roles">Choose A role:</label>
          <select name="roles" id="roles" value={role} onChange={handleChange}>
            <option value="">Choose role</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
