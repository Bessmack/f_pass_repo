import React, { useEffect, useState } from "react";
import { walletAPI, transactionAPI } from "../services/api";

const UserWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletAndTransactions = async () => {
      try {
        const [walletRes, txRes] = await Promise.all([
          walletAPI.getWallet(),
          transactionAPI.getTransactions(),
        ]);

        setWallet(walletRes.data.wallet || walletRes.data);
        setTransactions(txRes.data.transactions || []);
      } catch (error) {
        console.error("Error fetching wallet/transactions:", error);
        setError(error.response?.data?.error || "Failed to load wallet data");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletAndTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading wallet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Wallet not found
      </div>
    );
  }

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "sent") return t.sender_id === wallet.user_id;
    if (activeTab === "received") return t.receiver_id === wallet.user_id;
    return true;
  });

  const totalSent = transactions
    .filter((t) => t.sender_id === wallet.user_id)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalReceived = transactions
    .filter((t) => t.receiver_id === wallet.user_id)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">My Wallet</h1>

      {/* Wallet Summary */}
      <div className="bg-gray-100 shadow rounded-lg p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2">Wallet Overview</h2>
        <p>
          <strong>Wallet ID:</strong> {wallet.wallet_id}
        </p>
        <p>
          <strong>Balance:</strong> KES {Number(wallet.balance).toFixed(2)}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {wallet.updated_at
            ? new Date(wallet.updated_at).toLocaleString()
            : "N/A"}
        </p>
      </div>

      {/* Transaction Filters */}
      <div className="flex justify-center mb-6 space-x-4">
        {["all", "sent", "received"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
        <h3 className="font-semibold text-gray-700 mb-2">
          Transaction Summary
        </h3>
        <div className="flex justify-between text-sm">
          <p>
            Total Sent: <strong>KES {totalSent.toFixed(2)}</strong>
          </p>
          <p>
            Total Received: <strong>KES {totalReceived.toFixed(2)}</strong>
          </p>
          <p>
            Total Transactions: <strong>{transactions.length}</strong>
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          filteredTransactions.map((t) => (
            <div
              key={t.transaction_id}
              className="p-4 bg-white shadow rounded-md border hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-900">
                {t.type === "transfer"
                  ? t.sender_id === wallet.user_id
                    ? `To: ${t.receiver_name || t.receiver_id}`
                    : `From: ${t.sender_name || t.sender_id}`
                  : t.type}
              </p>
              <p className="text-sm text-gray-500">
                {t.created_at
                  ? new Date(t.created_at).toLocaleString()
                  : "Unknown date"}
              </p>
              <p className="mt-2">
                Amount:{" "}
                <span
                  className={
                    t.sender_id === wallet.user_id
                      ? "text-red-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }
                >
                  {t.sender_id === wallet.user_id ? "-" : "+"} KES{" "}
                  {Number(t.amount).toFixed(2)}
                </span>
              </p>
              {t.fee > 0 && (
                <p className="text-sm text-gray-600">Fee: KES {t.fee}</p>
              )}
              {t.note && (
                <p className="text-sm text-gray-500 italic mt-1">{t.note}</p>
              )}
              <p
                className={`text-xs font-semibold mt-2 ${
                  t.status === "completed"
                    ? "text-green-600"
                    : t.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                Status: {t.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserWallet;