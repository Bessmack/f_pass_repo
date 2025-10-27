import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ArrowDownToLine, Download } from "lucide-react";

export default function UserHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  // Dummy transaction data with additional details
  const transactions = [
    { 
      id: 1, 
      type: "sent", 
      name: "Sarah Johnson", 
      amount: -150.00, 
      date: "2025-10-15", 
      time: "14:30",
      status: "Completed",
      transactionId: "TXN1234567",
      fee: 0.75
    },
    { 
      id: 2, 
      type: "received", 
      name: "Add Funds", 
      amount: 500.00, 
      date: "2025-10-14", 
      time: "10:15",
      status: "Completed",
      transactionId: "TXN2234567",
      fee: 0.00
    },
    { 
      id: 3, 
      type: "sent", 
      name: "Michael Chen", 
      amount: -75.00, 
      date: "2025-10-13", 
      time: "16:45",
      status: "Completed",
      transactionId: "TXN3234567",
      fee: 0.38
    },
    { 
      id: 4, 
      type: "sent", 
      name: "Emily Davis", 
      amount: -200.00, 
      date: "2025-10-12", 
      time: "09:20",
      status: "Completed",
      transactionId: "TXN4234567",
      fee: 1.00
    },
    { 
      id: 5, 
      type: "received", 
      name: "Add Funds", 
      amount: 300.00, 
      date: "2025-10-11", 
      time: "11:00",
      status: "Completed",
      transactionId: "TXN5234567",
      fee: 0.00
    },
    { 
      id: 6, 
      type: "sent", 
      name: "David Wilson", 
      amount: -125.00, 
      date: "2025-10-10", 
      time: "15:30",
      status: "Completed",
      transactionId: "TXN6234567",
      fee: 0.63
    },
    { 
      id: 7, 
      type: "received", 
      name: "Add Funds", 
      amount: 1000.00, 
      date: "2025-10-09", 
      time: "08:45",
      status: "Completed",
      transactionId: "TXN7234567",
      fee: 0.00
    },
    { 
      id: 8, 
      type: "sent", 
      name: "Lisa Anderson", 
      amount: -90.00, 
      date: "2025-10-08", 
      time: "13:15",
      status: "Completed",
      transactionId: "TXN8234567",
      fee: 0.45
    },
  ];

  // Calculate totals
  const totalSent = transactions
    .filter(t => t.type === "sent")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalReceived = transactions
    .filter(t => t.type === "received")
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter(t => {
    if (activeTab === "all") return true;
    if (activeTab === "sent") return t.type === "sent";
    if (activeTab === "received") return t.type === "received";
    return true;
  });

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      {/* Header - Fixed */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-semibold text-white">Transactions</h1>
        </div>

        {/* Transaction Summary Cards */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-blue-500 rounded-2xl p-5">
            <p className="text-blue-100 text-sm mb-1">Total Sent</p>
            <p className="text-white font-bold text-2xl">${totalSent.toFixed(2)}</p>
          </div>
          <div className="flex-1 bg-blue-500 rounded-2xl p-5">
            <p className="text-blue-100 text-sm mb-1">Total Received</p>
            <p className="text-white font-bold text-2xl">${totalReceived.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "sent"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sent
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "received"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Received
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3 pb-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => handleTransactionClick(transaction)}
                className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === "sent" ? "bg-red-100" : "bg-green-100"
                }`}>
                  {transaction.type === "sent" ? (
                    <Send size={20} className="text-red-600" />
                  ) : (
                    <ArrowDownToLine size={20} className="text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.date} at {transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.type === "sent" ? "text-red-600" : "text-green-600"
                  }`}>
                    {transaction.type === "sent" ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

            {/* Icon and Amount */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                selectedTransaction.type === "sent" ? "bg-red-100" : "bg-green-100"
              }`}>
                {selectedTransaction.type === "sent" ? (
                  <Send size={28} className="text-red-600" />
                ) : (
                  <ArrowDownToLine size={28} className="text-green-600" />
                )}
              </div>
              <p className={`text-3xl font-bold mb-2 ${
                selectedTransaction.type === "sent" ? "text-red-600" : "text-green-600"
              }`}>
                {selectedTransaction.type === "sent" ? "-" : "+"}${Math.abs(selectedTransaction.amount).toFixed(2)}
              </p>
              <p className="text-gray-500">{selectedTransaction.status}</p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Type</span>
                <span className="font-semibold text-gray-900 capitalize">{selectedTransaction.type}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{selectedTransaction.type === "sent" ? "To" : "From"}</span>
                <span className="font-semibold text-gray-900">{selectedTransaction.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">{selectedTransaction.date}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">{selectedTransaction.time}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Transaction Fee</span>
                <span className="font-semibold text-gray-900">${selectedTransaction.fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-semibold text-gray-900">{selectedTransaction.transactionId}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Download size={18} />
                Receipt
              </button>
              <button 
                onClick={closeModal}
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