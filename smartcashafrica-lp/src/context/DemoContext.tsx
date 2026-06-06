import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DemoModal } from "@/components/ui/DemoModal";

interface DemoContextValue {
  openDemo: () => void;
  closeDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemo = useCallback(() => setIsOpen(true), []);
  const closeDemo = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openDemo, closeDemo }), [openDemo, closeDemo]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <DemoModal isOpen={isOpen} onClose={closeDemo} />
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return ctx;
}
