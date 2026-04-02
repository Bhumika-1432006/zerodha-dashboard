import React from "react";

const data = [
  { id: 1, name: "Universe", description: "The Zerodha technology ecosystem.", icon: "🌌", tag: "Ecosystem", link: "https://zerodha.com/universe" },
  { id: 2, name: "Sentinel", description: "Real-time price alerts for stocks.", icon: "🛡️", tag: "Utility", link: "https://sentinel.zerodha.com/" },
  { id: 3, name: "Smallcase", description: "Invest in managed baskets of stocks.", icon: "💼", tag: "Invest", link: "https://www.smallcase.com/" },
  { id: 4, name: "Streak", description: "Algo trading strategies without coding.", icon: "📈", tag: "Algo", link: "https://www.streak.tech/" },
  { id: 5, name: "Sensibull", description: "Options trading platform.", icon: "🎯", tag: "Options", link: "https://sensibull.com/" },
  { id: 6, name: "HelpGPT", description: "AI-powered market assistant.", icon: "💡", tag: "AI Support", link: "#" },
  { id: 7, name: "GoldenPi", description: "Bonds and fixed-income investments.", icon: "🪙", tag: "Bonds", link: "https://goldenpi.com/" },
  { id: 8, name: "Ditto", description: "Insurance advice for your future.", icon: "☂️", tag: "Insurance", link: "https://joinditto.in/" }
];

const AppData = () => {
  return (
    <div className="apps-view-container" style={{ padding: "20px" }}>
      <h2 style={{ fontWeight: "400", color: "#444", marginBottom: "5px" }}>Universe</h2>
      <p style={{ color: "#9b9b9b", fontSize: "0.9rem", marginBottom: "30px" }}>
        The Zerodha technology ecosystem
      </p>

      <div className="apps-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "25px"
      }}>
        {data.map((app) => (
          <div key={app.id} className="app-card" style={{
            border: "1px solid #eee",
            padding: "30px 20px",
            borderRadius: "4px",
            background: "#fff",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.03)"
          }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "10px" }}>{app.icon}</div>
            <span style={{ fontSize: "0.7rem", background: "#eef2ff", padding: "4px 10px", borderRadius: "15px", color: "#4184f3", fontWeight: "600" }}>
              {app.tag}
            </span>
            <h4 style={{ margin: "15px 0 8px 0", fontWeight: "500" }}>{app.name}</h4>
            <p style={{ fontSize: "0.85rem", color: "#888", minHeight: "45px" }}>{app.description}</p>
            <button 
              style={{ marginTop: "15px", width: "100%", padding: "10px", backgroundColor: "#4184f3", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
              onClick={() => window.open(app.link, "_blank")}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppData;