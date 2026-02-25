"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useLifeBuyback } from "@/src/hooks/useLifeBuyback"
import { calculateLifeRecovery } from "@/src/features/life-buyback/engine/lifeBuybackEngine"
import type { LifeBuybackMenuType } from "@/src/features/life-buyback"

interface BreakSessionProps {
  onComplete: (result: {
    recoveredLifeMinutes: number
    lifeLossPrediction: number
    remainingLifeRisk: number
    menuId: string
    menuType: LifeBuybackMenuType
    resetMessage: string
  }) => void
  onSkip: () => void
  lifeLossPrediction: number
  isProUser: boolean
  currentMenu: {
    id: string
    label: string
    menuType: LifeBuybackMenuType
  }
}

function DeskPushup() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 2), 700)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="h-40 w-40 text-orange">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="60" cy={frame === 0 ? "28" : "24"} r="8" fill="currentColor" />
        <line x1="60" y1="36" x2={frame === 0 ? "50" : "46"} y2="58" stroke="currentColor" strokeWidth="3" />
        <line x1={frame === 0 ? "50" : "46"} y1="58" x2={frame === 0 ? "36" : "30"} y2="58" stroke="currentColor" strokeWidth="3" />
        <line x1={frame === 0 ? "36" : "30"} y1="58" x2={frame === 0 ? "36" : "30"} y2="80" stroke="currentColor" strokeWidth="3" />
        <line x1={frame === 0 ? "42" : "36"} y1="58" x2={frame === 0 ? "42" : "36"} y2="80" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  )
}

function HeelRaise() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 2), 700)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="h-40 w-40 text-orange">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="50" cy={frame === 0 ? "20" : "16"} r="10" fill="currentColor" />
        <line x1="50" y1={frame === 0 ? "30" : "26"} x2="50" y2={frame === 0 ? "70" : "66"} stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "45" : "41"} x2="30" y2={frame === 0 ? "55" : "51"} stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "45" : "41"} x2="70" y2={frame === 0 ? "55" : "51"} stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "70" : "66"} x2="38" y2={frame === 0 ? "95" : "88"} stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "70" : "66"} x2="62" y2={frame === 0 ? "95" : "88"} stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  )
}

function IsometricSquat() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 2), 800)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="h-40 w-40 text-orange">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="50" cy="20" r="10" fill="currentColor" />
        <line x1="50" y1="30" x2="50" y2={frame === 0 ? "60" : "64"} stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1="42" x2="30" y2="54" stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1="42" x2="70" y2="54" stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "60" : "64"} x2="32" y2="84" stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1={frame === 0 ? "60" : "64"} x2="68" y2="84" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="84" x2="80" y2="84" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  )
}

function SittingLegExt() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 2), 650)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="h-40 w-40 text-orange">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="54" cy="24" r="8" fill="currentColor" />
        <rect x="24" y="56" width="30" height="4" fill="currentColor" opacity="0.5" />
        <line x1="54" y1="32" x2="44" y2="52" stroke="currentColor" strokeWidth="3" />
        <line x1="44" y1="52" x2="34" y2="58" stroke="currentColor" strokeWidth="3" />
        <line x1="44" y1="52" x2={frame === 0 ? "62" : "72"} y2={frame === 0 ? "68" : "62"} stroke="currentColor" strokeWidth="3" />
        <line x1="34" y1="58" x2="34" y2="80" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  )
}

function MenuAnimation({ menuId }: { menuId: string }) {
  switch (menuId) {
    case "desk-pushup":
      return <DeskPushup />
    case "power-heel-raise":
      return <HeelRaise />
    case "isometric-squat":
      return <IsometricSquat />
    case "leg-extension":
    default:
      return <SittingLegExt />
  }
}

export function BreakSession({
  onComplete,
  onSkip,
  lifeLossPrediction,
  currentMenu,
  isProUser,
}: BreakSessionProps) {
  const [timeLeft, setTimeLeft] = useState(60)
  const [lifeRecovery, setLifeRecovery] = useState(0)
  const [particles, setParticles] = useState<{ id: number; value: number }[]>([])
  const nextId = useRef(0)
  const prevWholeRecovery = useRef(0)
  const completedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const startedAtRef = useRef<number | null>(null)
  const totalTime = 60

  const effectiveMenuId = isProUser ? currentMenu.id : "leg-extension"
  const effectiveMenuType: LifeBuybackMenuType =
    effectiveMenuId === "leg-extension" ? "sitting-only" : "standing"
  const recoveryTarget = calculateLifeRecovery(effectiveMenuType, 1)

  const lifeBuyback = useLifeBuyback({
    hasProAccess: isProUser,
    breakMinutes: 1,
    environment: {
      deskSize:
        effectiveMenuId === "desk-pushup"
          ? "wide"
          : effectiveMenuId === "power-heel-raise"
            ? "standard"
            : effectiveMenuId === "isometric-squat"
              ? "compact"
              : "standard",
      posture: effectiveMenuType === "standing" ? "standing" : "sitting",
    },
  })

  useEffect(() => {
    const animate = (now: number) => {
      if (startedAtRef.current === null) {
        startedAtRef.current = now
      }

      const elapsedMs = Math.min(now - startedAtRef.current, totalTime * 1000)
      const progress = elapsedMs / (totalTime * 1000)
      const nextRecovery = progress * recoveryTarget
      const nextTimeLeft = Math.max(0, Math.ceil((totalTime * 1000 - elapsedMs) / 1000))

      setLifeRecovery(nextRecovery)
      setTimeLeft(nextTimeLeft)

      const currentWhole = Math.floor(nextRecovery)
      if (currentWhole > prevWholeRecovery.current) {
        const id = nextId.current++
        setParticles((prev) => [...prev, { id, value: currentWhole - prevWholeRecovery.current }])
        prevWholeRecovery.current = currentWhole
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id))
        }, 700)
      }

      if (elapsedMs >= totalTime * 1000) {
        if (!completedRef.current) {
          completedRef.current = true
          const completion = lifeBuyback.completeBreak({
            lifeLossPrediction,
            menuType: effectiveMenuType,
            breakMinutes: 1,
          })

          onComplete({
            recoveredLifeMinutes: completion.recoveredLifeMinutes,
            lifeLossPrediction,
            remainingLifeRisk: completion.remainingLifeRisk,
            menuId: effectiveMenuId,
            menuType: effectiveMenuType,
            resetMessage: completion.resetMessage,
          })
        }
        return
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    animationFrameRef.current = window.requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    effectiveMenuId,
    effectiveMenuType,
    lifeBuyback.completeBreak,
    lifeLossPrediction,
    onComplete,
    recoveryTarget,
    totalTime,
  ])

  const progress = (totalTime - timeLeft) / totalTime
  const circumference = 2 * Math.PI * 80
  const glowStrength = recoveryTarget > 0 ? Math.min(lifeRecovery / recoveryTarget, 1) : 0
  const recoveryDisplay =
    lifeRecovery >= recoveryTarget
      ? `${recoveryTarget}`
      : lifeRecovery.toFixed(1)

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">休憩タイム</h2>
          <p className="text-xs text-muted-foreground">寿命を買い戻そう</p>
        </div>
        <button
          onClick={onSkip}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          aria-label="休憩をスキップ"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mt-8 flex flex-col items-center">
        <span className="text-xs font-medium uppercase tracking-widest text-orange">
          Life Recovery
        </span>
        <div className="relative mt-2">
          <span
            className="text-5xl font-bold tabular-nums text-orange transition-all duration-150"
            style={{
              textShadow: `0 0 ${8 + glowStrength * 20}px rgba(255, 95, 31, ${0.35 + glowStrength * 0.45})`,
            }}
          >
            +{recoveryDisplay}
          </span>
          <span className="ml-1 text-lg text-orange/70">min</span>
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute -right-7 top-1 text-xs font-bold text-orange animate-particle-pop"
            >
              +{p.value}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--navy-lighter)" strokeWidth="4" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="var(--success)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
            className="transition-all duration-1000 ease-linear"
            style={{ filter: "drop-shadow(0 0 6px rgba(74, 222, 128, 0.4))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <MenuAnimation menuId={effectiveMenuId} />
        </div>
      </div>

      <span className="mt-4 text-3xl font-light tabular-nums text-foreground">
        0:{String(timeLeft).padStart(2, "0")}
      </span>

      <div className="mt-6 w-full rounded-xl border border-border bg-secondary p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {effectiveMenuId === "leg-extension" ? "Sitting Only" : currentMenu.label}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {effectiveMenuType === "standing"
              ? "Pro menu active: full +22 min buyback"
              : "Free menu active: +9 min buyback"}
          </p>
        </div>
      </div>

      <div className="mt-6 w-full rounded-xl bg-success-muted p-3">
        <p className="text-center text-xs font-medium text-success">
          {lifeBuyback.liveRecoveryText}
        </p>
      </div>
    </div>
  )
}
