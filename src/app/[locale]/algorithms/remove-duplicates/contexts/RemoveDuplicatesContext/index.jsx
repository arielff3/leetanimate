"use client";

import { createContext, useContext, useState } from "react";

const RemoveDuplicatesContext = createContext();

export const RemoveDuplicatesProvider = ({ children }) => {
  return (
    <RemoveDuplicatesContext.Provider value={{}}>
      {children}
    </RemoveDuplicatesContext.Provider>
  );
};

export const useRemoveDuplicates = () => {
  const context = useContext(RemoveDuplicatesContext);
  if (!context) {
    throw new Error("useRemoveDuplicates must be used within a RemoveDuplicatesProvider");
  }
  return context;
}; 