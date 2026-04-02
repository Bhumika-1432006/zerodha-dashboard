import React from "react";

// 1. The Data Array
const data = [
  {
    id: 1,
    name: "Universe",
    description: "Explore the ecosystem of apps integrated with your account.",
    icon: "🌌",
    tag: "Ecosystem",
    link: "https://zerodha.com/universe",
  },
  {
    id: 2,
    name: "Sentinel",
    description: "Create powerful real-time price alerts for stocks and options.",
    icon: "🛡️",
    tag: "Utility",
    link: "https://sentinel.zerodha.com/",
  },
  {
    id: 3,
    name: "Smallcase",
    description: "Invest in professionally managed baskets of stocks and ETFs.",
    icon: "💼",
    tag: "Invest",
    link: "https://www.smallcase.com/",
  },
  {
    id: 4,
    name: "Streak",
    description: "Create, backtest, and deploy trading strategies without coding.",
    icon: "📈",
    tag: "Algo",
    link: "https://www.streak.tech/",
  },
  {
    id: 5,
    name: "Sensibull",
    description: "India's biggest Options trading platform with expert strategies.",
    icon: "🎯",
    tag: "Options",
    link: "https://sensibull.com/",
  },
  {
    id: 6,
    name: "GoldenPi",
    description: "A marketplace for bonds and fixed-income investments.",
    icon: "🪙",
    tag: "Bonds",
    link: "https://goldenpi.com/",
  },
  {
    id: 7,
    name: "HelpGPT",
    description: "AI-powered assistant for instant support and market insights.",
    icon: "💡",
    tag: "AI Support",
    link: "#", 
  },
  {
    id: 8,
    name: "Ditto",
    description: "Get spam-free health and life insurance advice for your future.",
    icon: "☂️",
    tag: "Insurance",
    link: "https://joinditto.in/",
  }
];

// 2. The Component logic
const AppData = () => {
  return (
    <div className="apps-view-container" style={{ padding: "20px" }}>
      <h2 className="title" style={{ fontWeight: "400", color: "#444" }}>Universe</h2>
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
            <span style={{ 
              fontSize: "0.7rem", 
              background: "#eef2ff", 
              padding: "4px 10px", 
              borderRadius: "15px", 
              color: "#4184f3", 
              fontWeight: "600",
              textTransform: "uppercase"
            }}>
              {app.tag}
            </span>
            <h4 style={{ margin: "15px 0 8px 0", fontWeight: "500", color: "#333" }}>{app.name}</h4>
            <p style={{ fontSize: "0.85rem", color: "#888", minHeight: "45px", lineHeight: "1.4" }}>
                {app.description}
            </p>
            <button 
              className="btn-blue" 
              style={{ 
                marginTop: "15px", 
                width: "100%", 
                padding: "10px", 
                backgroundColor: "#4184f3", 
                color: "white", 
                border: "none", 
                borderRadius: "3px",
                cursor: "pointer" 
              }}
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