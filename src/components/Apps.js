import React from "react";
import { Routes, Route } from "react-router-dom";

import WatchList from "./WatchList"; 
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import AppData from "./appdata";

const Apps = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      {/* The sidebar stays constant */}
      <WatchList />

      {/* The right side changes based on the URL path */}
      <div className="content" style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<AppData />} />
        </Routes>
      </div>
    </div>
  );
};

export default Apps;