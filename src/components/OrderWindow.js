import React, { useState } from "react";
import axios from "axios";
import "./OrderWindow.css";

const OrderWindow = ({ mode, stockUID, closeWindow }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [showToast, setShowToast] = useState(false);

  // Try getting from storage
  const userEmail = localStorage.getItem("userEmail");
  const safeStockUID = stockUID || "";

  const handleExecuteOrder = async () => {
    if (!userEmail) {
      alert("Error: userEmail not found in LocalStorage. Please Login again.");
      return;
    }

    try {
      await axios.post("https://zerodha-pify.onrender.com/newOrder", {
        name: safeStockUID,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: mode, 
        email: userEmail, 
      });

      // Trigger the custom toast notification
      setShowToast(true);

      // Delay reload so the user can see the success message
      setTimeout(() => {
        setShowToast(false);
        closeWindow();
        window.location.reload(); 
      }, 2500); 

    } catch (err) {
      console.error("Order failed:", err);
      alert("Execution failed. Check your internet connection.");
    }
  };

  return (
    <>
      {/* Toast Notification: Shows up before the page reloads */}
      {showToast && (
        <div className={`order-success-toast ${mode === "SELL" ? "sell-bg" : "buy-bg"}`}>
          <div className="toast-content">
            <span className="icon-check">✓</span>
            <p>
              Order Placed: <b>{mode}</b> {stockQuantity} shares of <b>{safeStockUID}</b>
            </p>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      {/* Main Order Window Overlay */}
      <div className="order-window-overlay" onClick={closeWindow}>
        <div className="order-window-container" onClick={(e) => e.stopPropagation()}>
          <div className="order-header">
            <h4 className={mode === "BUY" ? "buy-title" : "sell-title"}>
              {mode} {safeStockUID}
            </h4>
          </div>
          
          <div className="order-inputs">
            <div className="input-group">
              <label>Qty</label>
              <input 
                type="number" 
                value={stockQuantity} 
                onChange={(e) => setStockQuantity(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Price</label>
              <input 
                type="number" 
                step="0.05" 
                value={stockPrice} 
                onChange={(e) => setStockPrice(e.target.value)} 
              />
            </div>
          </div>

          <div className="order-footer">
            <div className="order-actions">
              <button 
                className={mode === "BUY" ? "btn-buy" : "btn-sell"} 
                onClick={handleExecuteOrder}
                disabled={showToast} // Prevents double-clicking while toast is showing
              >
                {showToast ? "Processing..." : mode}
              </button>
              <button className="btn-cancel" onClick={closeWindow}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderWindow;