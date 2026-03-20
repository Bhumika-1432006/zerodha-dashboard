import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  
  // Get email from URL (if redirected from login) or localStorage
  const queryParams = new URLSearchParams(window.location.search);
  const emailFromUrl = queryParams.get("email");
  const emailFromStorage = localStorage.getItem("userEmail");
  const userEmail = emailFromUrl || emailFromStorage;

  useEffect(() => {
    if (userEmail) {
      // Save it locally for Port 3001 if we found it in the URL
      if (emailFromUrl) {
        localStorage.setItem("userEmail", emailFromUrl);
      }

      // Fetch the actual orders from your MongoDB via Render
      axios.get(`https://zerodha-pify.onrender.com/allOrders/${userEmail}`)
        .then((res) => {
          setAllOrders(res.data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [userEmail, emailFromUrl]);

  return (
    <div className="orders-container">
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td className={order.mode === "BUY" ? "profit" : "loss"}>{order.mode}</td>
                  <td>{order.type || "CNC"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  {userEmail ? "No orders found for this user." : "Please log in to see your orders."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;