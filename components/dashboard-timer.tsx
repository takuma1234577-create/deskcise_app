"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { useLifeBuyback } from "@/src/hooks/useLifeBuyback"
import { predictLifeLossFromSitting } from "@/src/features/life-buyback/engine/lifeBuybackEngine"
import type { LifeBuybackMenuType } from "@/src/features/life-buyback"
import { BrandLogo } from "@/components/BrandLogo"

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
      setLifespanRisk(predicted)
    } else if (timeLeft === totalTime) {
      setLifespanRisk(0)
    }
  }, [timeLeft, isRunning, totalTime])

  useEffect(() => {
    lifeBuyback.setHasProAccess(isProUser)
  }, [isProUser, lifeBuyback.setHasProAccess])

  useEffect(() => {
    // Temporarily lock environment to seated-only UX.
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

  return (
    <div className="flex flex-col items-center px-4 pb-8">
      {/* Header */}
      <div className="w-full flex items-center justify-center pt-4">
        <div>
          <BrandLogo wordmarkClassName="h-10" />
        </div>
      </div>

      {/* Timer Ring */}
      <div className="relative mt-7 mb-5 flex items-center justify-center">
        <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx="140"
            cy="140"
            r="130"
            fill="none"
            stroke="#203A66"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="140"
            cy="140"
            r="130"
            fill="none"
            stroke="#F97316"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: isRunning ? "drop-shadow(0 0 12px rgba(249, 115, 22, 0.45))" : "none",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-7xl font-bold tracking-tight text-white tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-slate-400">FOCUS TIMER</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/70 p-2.5">
        <button
          onClick={resetTimer}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-transparent text-slate-300 transition-colors hover:text-white"
          aria-label="\u30BF\u30A4\u30DE\u30FC\u30EA\u30BB\u30C3\u30C8"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={toggleTimer}
          className="mx-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_0_24px_rgba(249,115,22,0.35)] transition-all hover:shadow-[0_0_34px_rgba(249,115,22,0.55)] active:scale-95"
          aria-label={isRunning ? "\u30BF\u30A4\u30DE\u30FC\u4E00\u6642\u505C\u6B62" : "\u30BF\u30A4\u30DE\u30FC\u958B\u59CB"}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-transparent text-slate-300 transition-colors hover:text-white"
          aria-label="\u4F11\u61A9\u3078\u30B9\u30AD\u30C3\u30D7"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
