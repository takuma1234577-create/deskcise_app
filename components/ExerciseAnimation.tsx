"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Pause, Play, Presentation } from "lucide-react"

export function ExerciseAnimation() {
  const totalSeconds = 60
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [meetingMode, setMeetingMode] = useState(false)
  const progress = (totalSeconds - timeLeft) / totalSeconds
  const circumference = 2 * Math.PI * 72

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

  const instructionLabel = useMemo(() => {
    if (meetingMode) {
      return "ミーティング中：運動を一時停止"
    }
    if (!isRunning) {
      return "開始前：姿勢を整える"
    }
    return timeLeft > totalSeconds / 2 ? "足を上げる" : "足を上げてキープ"
  }, [meetingMode, isRunning, timeLeft])

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#122C52] to-[#0F172A] p-4">
      <h3 className="text-sm font-semibold text-white">Step Up On Chair</h3>
      <p className="mt-1 text-xs text-white/70">静止画ガイド + インジケーターでフォーム確認</p>

      <div className="mt-3 rounded-2xl border border-[#355E93] bg-[#0D1E38] p-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-[#2B4C78] bg-[#0B172D]">
            <div className="px-3 py-2 text-[11px] font-semibold text-[#FDBA74]">開始フォーム</div>
            <div className="relative h-44 w-full">
              <Image
                src="/placeholder-user.jpg"
                alt="開始フォーム"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#2B4C78] bg-[#0B172D]">
            <div className="px-3 py-2 text-[11px] font-semibold text-[#FDBA74]">終了フォーム</div>
            <div className="relative h-44 w-full">
              <Image
                src="/placeholder.jpg"
                alt="終了フォーム"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <span className="rounded-full border border-[#F97316]/60 bg-[#F97316]/15 px-4 py-1 text-sm font-semibold text-[#FDBA74]">
          {instructionLabel}
        </span>
        <div className="relative mt-3 flex h-44 w-44 items-center justify-center">
          <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
            <circle cx="90" cy="90" r="72" fill="none" stroke="#233A5F" strokeWidth="10" />
            <circle
              cx="90"
              cy="90"
              r="72"
              fill="none"
              stroke="#F97316"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              style={{ filter: "drop-shadow(0 0 10px rgba(249,115,22,0.45))" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <p className="text-5xl font-bold tabular-nums text-white">{timeLeft}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIsRunning((prev) => !prev)}
          disabled={meetingMode || timeLeft === 0}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FB923C] disabled:opacity-50"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? "一時停止" : "開始"}
        </button>
        <button
          type="button"
          onClick={() => {
            setTimeLeft(totalSeconds)
            setIsRunning(false)
            setMeetingMode(false)
          }}
          className="rounded-lg border border-[#3C6397] bg-[#122A4A] px-4 py-2 text-sm font-medium text-white/85"
        >
          リセット
        </button>
        <button
          type="button"
          onClick={() => {
            setMeetingMode((prev) => !prev)
            setIsRunning(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#F97316]/60 bg-[#F97316]/15 px-4 py-2 text-sm font-semibold text-[#FDBA74]"
        >
          <Presentation className="h-4 w-4" />
          ミーティングモード
        </button>
      </div>

      {meetingMode && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#020617]/80 backdrop-blur-[1px]">
          <div className="text-center">
            <p className="text-4xl font-black tracking-[0.18em] text-white/95">PAUSED</p>
            <p className="mt-2 text-sm font-semibold tracking-[0.28em] text-[#FDBA74]">
              MEETING MODE
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ExerciseAnimation
