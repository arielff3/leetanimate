"use client";

import { createContext, useContext, useState } from "react";

const ValidPalindromeContext = createContext();

export const ValidPalindromeProvider = ({ children }) => {
  const [method, setMethod] = useState("twopointers");

  return (
    <ValidPalindromeContext.Provider value={{ method, setMethod }}>
      {children}
    </ValidPalindromeContext.Provider>
  );
};

export const useValidPalindrome = () => {
  const context = useContext(ValidPalindromeContext);
  if (!context) {
    throw new Error("useValidPalindrome must be used within a ValidPalindromeProvider");
  }
  return context;
};
