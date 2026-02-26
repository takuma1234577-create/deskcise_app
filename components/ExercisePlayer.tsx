"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Activity, ChevronDown, Info, Pause, Play, RotateCcw, Timer } from "lucide-react"

export interface ExerciseFocusPoint {
  id: string
  label: string
  cue: string
}

export interface ExerciseDetailData {
  id: string
  name: string
  description: string
  durationSeconds: number
  difficulty: "easy" | "normal" | "hard"
  focusPoints: ExerciseFocusPoint[]
  tips: string[]
}

export const SAMPLE_SEATED_LEG_EXTENSION: ExerciseDetailData = {
  id: "seated-leg-extension",
  name: "シーテッド・レッグエクステンション",
  description: "椅子に深く座り、片脚ずつ膝を伸ばしてゆっくり戻すことで下半身の血流を高めます。",
  durationSeconds: 30,
  difficulty: "easy",
  focusPoints: [
    { id: "quad", label: "大腿四頭筋", cue: "膝を伸ばす時に太もも前を意識" },
    { id: "core", label: "体幹", cue: "腰を反らさず背筋を長く保つ" },
    { id: "ankle", label: "足首", cue: "つま先を軽く手前に引いて末端まで活性化" },
  ],
  tips: [
    "反動を使わず、1秒で上げて1秒で下ろす",
    "肩が上がらないよう首周りをリラックス",
    "呼吸は止めず、上げる時に吐く",
  ],
}

function difficultyLabel(level: ExerciseDetailData["difficulty"]) {
  if (level === "easy") return "やさしい"
  if (level === "hard") return "高負荷"
  return "標準"
}

function CircularTimer({
  remaining,
  total,
}: {
  remaining: number
  total: number
}) {
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const progress = total === 0 ? 0 : remaining / total

  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1E293B" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#F97316"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            filter: "drop-shadow(0 0 10px rgba(249,115,22,0.55))",
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-3xl font-semibold tabular-nums text-white">{remaining}</p>
          <p className="text-[11px] text-slate-300">seconds</p>
        </div>
      </div>
    </div>
  )
}

function RippleButton({
  label,
  icon,
  onClick,
  variant = "primary",
}: {
  label: string
  icon: ReactNode
  onClick: () => void
  variant?: "primary" | "secondary"
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const id = Date.now() + Math.random()
        setRipples((prev) => [...prev, { id, x, y }])
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id))
        }, 500)
        onClick()
      }}
      className={`relative overflow-hidden rounded-lg px-4 py-2 text-sm font-medium transition ${
        variant === "primary"
          ? "bg-[#F97316] text-white hover:bg-[#FB923C]"
          : "border border-slate-600 bg-[#0B1220] text-slate-200 hover:border-slate-500"
      }`}
    >
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{ left: r.x - 6, top: r.y - 6, width: 12, height: 12 }}
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}

function SeatedLegExtensionMotion({ isRunning }: { isRunning: boolean }) {
  const legCycle = isRunning ? [74, 58, 74] : 74
  const footCycle = isRunning ? [84, 64, 84] : 84

  return (
    <div className="relative flex h-[330px] w-full items-center justify-center rounded-2xl border border-slate-700/70 bg-gradient-to-b from-[#111B2F] via-[#0F172A] to-[#0B1220]">
      <motion.svg viewBox="0 0 300 220" className="h-[280px] w-[280px] text-[#F97316]">
        <rect x="44" y="140" width="72" height="10" rx="5" fill="currentColor" opacity="0.32" />
        <circle cx="150" cy="52" r="14" fill="currentColor" />
        <line x1="150" y1="66" x2="130" y2="106" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <line x1="130" y1="106" x2="108" y2="128" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <line x1="130" y1="106" x2="188" y2="106" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <line x1="108" y1="128" x2="108" y2="170" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <motion.line
          x1="130"
          y1="106"
          x2="212"
          animate={{ y2: legCycle }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <motion.circle
          cx="218"
          animate={{ cy: footCycle }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          r="6"
          fill="currentColor"
        />
      </motion.svg>

      <motion.div
        className="absolute right-8 top-8 text-xs text-[#FDBA74]"
        animate={isRunning ? { x: [0, 8, 0], opacity: [0.65, 1, 0.65] } : { x: 0, opacity: 0.85 }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        膝を伸ばす
      </motion.div>
      <motion.div
        className="absolute right-9 top-14 h-0.5 w-14 bg-[#F97316]"
        animate={isRunning ? { scaleX: [0.85, 1.15, 0.85] } : { scaleX: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-8 bottom-8 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 px-3 py-1 text-[11px] text-[#FDBA74]"
        animate={isRunning ? { boxShadow: ["0 0 0 rgba(249,115,22,0.1)", "0 0 26px rgba(249,115,22,0.45)", "0 0 0 rgba(249,115,22,0.1)"] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        背筋をキープ
      </motion.div>
    </div>
  )
}

export function ExercisePlayer({
  exercise = SAMPLE_SEATED_LEG_EXTENSION,
}: {
  exercise?: ExerciseDetailData
}) {
  const [isRunning, setIsRunning] = useState(false)
  const [showDetails, setShowDetails] = useState(true)
  const [remaining, setRemaining] = useState(exercise.durationSeconds)

  useEffect(() => {
    if (!isRunning || remaining <= 0) return
    const timer = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isRunning, remaining])

  useEffect(() => {
    if (remaining === 0) setIsRunning(false)
  }, [remaining])

  return (
    <section className="w-full rounded-2xl border border-slate-700 bg-[#0B1220] p-4 text-white shadow-[0_20px_60px_rgba(2,6,23,0.6)] md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F97316]">Premium Training</p>
          <h2 className="mt-1 text-2xl font-semibold">{exercise.name}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">{exercise.description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs">
          <Activity className="h-3.5 w-3.5 text-[#F97316]" />
          {difficultyLabel(exercise.difficulty)}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto]">
        <SeatedLegExtensionMotion isRunning={isRunning} />
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-[#0F172A] px-6 py-5">
          <CircularTimer remaining={remaining} total={exercise.durationSeconds} />
          <div className="flex items-center gap-2">
            <RippleButton
              label={isRunning ? "一時停止" : "開始"}
              icon={isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              onClick={() => setIsRunning((prev) => !prev)}
            />
            <RippleButton
              label="リセット"
              icon={<RotateCcw className="h-4 w-4" />}
              variant="secondary"
              onClick={() => {
                setIsRunning(false)
                setRemaining(exercise.durationSeconds)
              }}
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-300">
            <Timer className="h-3.5 w-3.5 text-[#F97316]" />
            {exercise.durationSeconds}秒
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-700 bg-[#0F172A]/70 p-3">
        <p className="text-xs font-medium text-slate-200">意識する部位（Glow Guide）</p>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {exercise.focusPoints.map((point) => (
            <motion.div
              key={point.id}
              className="rounded-lg border border-[#F97316]/25 bg-[#111B2F] p-2.5"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(249,115,22,0.0)",
                  "0 0 16px rgba(249,115,22,0.3)",
                  "0 0 0 rgba(249,115,22,0.0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs font-semibold text-[#FDBA74]">{point.label}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{point.cue}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-700 bg-[#0F172A]">
        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <Info className="h-4 w-4 text-[#F97316]" />
            トレーニング詳細
          </span>
          <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-slate-300" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-slate-700"
            >
              <div className="space-y-2 p-4 text-sm text-slate-300">
                {exercise.tips.map((tip) => (
                  <p key={tip} className="rounded-md bg-slate-900/60 px-3 py-2">
                    ・{tip}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
