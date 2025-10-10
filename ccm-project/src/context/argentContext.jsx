import React, { createContext, useContext, useState } from "react";

const ArgentContext = createContext(null);

export const ArgentProvider = ({ children, initial = 100 }) => {
  const [argent, setArgent] = useState(initial);
  return (
    <ArgentContext.Provider value={{ argent, setArgent }}>
      {children}
    </ArgentContext.Provider>
  );
};

export const useArgent = () => {
  const ctx = useContext(ArgentContext);
  if (!ctx) throw new Error("useArgent must be used within ArgentProvider");
  return ctx.argent;
};

export const useSetArgent = () => {
  const ctx = useContext(ArgentContext);
  if (!ctx) throw new Error("useSetArgent must be used within ArgentProvider");
  return ctx.setArgent;
};
