"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, RotateCcw, Monitor, Maximize2, Minimize2 } from "lucide-react"
import { useLifeBuyback } from "@/src/hooks/useLifeBuyback"
import { predictLifeLossFromSitting } from "@/src/features/life-buyback/engine/lifeBuybackEngine"
import type { LifeBuybackMenuType } from "@/src/features/life-buyback"

type DeskSpace = "narrow" | "normal" | "wide"
type Posture = "sitting" | "standing"

interface DashboardTimerProps {
  onBreakStart: (payload: {
    lifeLossPrediction: number
    currentMenu: {
      id: string
      label: string
      menuType: LifeBuybackMenuType
    }
  }) => void
  onRequirePro: () => void
  isProUser: boolean
}

export function DashboardTimer({ onBreakStart, onRequirePro, isProUser }: DashboardTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [lifespanRisk, setLifespanRisk] = useState(0)
  const totalTime = 25 * 60
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lifeBuyback = useLifeBuyback({ hasProAccess: isProUser })

  const deskSpace: DeskSpace =
    lifeBuyback.environment.deskSize === "compact"
      ? "narrow"
      : lifeBuyback.environment.deskSize === "standard"
        ? "normal"
        : "wide"
  const posture: Posture = lifeBuyback.environment.posture

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = (totalTime - timeLeft) / totalTime
  const circumference = 2 * Math.PI * 130

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

  // Accumulate lifespan risk in real time while focus runs.
  useEffect(() => {
    if (isRunning) {
      const elapsedSeconds = totalTime - timeLeft
      const elapsedMinutes = elapsedSeconds / 60
      const predicted = predictLifeLossFromSitting(elapsedMinutes)
      setLifespanRisk(posture === "sitting" ? predicted : 0)
    } else if (timeLeft === totalTime) {
      setLifespanRisk(0)
    }
  }, [timeLeft, isRunning, posture, totalTime])

  useEffect(() => {
    lifeBuyback.setHasProAccess(isProUser)
  }, [isProUser, lifeBuyback.setHasProAccess])

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(totalTime)
    setLifespanRisk(0)
  }, [totalTime])

  const deskOptions: { value: DeskSpace; label: string; icon: React.ReactNode }[] = [
    { value: "narrow", label: "Narrow", icon: <Minimize2 className="h-3.5 w-3.5" /> },
    { value: "normal", label: "Normal", icon: <Monitor className="h-3.5 w-3.5" /> },
    { value: "wide", label: "Wide", icon: <Maximize2 className="h-3.5 w-3.5" /> },
  ]

  const status: "Idle" | "Focus" | "Break" =
    timeLeft === 0 ? "Break" : isRunning ? "Focus" : "Idle"

  const statusClassName =
    status === "Focus"
      ? "bg-orange text-primary-foreground"
      : status === "Break"
        ? "bg-success text-foreground"
        : "bg-secondary text-secondary-foreground"

  return (
    <div className="flex flex-col items-center px-4 pb-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-orange">DEKCIZE 22</h1>
          <p className="text-xs text-muted-foreground">{'\u96C6\u4E2D\u30BB\u30C3\u30B7\u30E7\u30F3'}</p>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${statusClassName}`}>
          <div
            className={`h-2 w-2 rounded-full ${
              status === "Focus"
                ? "bg-primary-foreground animate-pulse-glow"
                : status === "Break"
                  ? "bg-foreground"
                  : "bg-muted-foreground"
            }`}
          />
          <span className="text-xs font-medium">
            {status}
          </span>
        </div>
      </div>

      {/* Timer Ring */}
      <div className="relative my-6 flex items-center justify-center">
        <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx="140"
            cy="140"
            r="130"
            fill="none"
            stroke="var(--navy-lighter)"
            strokeWidth="6"
          />
          {/* Progress ring */}
          <circle
            cx="140"
            cy="140"
            r="130"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isRunning ? "drop-shadow(0 0 8px rgba(255, 95, 31, 0.5))" : "none",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-light tracking-tighter text-foreground tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            {posture === "sitting" ? "\u5EA7\u308A" : "\u7ACB\u3061"} / {deskSpace === "narrow" ? "\u72ED\u3044" : deskSpace === "normal" ? "\u666E\u901A" : "\u5E83\u3044"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={resetTimer}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-navy-lighter"
          aria-label="\u30BF\u30A4\u30DE\u30FC\u30EA\u30BB\u30C3\u30C8"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTimer}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-orange text-primary-foreground shadow-[0_0_24px_rgba(255,95,31,0.3)] transition-all hover:shadow-[0_0_32px_rgba(255,95,31,0.5)] active:scale-95"
          aria-label={isRunning ? "\u30BF\u30A4\u30DE\u30FC\u4E00\u6642\u505C\u6B62" : "\u30BF\u30A4\u30DE\u30FC\u958B\u59CB"}
        >
          {isRunning ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
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
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-navy-lighter"
          aria-label="\u4F11\u61A9\u3078\u30B9\u30AD\u30C3\u30D7"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 3L12 10L4 17V3Z" fill="currentColor" />
            <rect x="14" y="3" width="3" height="14" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Desk Environment Selector */}
      <div className="mt-8 w-full">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
{'\u30C7\u30B9\u30AF\u74B0\u5883'}
        </label>
        <div className="flex gap-2">
          {deskOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                lifeBuyback.setDeskSize(
                  opt.value === "narrow" ? "compact" : opt.value === "normal" ? "standard" : "wide"
                )
              }
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-medium transition-all ${
                deskSpace === opt.value
                  ? "border-orange bg-orange-muted text-orange"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posture Toggle */}
      <div className="mt-4 w-full">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
{'\u59FF\u52E2'}
        </label>
        <div className="flex gap-2">
          {(["sitting", "standing"] as Posture[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                if (p === "standing" && !isProUser) {
                  onRequirePro()
                  return
                }
                lifeBuyback.setPosture(p)
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-medium transition-all ${
                posture === p
                  ? "border-orange bg-orange-muted text-orange"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "sitting" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="2" fill="currentColor" />
                  <path d="M6 7H10V11H12V13H10V11H6V13H4V11H6V7Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="2" r="2" fill="currentColor" />
                  <path d="M7 5H9V10H11V12H9V14H7V12H5V10H7V5Z" fill="currentColor" />
                </svg>
              )}
              {p === "sitting" ? "Sitting" : "Standing"}
            </button>
          ))}
        </div>
      </div>

      {/* Lifespan Risk Gauge */}
      <div className="mt-6 w-full rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
{'\u5BFF\u547D\u30EA\u30B9\u30AF'}
          </span>
          <span
            className={`text-sm font-bold tabular-nums ${
              lifespanRisk > 0 ? "text-orange animate-pulse-glow" : "text-success"
            }`}
          >
            {lifespanRisk > 0 ? `-${lifespanRisk}\u5206` : "0\u5206"}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-navy-lighter">
          <div
            className="h-full rounded-full bg-danger transition-all duration-1000 ease-linear"
            style={{
              width: `${Math.min((lifespanRisk / 9) * 100, 100)}%`,
              boxShadow: lifespanRisk > 0 ? "0 0 8px rgba(239, 68, 68, 0.5)" : "none",
            }}
          />
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
{'\u9577\u6642\u9593\u306E\u5EA7\u4F4D\u306F\u8840\u6D41\u3092\u4F4E\u4E0B\u3055\u305B\u307E\u3059\u300225\u5206\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3067\u7D04\uFF19\u5206\u306E\u30EA\u30B9\u30AF\u304C\u84C4\u7A4D\u3055\u308C\u307E\u3059\u3002'}
        </p>
      </div>
    </div>
  )
}
