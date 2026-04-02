import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  const filteredWatchlist = watchlist.filter((stock) =>
    (stock.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- CHART LOGIC ---
  const labels = filteredWatchlist.map((stock) => stock.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`watchlist-container ${isMobileVisible ? "mobile-show" : "mobile-hide"}`}>
      
      {/* Toggle Arrow for Mobile */}
      <div className="mobile-toggle" onClick={() => setIsMobileVisible(!isMobileVisible)}>
        {isMobileVisible ? <KeyboardArrowUp /> : <BarChartOutlined />}
        <span>{isMobileVisible ? " Close Watchlist" : " View Watchlist"}</span>
      </div>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search"
        />
        <span className="counts"> {filteredWatchlist.length} / {watchlist.length}</span>
      </div>

      {/* The list wrapper */}
      <div className="list-content">
        <ul className="list">
          {filteredWatchlist.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))}
        </ul>
        {/* FIXED: Passing 'chartData' instead of 'data' */}
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => generalContext.openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => generalContext.openSellWindow(uid)}>
            Sell
          </button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchList;