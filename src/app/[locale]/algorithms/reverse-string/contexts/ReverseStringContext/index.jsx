"use client";

import { createContext, useContext, useState } from "react";

const ReverseStringContext = createContext();

export const ReverseStringProvider = ({ children }) => {
  const [method, setMethod] = useState("twopointers");

  return (
    <ReverseStringContext.Provider value={{ method, setMethod }}>
      {children}
    </ReverseStringContext.Provider>
  );
};

export const useReverseString = () => {
  const context = useContext(ReverseStringContext);
  if (!context) {
    throw new Error("useReverseString must be used within a ReverseStringProvider");
  }
  return context;
};
