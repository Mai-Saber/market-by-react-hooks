import "./App.css";
import React from "react";
import Seller from "./Components/Seller/seller";
import Buyer from "./Components/Buyer/Buyer";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import FixedNav from "./Components/FixedNav/FixedNav";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {sessionStorage.getItem("role") === "seller" ? (
            <>
              <Route path="/products" element={<Seller />} />
              <Route path="/" element={<Navigate to="/products" />} />
            </>
          ) : null}

          {sessionStorage.getItem("role") === "buyer" ? (
            <>
              <Route path="/products" element={<Buyer />} />
              <Route path="/" element={<Navigate to="/products" />} />
            </>
          ) : null}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
