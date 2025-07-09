import React from "react";

const TransactionsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800">Transactions</h2>
      <p className="text-gray-600 mb-4">Here you can view all your transactions.</p>
      <div className="space-y-4">
        {/* Example Transaction List */}
        {/* You can replace this with dynamic data */}
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Transaction 1</p>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Transaction 2</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
