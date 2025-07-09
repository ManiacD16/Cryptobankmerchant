import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";  // Use HashRouter
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import TransactionsPage from "./components/Pages/TransactionsPage";  // Import additional pages
import APICredentialsPage from "./components/Pages/APICredentialsPage";
import WithdrawRequestsPage from "./components/Pages/WithdrawRequestsPage";
import WalletBalancePage from "./components/Pages/WalletBalancePage";

const App = () => {
  return (
    // <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/api-credentials" element={<APICredentialsPage />} />
          <Route path="/withdraw-requests" element={<WithdrawRequestsPage />} />
          <Route path="/wallet-balances" element={<WalletBalancePage />} />
        </Routes>
      </div>
    // </Router>
  );
};

export default App;
