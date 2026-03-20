import React, { useState } from "react";
import OrderWindow from "./OrderWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    // Safety: Ensure uid is a string to prevent .includes() or .toLowerCase() errors
    setSelectedStockUID(uid || ""); 
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    // Safety: Ensure uid is a string
    setSelectedStockUID(uid || "");
  };

  const handleCloseWindow = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeWindow: handleCloseWindow,
      }}
    >
      {props.children}
      {/* Passing a guaranteed string to the OrderWindow */}
      {isBuyWindowOpen && (
        <OrderWindow mode="BUY" stockUID={selectedStockUID || ""} closeWindow={handleCloseWindow} />
      )}
      {isSellWindowOpen && (
        <OrderWindow mode="SELL" stockUID={selectedStockUID || ""} closeWindow={handleCloseWindow} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;