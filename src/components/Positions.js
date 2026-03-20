import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`https://zerodha-pify.onrender.com/allOrders/${userEmail}`)
        .then((res) => {
          setAllPositions(res.data);
        })
        .catch((err) => {
          console.error("Error fetching positions:", err);
        });
    }
  }, [userEmail]);

  // Calculation Logic
  const totalPnL = allPositions.reduce((acc, pos) => {
    const currentPrice = pos.price || 0;
    const avgPrice = pos.avg || pos.price || 0;
    const pnl = (currentPrice - avgPrice) * pos.qty;
    return acc + pnl;
  }, 0);

  const isPositive = totalPnL >= 0;

  return (
    <div className="positions-wrapper">
      <style>{`
        .positions-wrapper { padding: 20px; font-family: sans-serif; }
        .pnl-header { 
          background: #fcfcfc; 
          padding: 20px; 
          border-radius: 8px; 
          border: 1px solid #eee; 
          margin-bottom: 25px;
          display: inline-block;
          min-width: 200px;
        }
        .pnl-label { color: #888; font-size: 13px; margin-bottom: 5px; display: block; }
        .pnl-value { margin: 0; font-size: 26px; font-weight: 600; }
        .text-profit { color: #4caf50; }
        .text-loss { color: #df514c; }
        
        .pos-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .pos-table th { text-align: left; color: #9b9b9b; font-size: 13px; padding: 12px; border-bottom: 1px solid #eee; }
        .pos-table td { padding: 15px 12px; border-bottom: 1px solid #f9f9f9; font-size: 14px; }
        
        .badge { background: #eee; padding: 3px 7px; border-radius: 3px; font-size: 11px; color: #666; font-weight: bold; }
        .instrument { font-weight: 600; color: #444; }
        .empty-box { text-align: center; padding: 100px; color: #999; border: 1px dashed #ddd; border-radius: 8px; }
      `}</style>

      <div className="pnl-header">
        <span className="pnl-label">Total P&L</span>
        <h2 className={`pnl-value ${isPositive ? "text-profit" : "text-loss"}`}>
          {isPositive ? "+" : ""}{totalPnL.toFixed(2)}
        </h2>
      </div>

      <h3 style={{ color: "#444", marginBottom: "15px" }}>Positions ({allPositions.length})</h3>

      {allPositions.length > 0 ? (
        <table className="pos-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Price</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const pnl = (stock.price - (stock.avg || stock.price)) * stock.qty;
              return (
                <tr key={index}>
                  <td><span className="badge">{stock.product || "CNC"}</span></td>
                  <td className="instrument">{stock.name}</td>
                  <td style={{ color: stock.qty >= 0 ? "#4caf50" : "#df514c" }}>
                    {stock.qty}
                  </td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={pnl >= 0 ? "text-profit" : "text-loss"}>
                    {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}
                  </td>
                  <td className={pnl >= 0 ? "text-profit" : "text-loss"}>0.00%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty-box">
          <p>No active positions for <b>{userEmail}</b></p>
        </div>
      )}
    </div>
  );
};

export default Positions;