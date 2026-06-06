import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isOnboarded: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  demoLogin: () => void;
  updateUser: (fields: Partial<Pick<User, "name" | "email">>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "smartcash-user";
const ONBOARDED_KEY = "smartcash-onboarded";

const DEMO_USER: User = {
  id: "demo-1",
  name: "Manar Diop",
  email: "manar@email.com",
};

function loadUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(loadUser());
    setIsOnboarded(localStorage.getItem(ONBOARDED_KEY) === "true");
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((next: User | null) => {
    setUser(next);
    if (next) {
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  const login = useCallback(
    async (email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 800));
      persistUser({
        id: crypto.randomUUID(),
        name: email.split("@")[0] ?? "User",
        email,
      });
    },
    [persistUser],
  );

  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 800));
      persistUser({
        id: crypto.randomUUID(),
        name,
        email,
      });
    },
    [persistUser],
  );

  const demoLogin = useCallback(() => {
    persistUser(DEMO_USER);
    setIsOnboarded(true);
    localStorage.setItem(ONBOARDED_KEY, "true");
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
    setIsOnboarded(false);
    localStorage.removeItem(ONBOARDED_KEY);
  }, [persistUser]);

  const completeOnboarding = useCallback(() => {
    setIsOnboarded(true);
    localStorage.setItem(ONBOARDED_KEY, "true");
  }, []);

  const updateUser = useCallback(
    (fields: Partial<Pick<User, "name" | "email">>) => {
      if (!user) return;
      persistUser({ ...user, ...fields });
    },
    [user, persistUser],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isOnboarded,
        isLoading,
        login,
        signup,
        logout,
        completeOnboarding,
        demoLogin,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
