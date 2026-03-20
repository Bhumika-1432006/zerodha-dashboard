import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      // UPDATED URL
      axios.get(`https://zerodha-pify.onrender.com/allHoldings/${userEmail}`)
        .then((res) => {
          setHoldings(Array.isArray(res.data) ? res.data : []);
        })
        .catch((err) => {
          console.error("Error fetching holdings:", err);
          setHoldings([]);
        });
    }
  }, [userEmail]);

  const totalInvestment = holdings.reduce((acc, stock) => acc + (Number(stock.avg || 0) * Number(stock.qty || 0)), 0);
  const currentValue = holdings.reduce((acc, stock) => acc + (Number(stock.price || 0) * Number(stock.qty || 0)), 0);
  const totalPnL = currentValue - totalInvestment;
  const isProfit = totalPnL >= 0;
  const pnlPercentage = totalInvestment !== 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : "0.00";

  const accountData = {
    labels: ["Equity", "Cash", "Debt"],
    datasets: [{
      data: [totalInvestment, 5000, 2000], 
      backgroundColor: ["#387ed1", "#ffab00", "#4caf50"],
      hoverOffset: 10, cutout: "75%",
    }],
  };

  const sectorData = {
    labels: ["Banking", "IT", "Energy", "Healthcare"],
    datasets: [{
      data: [30, 40, 20, 10],
      backgroundColor: ["#0052cc", "#00b8d9", "#36b37e", "#ff5630"],
      hoverOffset: 10, cutout: "75%",
    }],
  };

  const stockData = {
    labels: holdings.map(s => s.name),
    datasets: [{
      data: holdings.map(s => s.qty * s.price),
      backgroundColor: ["#6554c0", "#ff7452", "#2684ff", "#57d9a3", "#ffc400"],
      hoverOffset: 10, cutout: "75%",
    }],
  };

  const chartOptions = {
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    maintainAspectRatio: false, responsive: true,
  };

  return (
    <>
      <style>{`
        .summary-wrapper { padding: 20px 15px; font-family: "Inter", sans-serif; color: #424242; }
        .header-section { display: flex; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .header-section i { font-size: 1.2rem; margin-right: 12px; color: #9b9b9b; }
        .header-section h1 { font-size: 1.4rem; font-weight: 500; margin: 0; }
        .charts-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 20px; 
          border-bottom: 1px solid #eee; 
          padding-bottom: 30px; 
        }
        .chart-container { height: 220px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .chart-inner-label { position: absolute; font-size: 0.85rem; color: #9b9b9b; font-weight: 500; }
        .quick-stats { display: flex; flex-wrap: wrap; gap: 20px; padding: 30px 0; }
        .stat-item { flex: 1; min-width: 140px; }
        .stat-val { font-size: 1.3rem; font-weight: 500; margin-bottom: 4px; }
        .stat-label { font-size: 0.75rem; color: #9b9b9b; text-transform: uppercase; }
        .profit { color: #4caf50; }
        .loss { color: #df514c; }
        @media (max-width: 768px) {
          .summary-wrapper { padding: 10px; }
          .quick-stats { gap: 15px; }
          .stat-val { font-size: 1.1rem; }
        }
      `}</style>

      <div className="summary-wrapper">
        <div className="header-section">
          <i className="fa fa-briefcase"></i>
          <h1>Holdings ({holdings.length})</h1>
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <div style={{ height: '160px', width: '160px' }}><Doughnut data={accountData} options={chartOptions} /></div>
            <div className="chart-inner-label">Account</div>
          </div>
          <div className="chart-container">
            <div style={{ height: '160px', width: '160px' }}><Doughnut data={sectorData} options={chartOptions} /></div>
            <div className="chart-inner-label">Sectors</div>
          </div>
          <div className="chart-container">
            <div style={{ height: '160px', width: '160px' }}><Doughnut data={stockData} options={chartOptions} /></div>
            <div className="chart-inner-label">Stocks</div>
          </div>
        </div>
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-val">₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="stat-label">Total Investment</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">₹{currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="stat-label">Current Value</div>
          </div>
          <div className="stat-item">
            <div className={`stat-val ${isProfit ? "profit" : "loss"}`}>
              {isProfit ? "+" : ""}{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              <span style={{ fontSize: "0.8rem", marginLeft: "5px", fontWeight: "400" }}>({pnlPercentage}%)</span>
            </div>
            <div className="stat-label">Total P&L</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;