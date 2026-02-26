"use client"

import { Timer, BarChart3, Crown, Settings } from "lucide-react"

export type Screen = "dashboard" | "report" | "paywall" | "settings"

interface BottomNavProps {
  current: Screen
  onChange: (screen: Screen) => void
}

export function BottomNav({ current, onChange }: BottomNavProps) {
  const items: { id: Screen; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "\u30BF\u30A4\u30DE\u30FC",
      icon: <Timer className="h-5 w-5" />,
    },
    {
      id: "report",
      label: "\u30EC\u30DD\u30FC\u30C8",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "paywall",
      label: "プロ",
      icon: <Crown className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "設定",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-navy/95 backdrop-blur-md"
      aria-label="\u30E1\u30A4\u30F3\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 transition-colors ${
              current === item.id
                ? "text-orange"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={item.label}
            aria-current={current === item.id ? "page" : undefined}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
