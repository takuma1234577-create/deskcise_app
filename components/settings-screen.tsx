"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "@/src/context/AuthContext"
import { useSubscription } from "@/src/context/SubscriptionContext"
import { NotificationSettings } from "@/components/NotificationSettings"

export function SettingsScreen() {
  const [showTerms, setShowTerms] = useState(false)
  const { user, signOutFromApp } = useAuth()
  const { isProUnlocked, trialDaysRemaining } = useSubscription()

  const providerLabel =
    user?.providerData?.map((provider) => provider.providerId).join(", ") ?? "unknown"

  return (
    <div className="flex flex-col px-4 pb-24">
      <div className="py-4">
        <h1 className="text-lg font-semibold text-foreground">設定</h1>
        <p className="text-xs text-muted-foreground">アプリ設定と法的情報</p>
      </div>

      <NotificationSettings />

      <div className="mb-3 rounded-xl border border-border bg-secondary p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange">
          アカウント
        </p>
        <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
          <p>
            ログイン状態:{" "}
            <span className="font-medium text-foreground">
              {user ? "ログイン中" : "未ログイン"}
            </span>
          </p>
          {user && (
            <>
              <p>
                メール:{" "}
                <span className="font-medium text-foreground">{user.email ?? "未設定"}</span>
              </p>
              <p>
                UID:{" "}
                <span className="font-medium text-foreground break-all">{user.uid}</span>
              </p>
              <p>
                プロバイダ:{" "}
                <span className="font-medium text-foreground">{providerLabel}</span>
              </p>
            </>
          )}
          <p>
            プラン:{" "}
            <span className="font-medium text-foreground">
              {isProUnlocked ? "プロ（有効）" : `無料 / トライアル残り${trialDaysRemaining}日`}
            </span>
          </p>
        </div>
        {user && (
          <button
            type="button"
            onClick={() => {
              void signOutFromApp()
            }}
            className="mt-3 rounded-lg border border-border px-3 py-2 text-xs text-foreground"
          >
            ログアウト
          </button>
        )}
      </div>

      <div className="rounded-xl border border-border bg-secondary">
        <button
          type="button"
          onClick={() => setShowTerms((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
          aria-expanded={showTerms}
          aria-controls="terms-content"
        >
          <span className="text-sm font-medium text-foreground">利用規約</span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              showTerms ? "rotate-180" : ""
            }`}
          />
        </button>

        {showTerms && (
          <div id="terms-content" className="border-t border-border px-4 py-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              本アプリは健康維持を目的としたライフスタイル支援サービスです。表示される数値は統計的推定に基づく参考情報であり、
              医学的診断または治療の代替ではありません。利用者は自身の判断と責任で運動を実施し、体調に不安がある場合は医師等の
              専門家に相談してください。利用により生じた損害について、法令に反しない範囲で開発者の責任は限定されます。
              サービス内容は予告なく変更・停止される場合があります。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
