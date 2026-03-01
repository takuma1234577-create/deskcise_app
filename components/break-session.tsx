"use client"

import { useEffect, useRef, useState } from "react"
import { X, Sparkles } from "lucide-react"
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
    <div className="h-28 w-28 text-success">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="60" cy={frame === 0 ? "28" : "24"} r="8" fill="currentColor" />
        <line x1="60" y1="36" x2={frame === 0 ? "50" : "46"} y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1={frame === 0 ? "50" : "46"} y1="58" x2={frame === 0 ? "36" : "30"} y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1={frame === 0 ? "36" : "30"} y1="58" x2={frame === 0 ? "36" : "30"} y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1={frame === 0 ? "42" : "36"} y1="58" x2={frame === 0 ? "42" : "36"} y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
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
    <div className="h-28 w-28 text-success">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="50" cy={frame === 0 ? "20" : "16"} r="10" fill="currentColor" />
        <line x1="50" y1={frame === 0 ? "30" : "26"} x2="50" y2={frame === 0 ? "70" : "66"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "45" : "41"} x2="30" y2={frame === 0 ? "55" : "51"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "45" : "41"} x2="70" y2={frame === 0 ? "55" : "51"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "70" : "66"} x2="38" y2={frame === 0 ? "95" : "88"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "70" : "66"} x2="62" y2={frame === 0 ? "95" : "88"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
    <div className="h-28 w-28 text-success">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="50" cy="20" r="10" fill="currentColor" />
        <line x1="50" y1="30" x2="50" y2={frame === 0 ? "60" : "64"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="42" x2="30" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="42" x2="70" y2="54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "60" : "64"} x2="32" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1={frame === 0 ? "60" : "64"} x2="68" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="84" x2="80" y2="84" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
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
    <div className="h-28 w-28 text-success">
      <svg viewBox="0 0 100 120" className="h-full w-full">
        <circle cx="54" cy="24" r="8" fill="currentColor" />
        <rect x="24" y="56" width="30" height="4" rx="2" fill="currentColor" opacity="0.3" />
        <line x1="54" y1="32" x2="44" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="44" y1="52" x2="34" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="44" y1="52" x2={frame === 0 ? "62" : "72"} y2={frame === 0 ? "68" : "62"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="58" x2="34" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
  const circumference = 2 * Math.PI * 100
  const glowStrength = recoveryTarget > 0 ? Math.min(lifeRecovery / recoveryTarget, 1) : 0
  const recoveryDisplay =
    lifeRecovery >= recoveryTarget
      ? `${recoveryTarget}`
      : lifeRecovery.toFixed(1)

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-5 pt-safe-top pb-6">
      {/* Header */}
      <header className="w-full pt-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
              BREAK TIME
            </p>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
              寿命リカバリー
            </h1>
          </div>
          <button
            onClick={onSkip}
            className="flex h-10 w-10 items-center justify-center rounded-full glass-card text-muted-foreground transition-all duration-200 active:scale-95 hover:text-foreground"
            aria-label="休憩をスキップ"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Recovery Display */}
      <div className="mt-8 flex flex-col items-center animate-fade-in-up">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-success" />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-success/80">
            Life Recovery
          </span>
        </div>
        <div className="relative mt-3">
          <span
            className="text-6xl font-light tabular-nums text-success transition-all duration-300"
            style={{
              textShadow: `0 0 ${12 + glowStrength * 30}px rgba(74, 222, 128, ${0.3 + glowStrength * 0.5})`,
            }}
          >
            +{recoveryDisplay}
          </span>
          <span className="ml-1 text-xl font-light text-success/60">分</span>
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute -right-8 top-2 text-sm font-semibold text-success animate-particle-pop"
            >
              +{p.value}
            </span>
          ))}
        </div>
      </div>

      {/* Timer Ring with Animation */}
      <div className="relative mt-6 flex flex-1 items-center justify-center">
        <div className="relative animate-subtle-breathe">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, transparent 45%, rgba(74, 222, 128, ${0.05 + glowStrength * 0.1}) 65%, transparent 80%)`,
              transform: "scale(1.2)",
            }}
          />
          
          <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-90">
            {/* Background track */}
            <circle 
              cx="120" 
              cy="120" 
              r="100" 
              fill="none" 
              stroke="rgba(255,255,255,0.04)" 
              strokeWidth="8" 
            />
            
            {/* Progress ring */}
            <circle
              cx="120"
              cy="120"
              r="100"
              fill="none"
              stroke="url(#breakGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              className="transition-all duration-300 ease-linear"
              style={{ 
                filter: `drop-shadow(0 0 ${8 + glowStrength * 12}px rgba(74, 222, 128, ${0.3 + glowStrength * 0.4}))` 
              }}
            />
            
            <defs>
              <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MenuAnimation menuId={effectiveMenuId} />
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="mt-4 flex flex-col items-center animate-fade-in-up">
        <span className="text-4xl font-light tabular-nums text-foreground/90">
          0:{String(timeLeft).padStart(2, "0")}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
          remaining
        </span>
      </div>

      {/* Info Cards */}
      <div className="mt-6 w-full space-y-3 animate-fade-in-up">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {effectiveMenuId === "leg-extension" ? "レッグエクステンション" : currentMenu.label}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                {effectiveMenuType === "standing"
                  ? "プロメニュー - 最大効果"
                  : "座り専用メニュー"}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <span className="text-sm font-semibold text-success">+{recoveryTarget}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-success/10 p-3">
          <p className="text-center text-[11px] font-medium text-success">
            {lifeBuyback.liveRecoveryText}
          </p>
        </div>
      </div>
    </div>
  )
}
