"use client";

import {
  clearCredentials,
  GetAuthProvider,
  isLoggedIn,
} from "@/utils/providers";
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
  authProvider: Provider | null;
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
  const [authProvider, setAuthProvider] = useState<Provider | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function refreshAuth() {
    if (!isLoggedIn()) {
      setAuthUser(null);
      setAuthProvider(null);
      setAuthLoading(false);
      return;
    }

    setAuthLoading(true);
    const result = await GetAuthProvider();

    if (result.success) {
      setAuthUser(result.user ?? null);
      setAuthProvider(result.provider ?? null);
    } else {
      setAuthUser(null);
      setAuthProvider(null);
    }
    setAuthLoading(false);
  }

  // ← This was the missing piece — call refreshAuth on mount so the header
  //   knows auth state without depending on the homepage to trigger it
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
