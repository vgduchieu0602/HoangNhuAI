"use client";

import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext();

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const SidebarContextProvider = ({ children }) => {
  const [expand, setExpand] = useState(false);

  const value = {
    expand,
    setExpand,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
