import { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }: { children: any }) => {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
