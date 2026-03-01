"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Pause, Play, Presentation, RotateCcw } from "lucide-react"

type ExerciseStatus = "training" | "resting" | "meeting"

interface ExerciseStaticViewProps {
  totalSeconds?: number
  startPoseSrc?: string
  endPoseSrc?: string
}

export function ExerciseStaticView({
  totalSeconds = 60,
  startPoseSrc = "/images/start-pose.jpg",
  endPoseSrc = "/images/end-pose.jpg",
}: ExerciseStaticViewProps) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [meetingMode, setMeetingMode] = useState(false)
  const [startSrc, setStartSrc] = useState(startPoseSrc)
  const [endSrc, setEndSrc] = useState(endPoseSrc)

  useEffect(() => {
    setStartSrc(startPoseSrc)
  }, [startPoseSrc])

  useEffect(() => {
    setEndSrc(endPoseSrc)
  }, [endPoseSrc])

  useEffect(() => {
    if (!isRunning || meetingMode) {
      return
    }
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [isRunning, meetingMode])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
    }
  }, [timeLeft])

  const status: ExerciseStatus = useMemo(() => {
    if (meetingMode) return "meeting"
    if (isRunning) return "training"
    return "resting"
  }, [isRunning, meetingMode])

  const statusMeta = useMemo(() => {
    if (status === "meeting") {
      return {
        label: "ミーティングモード（一時停止）",
        className: "bg-[#3A1E1E] text-[#FDBA74] border-[#7A3F3F]",
      }
    }
    if (status === "training") {
      return {
        label: "運動中",
        className: "bg-[#1D3F2C] text-[#86EFAC] border-[#2C7A54]",
      }
    }
    return {
      label: "休憩中",
      className: "bg-[#1E3355] text-[#BFDBFE] border-[#3C6397]",
    }
  }, [status])

  const progress = (totalSeconds - timeLeft) / totalSeconds
  const radius = 86
  const circumference = 2 * Math.PI * radius

  return (
    <section className="w-full rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#122C52] to-[#0F172A] p-4">
      <header className={`rounded-xl border px-3 py-2 ${statusMeta.className}`}>
        <p className="text-base font-bold tracking-wide">{statusMeta.label}</p>
      </header>

      <div className="relative mt-4 rounded-2xl border border-[#355E93] bg-[#0D1E38] p-3">
        <div
          className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 transition ${
            meetingMode ? "blur-[2px]" : ""
          }`}
        >
          <div className="relative h-48 overflow-hidden rounded-xl border border-[#2A4B77] bg-[#0B172D]">
            <Image
              src={startSrc}
              alt="開始ポーズ"
              fill
              className="object-cover"
              onError={() => setStartSrc("/placeholder.svg")}
            />
          </div>
          <ArrowRight className="h-7 w-7 text-[#F97316]" />
          <div className="relative h-48 overflow-hidden rounded-xl border border-[#2A4B77] bg-[#0B172D]">
            <Image
              src={endSrc}
              alt="終了ポーズ"
              fill
              className="object-cover"
              onError={() => setEndSrc("/placeholder.svg")}
            />
          </div>
        </div>

        {meetingMode && (
          <div className="absolute inset-0 grid place-items-center bg-[#020617]/70">
            <div className="text-center">
              <p className="text-4xl font-black tracking-[0.18em] text-white">PAUSED</p>
              <p className="mt-1 text-sm font-semibold tracking-[0.25em] text-[#FDBA74]">
                MEETING
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center">
        <div className="relative h-52 w-52">
          <svg viewBox="0 0 220 220" className="-rotate-90">
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#223A5F" strokeWidth="12" />
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#F97316"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              style={{ filter: "drop-shadow(0 0 10px rgba(249,115,22,0.5))" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <p className="text-6xl font-bold tabular-nums text-white">{timeLeft}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIsRunning((prev) => !prev)}
          disabled={meetingMode || timeLeft === 0}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FB923C] disabled:opacity-50"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? "停止" : "開始"}
        </button>
        <button
          type="button"
          onClick={() => {
            setTimeLeft(totalSeconds)
            setIsRunning(false)
            setMeetingMode(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#3C6397] bg-[#122A4A] px-4 py-2 text-sm font-medium text-white/90"
        >
          <RotateCcw className="h-4 w-4" />
          リセット
        </button>
        <button
          type="button"
          onClick={() => {
            setMeetingMode((prev) => !prev)
            setIsRunning(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#F97316]/60 bg-[#F97316]/10 px-4 py-2 text-sm font-semibold text-[#FDBA74]"
        >
          <Presentation className="h-4 w-4" />
          ミーティング
        </button>
      </div>
    </section>
  )
}

export default ExerciseStaticView
