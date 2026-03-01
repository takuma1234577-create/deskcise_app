"use client"

import { Timer, BarChart3, Settings, Dumbbell } from "lucide-react"

export type Screen = "dashboard" | "exercise" | "report" | "settings"

interface BottomNavProps {
  current: Screen
  onChange: (screen: Screen) => void
}

export function BottomNav({ current, onChange }: BottomNavProps) {
  const items: { id: Screen; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "タイマー",
      icon: <Timer className="h-5 w-5" />,
    },
    {
      id: "exercise",
      label: "運動",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      id: "report",
      label: "レポート",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "設定",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/5 bg-background/80"
      aria-label="メインナビゲーション"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1 pb-[max(env(safe-area-inset-bottom),12px)]">
        {items.map((item) => {
          const isActive = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-5 py-2 transition-all duration-200 ${
                isActive
                  ? "text-orange"
                  : "text-muted-foreground/60 active:scale-95 hover:text-muted-foreground"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-orange" />
              )}
              <div className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] transition-all duration-200 ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
