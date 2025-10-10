import React, { createContext, useContext, useState } from "react";

const ArgentContext = createContext();
const SetArgentContext = createContext();

export const ArgentProvider = ({ children }) => {
  const [argent, setArgent] = useState(100); // valeur initiale

  return (
    <ArgentContext.Provider value={argent}>
      <SetArgentContext.Provider value={setArgent}>
        {children}
      </SetArgentContext.Provider>
    </ArgentContext.Provider>
  );
};

export const useArgent = () => useContext(ArgentContext);
export const useSetArgent = () => useContext(SetArgentContext);