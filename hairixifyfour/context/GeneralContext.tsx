"use client";

import { clearCredentials, GetAuthUser, isLoggedIn } from "@/utils/user";
import {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useState,
  Dispatch,
  useContext,
  useEffect, // ← was missing from your version
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeneralProps {
  providers: Provider[];
  setProviders: Dispatch<SetStateAction<Provider[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;

  authUser: AuthUser | null;
  authProvider: AuthProvider | null;
  setAuthProvider: Dispatch<SetStateAction<AuthProvider | null>>;
  isAuthenticated: boolean;
  authLoading: boolean;

  refreshAuth: () => Promise<void>;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const GeneralContext = createContext<GeneralProps | undefined>(undefined);

export function GeneralProvider({ children }: PropsWithChildren) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authProvider, setAuthProvider] = useState<AuthProvider | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function refreshAuth() {
    if (!isLoggedIn()) {
      setAuthUser(null);
      setAuthLoading(false);
      return;
    }

    setAuthLoading(true);
    const result = await GetAuthUser();

    if (result.success) {
      setAuthUser(result.user ?? null);
    } else {
      setAuthUser(null);
    }
    setAuthLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshAuth();
  }, []);

  function logout() {
    clearCredentials();
    setAuthUser(null);
    setAuthProvider(null);
  }

  return (
    <GeneralContext.Provider
      value={{
        providers,
        setProviders,
        categories,
        setCategories,
        authUser,
        authProvider,
        setAuthProvider,
        isAuthenticated: !!authUser,
        authLoading,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function UseGen(): GeneralProps {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("UseGen must be used within GeneralProvider");
  }
  return context;
}
