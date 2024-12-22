import { createContext, useContext, useState, ReactNode } from "react";

interface DialogContextType {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function DialogProvider({ children }: Props) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ open, onOpen, onClose }}>
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
