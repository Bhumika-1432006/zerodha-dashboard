import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  useEffect(() => {
    axios.get("https://zerodha-pify.onrender.com/allHoldings")
      .then((res) => {
        console.log("Data from DB:", res.data);
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Holdings fetch error:", err));
  }, []);

  return (
    <div className="holdings-container" style={{ padding: "15px" }}>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      
      <div className="order-table" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ minWidth: "700px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>Instrument</th>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>Qty.</th>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>Avg.</th>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>LTP</th>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>P&L</th>
              <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #eee", color: "#9b9b9b", fontSize: "13px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const displayName = stock.name || stock.instrument || "Unknown";
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const totalCost = (stock.avg || 0) * (stock.qty || 0);
              const stockPnL = curValue - totalCost;

              return (
                <tr key={index} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  <td style={{ padding: "15px 12px", fontWeight: "600", color: "#444" }}>{displayName}</td>
                  <td style={{ padding: "15px 12px" }}>{stock.qty || 0}</td>
                  <td style={{ padding: "15px 12px" }}>{(stock.avg || 0).toFixed(2)}</td>
                  <td style={{ padding: "15px 12px" }}>{(stock.price || 0).toFixed(2)}</td>
                  <td 
                    className={stockPnL >= 0 ? "profit" : "loss"} 
                    style={{ padding: "15px 12px", color: stockPnL >= 0 ? "#4caf50" : "#df514c" }}
                  >
                    {stockPnL.toFixed(2)}
                  </td>
                  <td className="action-btns" style={{ padding: "15px 12px" }}>
                    <button 
                      className="btn-add" 
                      onClick={() => openBuyWindow(displayName)}
                      style={{ 
                        backgroundColor: "#4caf50", 
                        color: "white", 
                        border: "none", 
                        padding: "5px 10px", 
                        borderRadius: "4px", 
                        marginRight: "8px",
                        cursor: "pointer" 
                      }}
                    >
                      Add
                    </button>
                    <button 
                      className="btn-exit" 
                      onClick={() => openSellWindow(displayName)}
                      style={{ 
                        backgroundColor: "#df514c", 
                        color: "white", 
                        border: "none", 
                        padding: "5px 10px", 
                        borderRadius: "4px",
                        cursor: "pointer" 
                      }}
                    >
                      Exit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;