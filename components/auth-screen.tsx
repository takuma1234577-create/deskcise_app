"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { BrandLogo } from "@/components/BrandLogo";

export function AuthScreen() {
  const {
    isConfigured,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogleAccount,
  } = useAuth();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === "signIn") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "認証に失敗しました。";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogleAccount();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Googleログインに失敗しました。";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full rounded-xl border border-border bg-secondary p-4">
          <h1 className="text-lg font-semibold text-foreground">Firebaseログイン設定</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            `NEXT_PUBLIC_FIREBASE_*` 環境変数が未設定です。`.env.local` を作成してFirebase設定を追加してください。
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full rounded-xl border border-border bg-secondary p-4">
        <BrandLogo />
        <p className="mt-1 text-xs text-muted-foreground">
          DEKCISE ログイン
        </p>

        <div className="mt-4 space-y-3">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>

        {error && <p className="mt-2 text-xs text-danger">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-orange px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {mode === "signIn" ? "ログイン" : "新規登録"}
        </button>

        <button
          type="button"
          onClick={signInGoogle}
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground disabled:opacity-50"
        >
          Googleでログイン
        </button>

        <button
          type="button"
          onClick={() => setMode((prev) => (prev === "signIn" ? "signUp" : "signIn"))}
          className="mt-3 text-xs text-muted-foreground underline"
        >
          {mode === "signIn" ? "アカウント作成へ" : "ログインへ戻る"}
        </button>
      </div>
    </main>
  );
}
