"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, RotateCcw, SkipForward, Heart } from "lucide-react"
import { useLifeBuyback } from "@/src/hooks/useLifeBuyback"
import { predictLifeLossFromSitting } from "@/src/features/life-buyback/engine/lifeBuybackEngine"
import type { LifeBuybackMenuType } from "@/src/features/life-buyback"

interface DashboardTimerProps {
  onBreakStart: (payload: {
    lifeLossPrediction: number
    currentMenu: {
      id: string
      label: string
      menuType: LifeBuybackMenuType
    }
  }) => void
  isProUser: boolean
}

export function DashboardTimer({ onBreakStart, isProUser }: DashboardTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [lifespanRisk, setLifespanRisk] = useState(0)
  const totalTime = 25 * 60
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lifeBuyback = useLifeBuyback({ hasProAccess: isProUser })

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = (totalTime - timeLeft) / totalTime
  const circumference = 2 * Math.PI * 120

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      onBreakStart({
        lifeLossPrediction: lifespanRisk,
        currentMenu: {
          id: lifeBuyback.menu.exercises[0]?.id ?? "leg-extension",
          label: lifeBuyback.menu.exercises[0]?.label ?? "レッグエクステンション",
          menuType: lifeBuyback.menu.menuType,
        },
      })
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLeft, onBreakStart, lifespanRisk, lifeBuyback.menu])

  useEffect(() => {
    if (isRunning) {
      const elapsedSeconds = totalTime - timeLeft
      const elapsedMinutes = elapsedSeconds / 60
      const predicted = predictLifeLossFromSitting(elapsedMinutes)
      setLifespanRisk(predicted)
    } else if (timeLeft === totalTime) {
      setLifespanRisk(0)
    }
  }, [timeLeft, isRunning, totalTime])

  useEffect(() => {
    lifeBuyback.setHasProAccess(isProUser)
  }, [isProUser, lifeBuyback.setHasProAccess])

  useEffect(() => {
    lifeBuyback.setPosture("sitting")
    lifeBuyback.setDeskSize("standard")
  }, [lifeBuyback.setDeskSize, lifeBuyback.setPosture])

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(totalTime)
    setLifespanRisk(0)
  }, [totalTime])

  const status: "待機中" | "集中中" | "休憩" =
    timeLeft === 0 ? "休憩" : isRunning ? "集中中" : "待機中"

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-between px-5 pt-safe-top pb-6">
      {/* Minimal Header */}
      <header className="w-full pt-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
              FOCUS SESSION
            </p>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
              集中モード
            </h1>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 glass-card ${
            status === "集中中" ? "border-orange/30" : ""
          }`}>
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                status === "集中中"
                  ? "bg-orange animate-pulse-glow"
                  : status === "休憩"
                    ? "bg-success"
                    : "bg-muted-foreground/50"
              }`}
            />
            <span className="text-[11px] font-medium text-foreground/80">
              {status}
            </span>
          </div>
        </div>
      </header>

      {/* Timer Ring - Apple Watch inspired */}
      <div className="relative flex flex-1 items-center justify-center py-8">
        <div className={`relative ${isRunning ? "animate-subtle-breathe" : ""}`}>
          {/* Outer glow ring */}
          <div 
            className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
              isRunning ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `radial-gradient(circle, transparent 50%, rgba(244, 123, 42, 0.08) 70%, transparent 80%)`,
              transform: "scale(1.15)",
            }}
          />
          
          <svg 
            width="280" 
            height="280" 
            viewBox="0 0 280 280" 
            className="transform -rotate-90"
          >
            {/* Background ring - subtle */}
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />
            
            {/* Track ring */}
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="12"
            />
            
            {/* Progress ring */}
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              className="transition-all duration-1000 ease-linear"
              style={{
                filter: isRunning 
                  ? "drop-shadow(0 0 20px rgba(244, 123, 42, 0.5))" 
                  : "drop-shadow(0 0 8px rgba(244, 123, 42, 0.25))",
              }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9D5B" />
                <stop offset="100%" stopColor="#F47B2A" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className={`text-6xl font-light tracking-tight tabular-nums transition-all duration-300 ${
                isRunning ? "text-foreground" : "text-foreground/90"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(minutes).padStart(2, "0")}
              <span className={`${isRunning ? "animate-pulse-glow" : ""}`}>:</span>
              {String(seconds).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
              remaining
            </span>
          </div>
        </div>
      </div>

      {/* Controls - Minimal Apple style */}
      <div className="w-full space-y-4 animate-fade-in-up">
        {/* Life Risk Indicator */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                lifespanRisk > 0 ? "bg-orange/15" : "bg-success/15"
              }`}>
                <Heart className={`h-4 w-4 ${
                  lifespanRisk > 0 ? "text-orange" : "text-success"
                }`} />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  寿命リスク
                </p>
                <p className={`text-lg font-semibold tabular-nums ${
                  lifespanRisk > 0 ? "text-orange" : "text-success"
                }`}>
                  {lifespanRisk > 0 ? `-${lifespanRisk}` : "0"}
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">分</span>
                </p>
              </div>
            </div>
            
            {/* Mini progress */}
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange to-[#FF9D5B] transition-all duration-1000"
                  style={{ width: `${Math.min((lifespanRisk / 9) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {Math.round((lifespanRisk / 9) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={resetTimer}
            className="flex h-14 w-14 items-center justify-center rounded-full glass-card text-muted-foreground transition-all duration-200 active:scale-95 hover:text-foreground hover:border-foreground/20"
            aria-label="タイマーリセット"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleTimer}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange to-[#E56A1F] text-white shadow-lg shadow-orange/30 transition-all duration-200 active:scale-95 hover:shadow-xl hover:shadow-orange/40"
            aria-label={isRunning ? "タイマー一時停止" : "タイマー開始"}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange to-[#E56A1F] blur-xl opacity-50" />
            <div className="relative">
              {isRunning ? (
                <Pause className="h-7 w-7" />
              ) : (
                <Play className="ml-1 h-7 w-7" />
              )}
            </div>
          </button>
          
          <button
            onClick={() =>
              onBreakStart({
                lifeLossPrediction: lifespanRisk,
                currentMenu: {
                  id: lifeBuyback.menu.exercises[0]?.id ?? "leg-extension",
                  label: lifeBuyback.menu.exercises[0]?.label ?? "レッグエクステンション",
                  menuType: lifeBuyback.menu.menuType,
                },
              })
            }
            className="flex h-14 w-14 items-center justify-center rounded-full glass-card text-muted-foreground transition-all duration-200 active:scale-95 hover:text-foreground hover:border-foreground/20"
            aria-label="休憩へスキップ"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Subtle hint */}
        <p className="text-center text-[10px] text-muted-foreground/50">
          25分の集中後、1分の運動で寿命を取り戻す
        </p>
      </div>
    </div>
  )
}
