import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ArrowDownToLine, Download } from "lucide-react";

export default function UserHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setTransactions(data.transactions);
        } else {
          console.error("Failed to load transactions:", data.error);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // ✅ Compute totals
  const totalSent = transactions
    .filter((t) => t.sender_id)
    .reduce((sum, t) => sum + (t.amount + (t.fee || 0)), 0);

  const totalReceived = transactions
    .filter((t) => t.receiver_id)
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  // ✅ Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "sent") return t.sender_id;
    if (activeTab === "received") return t.receiver_id;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-600">
        <p className="text-white text-lg">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-semibold text-white">Transaction History</h1>
        </div>

        {/* Summary */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-blue-500 rounded-2xl p-5">
            <p className="text-blue-100 text-sm mb-1">Total Sent</p>
            <p className="text-white font-bold text-2xl">KES {totalSent.toFixed(2)}</p>
          </div>
          <div className="flex-1 bg-blue-500 rounded-2xl p-5">
            <p className="text-blue-100 text-sm mb-1">Total Received</p>
            <p className="text-white font-bold text-2xl">KES {totalReceived.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="flex-1 bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "sent", "received"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Transaction Cards */}
        <div className="space-y-3 pb-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.transaction_id}
                onClick={() => setSelectedTransaction(transaction)}
                className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.sender_id ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {transaction.sender_id ? (
                    <Send size={20} className="text-red-600" />
                  ) : (
                    <ArrowDownToLine size={20} className="text-green-600" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {transaction.sender_id ? `To: ${transaction.receiver_id}` : `From: ${transaction.sender_id}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      transaction.sender_id ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {transaction.sender_id ? "-" : "+"}KES {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">No transactions found</div>
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  selectedTransaction.sender_id ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {selectedTransaction.sender_id ? (
                  <Send size={28} className="text-red-600" />
                ) : (
                  <ArrowDownToLine size={28} className="text-green-600" />
                )}
              </div>
              <p
                className={`text-3xl font-bold mb-2 ${
                  selectedTransaction.sender_id ? "text-red-600" : "text-green-600"
                }`}
              >
                {selectedTransaction.sender_id ? "-" : "+"}KES{" "}
                {Math.abs(selectedTransaction.amount).toFixed(2)}
              </p>
              <p className="text-gray-500 capitalize">{selectedTransaction.status}</p>
            </div>

            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex justify-between border-b py-2">
                <span>Transaction ID</span>
                <span className="font-medium">{selectedTransaction.transaction_id}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Type</span>
                <span className="font-medium capitalize">{selectedTransaction.type}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Fee</span>
                <span>KES {selectedTransaction.fee?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Note</span>
                <span>{selectedTransaction.note || "None"}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Receipt
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
