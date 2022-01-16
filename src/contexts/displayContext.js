import { createContext, useState } from "react";

const DisplayContext = createContext();



export const DisplayProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState("light");
  
  const value = {
    currentMode, setCurrentMode,
    
  };

  return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>;
}

export default DisplayContext
