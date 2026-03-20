import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const generalCtx = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = () => {
    // Get the email from localStorage to identify the user in the backend
    const userEmail = localStorage.getItem("userEmail");

    axios
      .post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
        email: userEmail, // Passing email for the funds logic
      })
      .then(() => {
        // Ensure this matches the function name in your GeneralContext.js
        generalCtx.closeBuyWindow(); 
        window.location.reload(); // Refresh to update Holdings and Funds
      })
      .catch((err) => {
        console.error("Order Error:", err);
        alert("Order failed. Make sure your Backend is running and you are logged in!");
      });
  };

  const handleCancelClick = () => {
    generalCtx.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">
      <div className="header">
        <h3>Buy {uid}</h3>
        <div className="market-options">
          <label><input type="radio" name="market" defaultChecked /> BSE</label>
          <label><input type="radio" name="market" /> NSE</label>
        </div>
      </div>

      <div className="tab">
        <button type="button" className="active">Regular</button>
        <button type="button">AMO</button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>Buy</button>
          <button className="btn btn-grey" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;