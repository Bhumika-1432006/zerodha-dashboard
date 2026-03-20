import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalCtx = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleSellClick = () => {
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",
    }).then(() => {
      generalCtx.closeSellWindow();
    }).catch((err) => console.log(err));
  };

  const handleCancelClick = () => {
    generalCtx.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="header" style={{ backgroundColor: "#df514c" }}>
        <h3>Sell {uid}</h3>
        <div className="market-options">
          <label><input type="radio" name="market" defaultChecked /> BSE</label>
          <label><input type="radio" name="market" /> NSE</label>
        </div>
      </div>

      <div className="tab">
        <button type="button" style={{ color: "#df514c" }}>Regular</button>
        <button type="button">AMO</button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin available ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>Sell</button>
          <button className="btn btn-grey" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;