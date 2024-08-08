import { createContext, useState } from "react";

interface ModalContext {
  open: boolean;
  type: "add" | "info" | "edit" | "delete";
  title: string;
  children?: any;
  content?: string;
  submitAction?: any;
}

interface ModalContextType {
  modal: ModalContext | undefined;
  setModal: (value: ModalContext | undefined) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: any }) => {
  const [modal, setModal] = useState<ModalContext | undefined>(undefined);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
