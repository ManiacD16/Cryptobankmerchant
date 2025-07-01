import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
// import QRCodeGenerator from "./components/QRCodeGenerator";
// import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    // <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        {/* <div className="container mx-auto mt-6"> */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
          </Routes>
        {/* </div> */}
      </div>
    //  </Router>
  );
};

export default App;
