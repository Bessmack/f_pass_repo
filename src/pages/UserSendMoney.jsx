import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane, FaTimes, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [hoveredPreset, setHoveredPreset] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const presetAmounts = [10, 25, 50, 100, 250, 500];
  const transactionChargeRate = 0.015; // 1.5%
  const walletBalance = 1200; // Example wallet balance

  const beneficiaries = [
    { id: 1, name: "Jane Smith", tag: "@janesmith" },
    { id: 2, name: "John Doe", tag: "@johndoe" },
    { id: 3, name: "Emily Carter", tag: "@emilyc" },
    { id: 4, name: "Michael Brown", tag: "@mikebrown" },
  ];

  const filtered = beneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const totalCharge = amount ? Math.round(amount * transactionChargeRate * 100) / 100 : 0;
  const totalPayable = amount ? parseFloat(amount) + totalCharge : 0;

  const confirmSend = () => setConfirming(true);

  const finalizeSend = () => {
  if (!amount) return;
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setConfirming(false);
    setShowModal(false);
    setToast({
      type: "success",
      message: (
        <>
          <FaCheckCircle size={20} color="white" style={{ marginRight: "8px" }} />
          Sent ${amount} to {selectedUser?.name}
          {note && ` (${note})`}
        </>
      ),
    });
    setAmount("");
    setNote("");
    setSelectedUser(null);
  }, 1200);
};

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e2e8f0 0%, #f8fafc 40%, #dbeafe 100%)",
      fontFamily: "Inter, sans-serif",
      paddingBottom: "40px",
      gap: "25px",
    },
    header: {
      width: "100%",
      background: "#2563eb",
      color: "#fff",
      padding: "30px 0 20px 0",
      textAlign: "left",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      zIndex: 10,
    },
    headerContent: {
      width: "90%",
      maxWidth: "900px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    headerTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    },
    searchBarBelow: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginTop: "12px",
    width: "100%",
    maxWidth: "400px",
  },
  searchIconBelow: {
    position: "absolute",
    left: "12px",
    color: "#1e40af",
  },
  searchInputBelow: {
    padding: "10px 12px 10px 36px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    background: "white",
    color: "#1e293b",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
    headerTitle: { fontSize: "1.8rem", fontWeight: 700 },
    searchBar: { position: "relative", display: "flex", alignItems: "center" },
    searchIcon: { position: "absolute", left: "12px", color: "#1e40af" },
    searchInput: {
      padding: "10px 12px 10px 36px",
      borderRadius: "12px",
      border: "none",
      fontSize: "1rem",
      outline: "none",
      width: "220px",
      background: "white",
      color: "#1e293b",
    },
    walletBalance: {
      fontSize: "1rem",
      opacity: 0.9,
      marginTop: "5px",
      fontWeight: 500,
    },
    headerSubtext: { fontSize: "1rem", opacity: 0.9 },
    listContainer: {
      width: "90%",
      maxWidth: "700px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginTop: "20px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "16px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      padding: "18px 22px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
    },
    userInfo: { display: "flex", flexDirection: "column", color: "#1e293b" },
    sendBtn: {
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "10px 14px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: 500,
    },
    sendBtnHover: {
      background: "#1d4ed8",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(5px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    modal: {
      background: "white",
      borderRadius: "18px",
      padding: "28px",
      width: "90%",
      maxWidth: "380px",
      textAlign: "center",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
    modalTitle: {
      color: "#1e3a8a",
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "15px",
    },
    presets: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "18px",
    },
    presetBtn: (active, hovered) => ({
      padding: "10px 18px",
      borderRadius: "10px",
      border: "1px solid #cbd5e0",
      background: active
        ? "#2563eb"
        : hovered
        ? "#3b82f6"
        : "#f1f5f9",
      color: active || hovered ? "#fff" : "#1e293b",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: active
        ? "0 4px 12px rgba(37,99,235,0.4)"
        : hovered
        ? "0 4px 10px rgba(59,130,246,0.25)"
        : "none",
      transform: hovered ? "translateY(-3px)" : "translateY(0)",
    }),
    inputWrapper: { position: "relative", width: "100%", marginBottom: "12px" },
    currencySymbol: {
      position: "absolute",
      top: "50%",
      left: "12px",
      transform: "translateY(-50%)",
      color: "#475569",
      fontWeight: 600,
    },
    input: {
      width: "100%",
      padding: "12px 12px 12px 30px",
      borderRadius: "10px",
      border: "1px solid #cbd5e0",
      outline: "none",
      textAlign: "center",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #cbd5e0",
      outline: "none",
      minHeight: "70px",
      resize: "none",
    },
    infoBox: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "10px",
      fontSize: "0.9rem",
      color: "#1e293b",
      textAlign: "left",
      marginBottom: "12px",
    },
    summaryCard: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "12px",
      marginTop: "15px",
      fontSize: "0.95rem",
      textAlign: "left",
      color: "#1e293b",
    },
    modalBtns: {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      marginTop: "20px",
    },
    confirmBtn: {
      flex: 1,
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 0",
      borderRadius: "10px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    cancelBtn: {
      flex: 1,
      background: "#e2e8f0",
      color: "#1e293b",
      border: "none",
      padding: "12px 0",
      borderRadius: "10px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    toast: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "#2563eb",
    color: "white",
    padding: "14px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    animation: "slideInRight 0.4s ease, fadeOut 0.5s ease 3s forwards",
    zIndex: 200,
    fontWeight: 500,
    },
    headerTitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    },

    backBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "20px",
    padding: "10px 10px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    },
    backBtnHover: {
    background: "rgba(255,255,255,0.25)",
    transform: "translateX(-2px)",
    },
  };

  const styleSheet = document.styleSheets[0];
if (styleSheet) {
  const slideIn = `
    @keyframes slideInRight {
      0% { transform: translateX(100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
  `;
  const fadeOut = `
    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; transform: translateY(20px); }
    }
  `;
  if (![...styleSheet.cssRules].some(r => r.name === "slideInRight")) {
    styleSheet.insertRule(slideIn, styleSheet.cssRules.length);
    styleSheet.insertRule(fadeOut, styleSheet.cssRules.length);
  }
}

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <div style={styles.headerTitleWrapper}>
              <button
                style={styles.backBtn}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.backBtnHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.backBtn)}
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={16} color="white" />
              </button>
              <h2 style={styles.headerTitle}>Send Money</h2>
            </div>

            <div style={styles.searchBarBelow}>
              <FaSearch style={styles.searchIconBelow} />
              <input
                style={styles.searchInputBelow}
                type="text"
                placeholder="Search beneficiary..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <p style={styles.walletBalance}>Wallet Balance: ${walletBalance.toLocaleString()} available</p>
          <p style={styles.headerSubtext}>
            Choose a beneficiary and send them money instantly.
          </p>
        </div>
      </div>

      <div style={styles.listContainer}>
        {filtered.map((user) => (
          <div
            key={user.id}
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { transform: "", boxShadow: styles.card.boxShadow })
            }
          >
            <div style={styles.userInfo}>
              <strong>{user.name}</strong>
              <span style={{ color: "#475569", fontSize: "0.9rem" }}>{user.tag}</span>
            </div>
            <button
              style={styles.sendBtn}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.sendBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.sendBtn)}
              onClick={() => handleSendClick(user)}
            >
              <FaPaperPlane /> Send
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Send to {selectedUser?.name}</h3>

            {!confirming ? (
              <>
                <div style={styles.infoBox}>
                  <p><strong>Wallet Balance:</strong> ${walletBalance.toLocaleString()}</p>
                  <p><strong>Transaction Fee:</strong> {transactionChargeRate * 100}% (${totalCharge.toLocaleString()})</p>
                </div>

                <div style={styles.presets}>
                  {presetAmounts.map((val, i) => (
                    <button
                      key={val}
                      onMouseEnter={() => setHoveredPreset(i)}
                      onMouseLeave={() => setHoveredPreset(null)}
                      onClick={() => setAmount(val.toString())}
                      style={styles.presetBtn(parseFloat(amount) === val, hoveredPreset === i)}
                    >
                      ${val.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div style={styles.inputWrapper}>
                  <span style={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <textarea
                  placeholder="Add an optional note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={styles.textarea}
                />

                <div style={styles.modalBtns}>
                  <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button style={styles.confirmBtn} onClick={confirmSend} disabled={!amount}>
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 style={{ marginBottom: "12px", color: "#1e3a8a" }}>Transaction Summary</h4>
                <div style={styles.summaryCard}>
                  <p><strong>Recipient:</strong> {selectedUser?.name}</p>
                  <p><strong>Amount:</strong> ${parseFloat(amount).toLocaleString()}</p>
                  <p><strong>Charge (1.5%):</strong> ${totalCharge.toLocaleString()}</p>
                  <p><strong>Total Payable:</strong> ${totalPayable.toLocaleString()}</p>
                  <p><strong>Wallet Remaining:</strong> ${(walletBalance - totalPayable).toLocaleString()}</p>
                  {note && <p><strong>Note:</strong> {note}</p>}
                </div>

                <div style={styles.modalBtns}>
                  <button style={styles.cancelBtn} onClick={() => setConfirming(false)}>
                    Back
                  </button>
                  <button style={styles.confirmBtn} onClick={finalizeSend} disabled={loading}>
                    {loading ? "Sending..." : "Confirm & Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default SendMoney;
