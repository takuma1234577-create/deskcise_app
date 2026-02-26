"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "../lib/firebase/client";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogleAccount: () => Promise<void>;
  signOutFromApp: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function assertAuthConfigured() {
  if (!firebaseAuth) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars.");
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      // Fallback to avoid being stuck forever in loading state.
      setLoading(false);
    }, 4000);

    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
      window.clearTimeout(timeoutId);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured,
      signInWithEmail: async (email: string, password: string) => {
        assertAuthConfigured();
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      },
      signUpWithEmail: async (email: string, password: string) => {
        assertAuthConfigured();
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      },
      signInWithGoogleAccount: async () => {
        assertAuthConfigured();
        await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      },
      signOutFromApp: async () => {
        assertAuthConfigured();
        await signOut(firebaseAuth);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
