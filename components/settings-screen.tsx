"use client"

import { useState } from "react"
import { ChevronDown, User, Crown, LogOut, FileText } from "lucide-react"
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
    <div className="flex flex-col px-5 pb-24 pt-safe-top">
      {/* Header */}
      <header className="py-4 animate-fade-in-up">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          SETTINGS
        </p>
        <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
          設定
        </h1>
      </header>

      <div className="space-y-3 animate-fade-in-up">
        <NotificationSettings />

        {/* Account Card */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
              <User className="h-5 w-5 text-orange" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                アカウント
              </p>
              <p className="text-sm font-medium text-foreground">
                {user ? "ログイン中" : "未ログイン"}
              </p>
            </div>
          </div>
          
          {user && (
            <div className="space-y-3 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/70">メール</span>
                <span className="text-xs font-medium text-foreground">{user.email ?? "未設定"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/70">プロバイダ</span>
                <span className="text-xs font-medium text-foreground">{providerLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/70">UID</span>
                <span className="text-[10px] font-mono text-foreground/60 max-w-[180px] truncate">{user.uid}</span>
              </div>
            </div>
          )}
          
          {user && (
            <button
              type="button"
              onClick={() => {
                void signOutFromApp()
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs font-medium text-foreground/80 transition-all duration-200 active:scale-[0.98] hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </button>
          )}
        </div>

        {/* Plan Card */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isProUnlocked ? "bg-success/10" : "bg-muted/30"}`}>
                <Crown className={`h-5 w-5 ${isProUnlocked ? "text-success" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  プラン
                </p>
                <p className="text-sm font-medium text-foreground">
                  {isProUnlocked ? "プロ" : "無料プラン"}
                </p>
              </div>
            </div>
            {!isProUnlocked && (
              <div className="rounded-full bg-orange/10 px-3 py-1">
                <span className="text-[10px] font-medium text-orange">
                  残り{trialDaysRemaining}日
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTerms((prev) => !prev)}
            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
            aria-expanded={showTerms}
            aria-controls="terms-content"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/30">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">利用規約</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                showTerms ? "rotate-180" : ""
              }`}
            />
          </button>

          {showTerms && (
            <div id="terms-content" className="border-t border-white/5 px-4 py-4">
              <p className="text-[11px] leading-relaxed text-muted-foreground/80">
                本アプリは健康維持を目的としたライフスタイル支援サービスです。表示される数値は統計的推定に基づく参考情報であり、
                医学的診断または治療の代替ではありません。利用者は自身の判断と責任で運動を実施し、体調に不安がある場合は医師等の
                専門家に相談してください。利用により生じた損害について、法令に反しない範囲で開発者の責任は限定されます。
                サービス内容は予告なく変更・停止される場合があります。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
