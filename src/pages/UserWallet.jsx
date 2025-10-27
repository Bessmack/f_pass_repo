import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Copy, ArrowLeft, Wallet, CreditCard, ArrowDownToLine, Send, History } from "lucide-react";

export default function UserWallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const walletId = "QP-SAL-7YUD0B";
  const balance = "$5420.50";
  const cardNumber = "4532 **** **** 8901";
  const cardHolder = "JOHN DOE";
  const cardExpiry = "12/28";
  const totalSent = "$640.00";
  const totalReceived = "$1800.00";

  const transactions = [
    { id: 1, type: "sent", name: "Sarah Johnson", amount: -150.00, date: "2025-10-15 at 14:30", status: "Completed" },
    { id: 2, type: "received", name: "Add Funds", amount: 500.00, date: "2025-10-14 at 10:15", status: "Completed" },
    { id: 3, type: "sent", name: "Michael Chen", amount: -75.00, date: "2025-10-13 at 16:45", status: "Completed" },
    { id: 4, type: "sent", name: "Emily Davis", amount: -200.00, date: "2025-10-12 at 09:20", status: "Completed" },
    { id: 5, type: "received", name: "Add Funds", amount: 300.00, date: "2025-10-11 at 11:00", status: "Completed" },
    { id: 6, type: "sent", name: "David Wilson", amount: -125.00, date: "2025-10-10 at 15:30", status: "Completed" },
    { id: 7, type: "received", name: "Add Funds", amount: 1000.00, date: "2025-10-09 at 08:45", status: "Completed" },
    { id: 8, type: "sent", name: "Lisa Anderson", amount: -90.00, date: "2025-10-08 at 13:15", status: "Completed" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === "all") return true;
    if (activeTab === "sent") return t.type === "sent";
    if (activeTab === "received") return t.type === "received";
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      {/* Header - Fixed */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-semibold text-white">My Wallet</h1>
        </div>

        {/* Available Balance Card */}
        <div className="bg-blue-500 rounded-3xl p-6 mb-4 shadow-lg relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-200 text-sm mb-2">Available Balance</p>
              {showBalance ? (
                <h2 className="text-4xl font-bold text-white">{balance}</h2>
              ) : (
                <h2 className="text-4xl font-bold text-white tracking-wider">••••••</h2>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                aria-label="Toggle balance visibility"
              >
                {showBalance ? <EyeOff size={20} className="text-white" /> : <Eye size={20} className="text-white" />}
              </button>
              <button className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                <Wallet size={20} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-blue-200 text-xs mb-1">Wallet ID</p>
              <p className="text-white font-medium">{walletId}</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-blue-600 rounded-lg transition"
            >
              <Copy size={18} className="text-white" />
            </button>
          </div>
          {copied && (
            <div className="absolute top-6 right-6 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Copied!
            </div>
          )}
        </div>

        {/* Virtual Debit Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 mb-6 shadow-lg relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-purple-200 text-xs mb-1">QuickPay Virtual Card</p>
              <p className="text-white font-medium">Debit Card</p>
            </div>
            <CreditCard size={32} className="text-white opacity-80" />
          </div>

          <div className="mb-6">
            <p className="text-3xl font-semibold text-white tracking-wider flex items-center gap-2">
              {cardNumber}
              <button className="p-1">
                <Eye size={18} className="text-white opacity-70" />
              </button>
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-purple-200 text-xs mb-1">Card Holder</p>
              <p className="text-white font-medium">{cardHolder}</p>
            </div>
            <div className="text-right">
              <p className="text-purple-200 text-xs mb-1">Expires</p>
              <p className="text-white font-medium">{cardExpiry}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate("/user/add-funds")}
            className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowDownToLine size={24} className="text-green-600" />
            </div>
            <span className="text-gray-800 font-medium text-sm">Add Funds</span>
          </button>
          <button
            onClick={() => navigate("/user/send-money")}
            className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Send size={24} className="text-blue-600" />
            </div>
            <span className="text-gray-800 font-medium text-sm">Send</span>
          </button>
          <button
            onClick={() => navigate("/user/transactions")}
            className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <History size={24} className="text-purple-600" />
            </div>
            <span className="text-gray-800 font-medium text-sm">History</span>
          </button>
        </div>
      </div>

      {/* Scrollable Bottom Section */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-4 py-6 overflow-y-auto">
        {/* Transaction Summary */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-blue-500 rounded-2xl p-4">
            <p className="text-blue-100 text-sm mb-1">Total Sent</p>
            <p className="text-white font-bold text-2xl">{totalSent}</p>
          </div>
          <div className="flex-1 bg-blue-500 rounded-2xl p-4">
            <p className="text-blue-100 text-sm mb-1">Total Received</p>
            <p className="text-white font-bold text-2xl">{totalReceived}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "sent"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Sent
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "received"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Received
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3 pb-6">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition"
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
                <p className="text-sm text-gray-500">{transaction.date}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}