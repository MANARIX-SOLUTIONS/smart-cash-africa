import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  AddTransactionSheet,
  type TransactionType,
} from "@/components/ui/TransactionSheet";

interface AddTransactionContextValue {
  open: boolean;
  openAddTransaction: (type?: TransactionType) => void;
  closeAddTransaction: () => void;
}

const AddTransactionContext = createContext<AddTransactionContextValue | null>(
  null,
);

export function AddTransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [initialType, setInitialType] = useState<TransactionType>("expense");

  const openAddTransaction = useCallback(
    (type: TransactionType = "expense") => {
      setInitialType(type);
      setOpen(true);
    },
    [],
  );

  const closeAddTransaction = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openAddTransaction, closeAddTransaction }),
    [open, openAddTransaction, closeAddTransaction],
  );

  return (
    <AddTransactionContext.Provider value={value}>
      {children}
      <AddTransactionSheet
        open={open}
        initialType={initialType}
        onClose={closeAddTransaction}
      />
    </AddTransactionContext.Provider>
  );
}

export function useAddTransaction() {
  const ctx = useContext(AddTransactionContext);
  if (!ctx) {
    throw new Error(
      "useAddTransaction must be used within AddTransactionProvider",
    );
  }
  return ctx;
}
