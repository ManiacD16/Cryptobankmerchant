import React from "react";

const WalletBalancePage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800">Wallet Balances</h2>
      <p className="text-gray-600 mb-4">Here you can view your wallet balances.</p>
      <div className="space-y-4">
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Balance 1: 1000 USDT</p>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Balance 2: 500 USDT</p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalancePage;
