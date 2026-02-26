"use client"

import { Sparkles, Target, Timer } from "lucide-react"
import { LottiePlayer } from "@/components/LottiePlayer"

export function StepUpOnChairContent() {
  return (
    <section className="mt-6 w-full rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#173A6A] to-[#112C52] p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">プレミアムフォームガイド</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#0F172A] px-2 py-1 text-[10px] text-[#FDBA74]">
          <Sparkles className="h-3 w-3" />
          Lottie
        </span>
      </div>
      <p className="mt-1 text-xs text-white/70">
        Step Up On Chair の正確なフォームを、滑らかなモーションで確認できます。
      </p>

      <div className="mt-3">
        <LottiePlayer exerciseId="step-up-on-chair" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-[#355C8F] bg-[#122845] p-2.5">
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-[#FDBA74]">
            <Target className="h-3.5 w-3.5" />
            意識ポイント
          </p>
          <ul className="mt-1 space-y-1 text-[11px] text-white/75">
            <li>背筋を伸ばしたまま、膝とつま先の向きを揃える</li>
            <li>踏み込む足裏全体で体重を支える</li>
          </ul>
        </div>
        <div className="rounded-lg border border-[#355C8F] bg-[#122845] p-2.5">
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-[#FDBA74]">
            <Timer className="h-3.5 w-3.5" />
            推奨時間
          </p>
          <ul className="mt-1 space-y-1 text-[11px] text-white/75">
            <li>30秒 × 2セット（左右交互）</li>
            <li>呼吸を止めず、一定テンポで実施</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default StepUpOnChairContent
