import React from "react";

const WithdrawRequestsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800">Withdrawal Requests</h2>
      <p className="text-gray-600 mb-4">Here you can view all withdrawal requests.</p>
      {/* Example Withdrawal Requests */}
      <div className="space-y-4">
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Withdrawal Request 1</p>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <p>Withdrawal Request 2</p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequestsPage;
