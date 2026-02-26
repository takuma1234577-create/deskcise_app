"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { Loader2, Pause, Play } from "lucide-react"

interface LottiePlayerProps {
  exerciseId: string
  isPlaying?: boolean
  onPlayingChange?: (next: boolean) => void
  loop?: boolean
  className?: string
}

function AnimationContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#122C52] to-[#0F172A] p-3 ${className ?? ""}`}
    >
      <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-xl border border-[#274A78] bg-[#0D1E38]">
        {children}
      </div>
    </div>
  )
}

export function LottiePlayer({
  exerciseId,
  isPlaying,
  onPlayingChange,
  loop = true,
  className,
}: LottiePlayerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [internalPlaying, setInternalPlaying] = useState(true)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const playing = isPlaying ?? internalPlaying
  const srcPath = useMemo(() => `/animations/${exerciseId}.json`, [exerciseId])

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        setAnimationData(null)
        const response = await fetch(srcPath, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        if (!response.ok) {
          throw new Error(`Animation not found: ${srcPath}`)
        }
        const json = (await response.json()) as object
        setAnimationData(json)
      } catch (err) {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : "アニメーションの読み込みに失敗しました"
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }
    void load()
    return () => controller.abort()
  }, [srcPath])

  useEffect(() => {
    if (!animationData) return
    if (playing) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.pause()
    }
  }, [playing, animationData])

  const setPlaying = (next: boolean) => {
    if (isPlaying === undefined) {
      setInternalPlaying(next)
    }
    onPlayingChange?.(next)
  }

  return (
    <AnimationContainer className={className}>
      {loading ? (
        <div className="flex flex-col items-center gap-2 text-[#F97316]">
          <Loader2 className="h-7 w-7 animate-spin" />
          <p className="text-xs text-white/70">アニメーションを読み込み中...</p>
        </div>
      ) : error ? (
        <div className="px-4 text-center">
          <p className="text-sm text-[#FDBA74]">読み込みエラー</p>
          <p className="mt-1 text-xs text-white/70">{error}</p>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col">
          {animationData && (
            <div className="flex-1">
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={loop}
                autoplay={playing}
                rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                className="h-full w-full"
              />
            </div>
          )}
          <div className="flex justify-center border-t border-[#274A78] bg-[#0F172A]/70 p-3">
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F97316] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#FB923C]"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "一時停止" : "再生"}
            </button>
          </div>
        </div>
      )}
    </AnimationContainer>
  )
}

export default LottiePlayer
