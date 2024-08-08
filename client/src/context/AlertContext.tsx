import { createContext, useEffect, useRef, useState } from "react";

interface AlertContext {
  type: "success" | "error";
  text: string;
}

interface AlertContextType {
  alert: AlertContext | undefined;
  setAlert: (alert: AlertContext | undefined) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: any }) => {
  const [alert, setAlert] = useState<AlertContext | undefined>(undefined);
  const timerRef = useRef();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setAlert(undefined);
    }, 5000);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
