"use client"

import { Check, X, Shield, Zap, Crown } from "lucide-react"
import { Disclaimer } from "@/src/components/legal/Disclaimer"

interface PaywallScreenProps {
  onClose: () => void
  onUpgrade: () => void
}

const features = [
  {
    name: "\u5EA7\u308A\u30E1\u30CB\u30E5\u30FC",
    free: true,
    pro: true,
  },
  {
    name: "\u7ACB\u3061\u30E1\u30CB\u30E5\u30FC",
    free: false,
    pro: true,
  },
  {
    name: "\u30EA\u30B9\u30AF\u76F8\u6BBA\u7387",
    freeValue: "40%",
    proValue: "100%",
    free: true,
    pro: true,
  },
  {
    name: "\u30B3\u30F3\u30C7\u30A3\u30B7\u30E7\u30F3\u30B9\u30B3\u30A2",
    free: false,
    pro: true,
  },
  {
    name: "\u9031\u6B21\u30EC\u30DD\u30FC\u30C8",
    free: true,
    pro: true,
  },
  {
    name: "\u6708\u6B21\u5206\u6790",
    free: false,
    pro: true,
  },
  {
    name: "FITPEAK\u30B7\u30CA\u30B8\u30FC",
    free: false,
    pro: true,
  },
  {
    name: "\u30AB\u30B9\u30BF\u30E0\u30BF\u30A4\u30DE\u30FC",
    free: false,
    pro: true,
  },
]

export function PaywallScreen({ onClose, onUpgrade }: PaywallScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background px-4 pb-8 pt-6">
      {/* Close button */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          aria-label="\u9589\u3058\u308B"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Hero */}
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-muted">
          <Crown className="h-8 w-8 text-orange" />
        </div>
        <h1 className="mt-6 text-2xl font-bold leading-tight text-foreground text-balance">
          {"14\u65E5\u9593\u306E\u751F\u5B58\u4F53\u9A13\u3092\u7121\u6599\u3067\u3002"}
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
          {"\u5BFF\u547D\u56DE\u5FA9\u306E\u30D5\u30EB\u30DD\u30C6\u30F3\u30B7\u30E3\u30EB\u3092\u89E3\u653E\u3002\u7ACB\u3061\u4E0A\u304C\u308A\u3001\u6297\u3044\u3001\u3059\u3079\u3066\u306E\uFF11\u5206\u3092\u53D6\u308A\u623B\u305D\u3046\u3002"}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        {/* Table Header */}
        <div className="grid grid-cols-3 border-b border-border bg-secondary">
          <div className="p-3">
            <span className="text-xs font-medium text-muted-foreground">{'\u6A5F\u80FD'}</span>
          </div>
          <div className="flex flex-col items-center border-l border-border p-3">
            <span className="text-xs font-medium text-muted-foreground">{'\u7121\u6599'}</span>
          </div>
          <div className="flex flex-col items-center border-l border-border bg-orange-muted p-3">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange" />
              <span className="text-xs font-bold text-orange">Pro</span>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        {features.map((feature, i) => (
          <div
            key={feature.name}
            className={`grid grid-cols-3 ${i < features.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-center p-3">
              <span className="text-xs text-foreground">{feature.name}</span>
            </div>
            <div className="flex items-center justify-center border-l border-border p-3">
              {feature.freeValue ? (
                <span className="text-xs font-medium text-muted-foreground">
                  {feature.freeValue}
                </span>
              ) : feature.free ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/40" />
              )}
            </div>
            <div className="flex items-center justify-center border-l border-border bg-orange-muted/30 p-3">
              {feature.proValue ? (
                <span className="text-xs font-bold text-orange">{feature.proValue}</span>
              ) : feature.pro ? (
                <Check className="h-4 w-4 text-orange" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/40" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={onUpgrade}
          className="w-full rounded-xl bg-orange py-4 text-sm font-bold text-primary-foreground shadow-[0_0_32px_rgba(255,95,31,0.3)] transition-all hover:shadow-[0_0_48px_rgba(255,95,31,0.5)] active:scale-[0.98]"
        >
          {"14\u65E5\u9593\u306E\u7121\u6599\u30C8\u30E9\u30A4\u30A2\u30EB\u3092\u958B\u59CB"}
        </button>
        <div className="flex items-center justify-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
  {"\u3044\u3064\u3067\u3082\u30AD\u30E3\u30F3\u30BB\u30EB\u53EF\u80FD\u3002\u304A\u652F\u6255\u3044\u4E0D\u8981\u3002"}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-xs text-muted-foreground">{'\u30C8\u30E9\u30A4\u30A2\u30EB\u7D42\u4E86\u5F8C'}</p>
        <div className="mt-1 flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-foreground">{'\uFFE5790'}</span>
          <span className="text-xs text-muted-foreground">/{'月'}</span>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">{'\u5E74\u984D\uFFE56,300\uFF0833%\u304A\u5F97\uFF09'}</p>
      </div>

      <Disclaimer className="mt-6 rounded-lg border border-border/60 bg-secondary/30 p-3" />
    </div>
  )
}
