"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { Loader2, Pause, Play } from "lucide-react"

const LOTTIE_FILE_PATH = "/animations/Step Up On Chair.json"

export function ExerciseAnimation() {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const encodedPath = useMemo(() => encodeURI(LOTTIE_FILE_PATH), [])

  useEffect(() => {
    const controller = new AbortController()

    const loadAnimation = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)
        const response = await fetch(encodedPath, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        if (!response.ok) {
          throw new Error("Lottieファイルが見つかりません")
        }
        const json = (await response.json()) as object
        setAnimationData(json)
      } catch (error) {
        if (controller.signal.aborted) return
        setLoadError(error instanceof Error ? error.message : "読み込みに失敗しました")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadAnimation()
    return () => controller.abort()
  }, [encodedPath])

  useEffect(() => {
    if (!animationData) return
    if (isPlaying) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.pause()
    }
  }, [isPlaying, animationData])

  return (
    <section className="w-full rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#122C52] to-[#0F172A] p-4">
      <h3 className="text-sm font-semibold text-white">Step Up On Chair</h3>
      <p className="mt-1 text-xs text-white/70">運動開始ボタンと連動して再生/停止できます</p>

      <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#355E93] bg-[#0D1E38] p-2">
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(249,115,22,0.45),0_0_20px_rgba(249,115,22,0.22)]" />
        <div className="relative flex h-[340px] w-full items-center justify-center rounded-xl bg-[#0B172D]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-[#F97316]">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-xs text-white/70">アニメーションを読み込み中...</p>
            </div>
          ) : loadError ? (
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-[#FDBA74]">読み込みエラー</p>
              <p className="mt-1 text-xs text-white/70">{loadError}</p>
            </div>
          ) : (
            animationData && (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop
                autoplay={false}
                rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                className="h-full w-full"
              />
            )
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsPlaying((prev) => !prev)}
        disabled={isLoading || !!loadError || !animationData}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FB923C] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isPlaying ? "停止" : "運動開始"}
      </button>
    </section>
  )
}

export default ExerciseAnimation
