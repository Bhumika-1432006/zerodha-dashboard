// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Fixed: Removed the extra "/components/" since these are in the SAME folder
// import WatchList from "./WatchList"; 
// import Summary from "./Summary";
// import Orders from "./Orders";
// import Holdings from "./Holdings";
// import Positions from "./Positions";
// import Funds from "./Funds";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container" style={{ display: "flex" }}>
//       <WatchList />
//       <div className="content" style={{ flex: 1, padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Summary />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="holdings" element={<Holdings />} />
//           <Route path="positions" element={<Positions />} />
//           <Route path="funds" element={<Funds />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;