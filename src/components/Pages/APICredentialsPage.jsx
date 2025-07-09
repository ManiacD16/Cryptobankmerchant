import React from "react";

const APICredentialsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800">API Credentials</h2>
      <p className="text-gray-600 mb-4">Here you can view your API credentials and documentation.</p>
      {/* Example API credentials */}
      <div className="space-y-2">
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <h3 className="text-xl font-medium">API Key</h3>
          <p className="text-gray-700">YOUR_API_KEY_HERE</p>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl">
          <h3 className="text-xl font-medium">API Documentation</h3>
          <p className="text-gray-700">
            [Link to API documentation here]
          </p>
        </div>
      </div>
    </div>
  );
};

export default APICredentialsPage;
