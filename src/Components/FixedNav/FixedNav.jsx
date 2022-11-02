import React, { useState } from "react";
import "./FixedNav.css";
import { Link } from "react-router-dom";

function FixedNav(props) {
  const [items] = useState([
    { role: "seller", id: 1 },
    { role: "buyer", id: 2 },
  ]);

  const handleChangeRadio = (role) => {
    sessionStorage.setItem("role", role);
  };

   const handleLogout = () => {
     console.log("logout", sessionStorage.getItem("email"));
     sessionStorage.clear();
   };
  return (
    <>
      <div className="fixedNav">
        <ul>
          <div className="row items">
            <li className="col-4  ">
              <img
                className="App-logo"
                src="data:image/jpeg;base64,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"
                alt="logo"
              />
            </li>
            <li className="col-4 logout">
              <span>Hello ! {sessionStorage.getItem("role")}</span>
            </li>
            <li className="col-4 logout">
              <Link to="/login" onClick={() => handleLogout()}>
                <span className="logoutIcon">
                  <i className="ri-logout-box-line"></i>
                </span>
                Logout
              </Link>{" "}
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default FixedNav;
