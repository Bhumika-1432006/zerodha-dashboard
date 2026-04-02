import React from "react";

const data = [
  { id: 1, name: "Universe", description: "The Zerodha technology ecosystem.", icon: "🌌", tag: "Ecosystem", link: "https://zerodha.com/universe" },
  { id: 2, name: "Sentinel", description: "Real-time price alerts for stocks.", icon: "🛡️", tag: "Utility", link: "https://sentinel.zerodha.com/" },
  { id: 3, name: "Smallcase", description: "Invest in managed baskets of stocks.", icon: "💼", tag: "Invest", link: "https://www.smallcase.com/" },
  { id: 4, name: "Streak", description: "Algo trading strategies without coding.", icon: "📈", tag: "Algo", link: "https://www.streak.tech/" },
  { id: 5, name: "Sensibull", description: "Options trading platform.", icon: "🎯", tag: "Options", link: "https://sensibull.com/" },
  { id: 6, name: "HelpGPT", description: "AI-powered market assistant.", icon: "💡", tag: "AI Support", link: "#" },
];

const Universe = () => {
  return (
    <div className="apps-view-container" style={{ padding: "20px" }}>
      <h2 style={{ fontWeight: "400", color: "#444" }}>Universe</h2>
      <div className="apps-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "25px",
        marginTop: "20px"
      }}>
        {data.map((app) => (
          <div key={app.id} className="app-card" style={{
            border: "1px solid #eee",
            padding: "25px",
            borderRadius: "4px",
            background: "#fff",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{app.icon}</div>
            <span style={{ fontSize: "0.7rem", background: "#eef2ff", padding: "4px 10px", borderRadius: "15px", color: "#4184f3" }}>
              {app.tag}
            </span>
            <h4 style={{ margin: "15px 0 5px 0" }}>{app.name}</h4>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>{app.description}</p>
            <button 
              style={{ marginTop: "15px", width: "100%", padding: "10px", backgroundColor: "#4184f3", color: "white", border: "none", cursor: "pointer" }}
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

export default Universe; // Exporting the component