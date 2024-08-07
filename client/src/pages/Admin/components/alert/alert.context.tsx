import { createContext, useEffect, useRef, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }: { children: any }) => {
  const [alert, setAlert] = useState(null);
  const timerRef = useRef();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, [alert]);

  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
