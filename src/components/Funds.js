import React, { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const [balance, setBalance] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  // UI State for the modern pop-up
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "ADD" or "WITHDRAW"
  const [amountInput, setAmountInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // New states for Toast Notification
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (userEmail) {
      axios.get(`https://zerodha-pify.onrender.com/getBalance/${userEmail}`)
        .then((res) => setBalance(res.data.balance))
        .catch(err => console.log("Balance fetch error"));
    }
  }, [userEmail]);

  const handleConfirmAction = async () => {
    const amount = amountInput;
    const password = passwordInput;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!password) {
      alert("Password is required for verification");
      return;
    }

    try {
      const endpoint = modalType === "ADD" ? "/addFunds" : "/withdrawFunds";
      
      if (modalType === "WITHDRAW" && Number(amount) > balance) {
        alert("Insufficient funds for this withdrawal.");
        return;
      }

      const res = await axios.post(`https://zerodha-pify.onrender.com${endpoint}`, {
        email: userEmail,
        password: password,
        amount: amount
      });

      // --- Success Logic: Replaces browser alert ---
      setToastMsg(modalType === "ADD" ? `₹${amount} Added Successfully!` : `₹${amount} Withdrawn Successfully!`);
      setShowToast(true);
      
      setBalance(res.data.newBalance);
      closeModal();

      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);

    } catch (err) {
      alert(err.response?.data?.message || `Error processing transaction`);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAmountInput("");
    setPasswordInput("");
  };

  return (
    <div className="funds-container">
      <style>{`
        .funds-container { padding: 25px; font-family: "Inter", sans-serif; color: #444; }
        .top-bar { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
        .top-bar p { color: #888; margin: 0; font-size: 14px; }
        .btn { padding: 10px 22px; border-radius: 3px; border: none; font-weight: 500; cursor: pointer; font-size: 14px; margin-left: 10px; transition: background 0.2s; }
        .btn-green { background-color: #4caf50; color: white; }
        .btn-blue { background-color: #387ed1; color: white; }
        .btn:hover { opacity: 0.9; }
        .row { display: flex; gap: 40px; }
        .col { flex: 1; }
        .equity-title { font-size: 18px; margin-bottom: 20px; font-weight: 500; }
        .data-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #f9f9f9; }
        .data-label { color: #888; font-size: 14px; }
        .data-value { font-weight: 600; color: #444; }
        .colored { color: #387ed1; font-size: 28px; margin-bottom: 10px; }
        .commodity-box { background: #fbfbfb; border: 1px dashed #ccc; padding: 40px; text-align: center; border-radius: 4px; }
        
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.2s; }
        .modal-content { background: white; padding: 30px; border-radius: 8px; width: 360px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .modal-content h3 { margin-top: 0; font-size: 20px; margin-bottom: 15px; color: #333; }
        .modal-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-size: 15px; outline-color: #387ed1; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
        .btn-cancel { background: #f5f5f5; color: #666; border: 1px solid #ddd; }

        /* Toast Styles */
        .order-success-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          color: white;
          padding: 12px 22px;
          border-radius: 4px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          z-index: 3000; 
          min-width: 320px;
          animation: slideInRight 0.3s ease-out;
        }
        .buy-bg { background-color: #4caf50; }
        .sell-bg { background-color: #df5148; }
        .toast-content { display: flex; align-items: center; gap: 12px; }
        .icon-check {
          background: rgba(255, 255, 255, 0.2);
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .toast-progress {
          position: absolute; bottom: 0; left: 0; height: 3px;
          background: rgba(255, 255, 255, 0.4); width: 100%;
          animation: shrinkProgress 3s linear forwards;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes shrinkProgress { from { width: 100%; } to { width: 0%; } }

        @media (max-width: 768px) {
          .row { flex-direction: column; gap: 20px; }
          .modal-content { width: 90%; }
          .top-bar { flex-direction: column; align-items: flex-start; gap: 15px; }
          .top-bar div { width: 100%; display: flex; gap: 10px; }
          .btn { margin-left: 0; flex: 1; text-align: center; }
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className={`order-success-toast ${modalType === "ADD" ? "buy-bg" : "sell-bg"}`}>
          <div className="toast-content">
            <span className="icon-check">✓</span>
            <p>{toastMsg}</p>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalType === "ADD" ? "Add Funds" : "Withdraw Funds"}</h3>
            <p style={{fontSize: '13px', color: '#666', marginBottom: '15px'}}>
               {modalType === "WITHDRAW" 
                 ? `Available for withdrawal: ₹${balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}` 
                 : "Instant fund addition via secured gateway"}
            </p>
            
            <input 
              type="number" 
              className="modal-input" 
              placeholder="Amount in Rupees (₹)" 
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              autoFocus
            />
            
            <input 
              type="password" 
              className="modal-input" 
              placeholder="Enter Password to Verify" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={closeModal}>Cancel</button>
              <button 
                className={`btn ${modalType === "ADD" ? "btn-green" : "btn-blue"}`} 
                onClick={handleConfirmAction}
              >
                {modalType === "ADD" ? "Add" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="top-bar">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <div>
          <button className="btn btn-green" onClick={() => openModal("ADD")}>Add funds</button>
          <button className="btn btn-blue" onClick={() => openModal("WITHDRAW")}>Withdraw</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h3 className="equity-title">Equity</h3>
          <div className="table">
            <div className="data-row" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              <p className="data-label">Available margin</p>
              <p className="data-value colored">₹{balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
            </div>
            <div className="data-row">
              <p className="data-label">Used margin</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Available cash</p>
              <p className="data-value">₹{balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '15px 0'}} />
            <div className="data-row">
              <p className="data-label">Opening Balance</p>
              <p className="data-value">10,000.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity-box">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue">Open Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;