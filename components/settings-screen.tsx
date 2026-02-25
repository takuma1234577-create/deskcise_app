"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function SettingsScreen() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <div className="flex flex-col px-4 pb-24">
      <div className="py-4">
        <h1 className="text-lg font-semibold text-foreground">設定</h1>
        <p className="text-xs text-muted-foreground">アプリ設定と法的情報</p>
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
