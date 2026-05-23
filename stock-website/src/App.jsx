import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import CreateStock from "./CreateStock";
import { ToastContainer } from "react-toastify";

// /login
// react router dom
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-stock" element={<CreateStock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
