"use client";

import { createContext, useContext, useState } from "react";

const BestTimeToBuyAndSellStockContext = createContext();

export const BestTimeToBuyAndSellStockProvider = ({ children }) => {
  const [method, setMethod] = useState("onepass");

  return (
    <BestTimeToBuyAndSellStockContext.Provider value={{ method, setMethod }}>
      {children}
    </BestTimeToBuyAndSellStockContext.Provider>
  );
};

export const useBestTimeToBuyAndSellStock = () => {
  const context = useContext(BestTimeToBuyAndSellStockContext);
  if (!context) {
    throw new Error("useBestTimeToBuyAndSellStock must be used within a BestTimeToBuyAndSellStockProvider");
  }
  return context;
};
