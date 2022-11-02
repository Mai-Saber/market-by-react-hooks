import "./App.css";
import React from "react";
import Product from "./Components/Body/Products";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/products" element={<Product />} />
          <Route path="/" element={<Navigate to="/products" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
