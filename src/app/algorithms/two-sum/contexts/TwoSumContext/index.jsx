"use client";

import { createContext, useContext, useState } from "react";

const TwoSumContext = createContext();

export function TwoSumProvider({ children }) {
  const [method, setMethod] = useState("hashmap");

  return (
    <TwoSumContext.Provider value={{ method, setMethod }}>
      {children}
    </TwoSumContext.Provider>
  );
}

export function useTwoSum() {
  const context = useContext(TwoSumContext);
  if (!context) {
    throw new Error("useTwoSum must be used within a TwoSumProvider");
  }
  return context;
} 