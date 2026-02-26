"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  CircleDot,
  Dumbbell,
  Footprints,
  Hand,
  Move3d,
  PersonStanding,
  RotateCcw,
  StretchHorizontal,
  Table2,
  Timer,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type TrainingCategory = "seated" | "standing" | "space"

interface TrainingItem {
  id: string
  name: string
  description: string
  duration: string
  icon: LucideIcon
}

const TRAINING_DATA: Record<TrainingCategory, TrainingItem[]> = {
  seated: [
    {
      id: "seated-leg-extension",
      name: "シーテッド・レッグエクステンション",
      description: "椅子に座ったまま片足ずつゆっくり伸ばして下ろします。",
      duration: "30秒",
      icon: Footprints,
    },
    {
      id: "seated-scapula-open",
      name: "座ったまま肩甲骨剥がし",
      description: "胸を開き、肩甲骨を寄せて上半身の固まりをほぐします。",
      duration: "30秒",
      icon: StretchHorizontal,
    },
    {
      id: "neck-stretch",
      name: "首のストレッチ",
      description: "首を左右・前後にゆっくり倒して首周りの緊張を緩めます。",
      duration: "30秒",
      icon: RotateCcw,
    },
    {
      id: "seated-twist",
      name: "座ったままツイスト",
      description: "上体を左右へひねり、腰まわりの可動域を回復します。",
      duration: "30秒",
      icon: Move3d,
    },
    {
      id: "ankle-circles",
      name: "足首グルグル回し",
      description: "足首を内外に回して末端の血流を促進します。",
      duration: "30秒",
      icon: CircleDot,
    },
  ],
  standing: [
    {
      id: "standing-calf-raise",
      name: "スタンディング・カーフレイズ",
      description: "かかとを上げ下げしてふくらはぎのポンプを活性化します。",
      duration: "30秒",
      icon: PersonStanding,
    },
    {
      id: "knee-up",
      name: "その場足踏み（ニーアップ）",
      description: "膝をやや高めに上げて心拍と血流を穏やかに上げます。",
      duration: "30秒",
      icon: ArrowUpDown,
    },
    {
      id: "arm-circle",
      name: "アームサークル",
      description: "腕を大きく回して肩周りの可動域を回復します。",
      duration: "30秒",
      icon: RotateCcw,
    },
    {
      id: "side-stretch",
      name: "サイドストレッチ",
      description: "左右の脇腹を伸ばして体幹をリセットします。",
      duration: "30秒",
      icon: StretchHorizontal,
    },
    {
      id: "standing-squat",
      name: "スタンディング・スクワット",
      description: "浅めのスクワットで下半身を使い血流を高めます。",
      duration: "30秒",
      icon: Dumbbell,
    },
  ],
  space: [
    {
      id: "desk-pushup",
      name: "デスク・プッシュアップ",
      description: "机に手をついて角度をつけた腕立てを行います。",
      duration: "30秒",
      icon: Hand,
    },
    {
      id: "desk-triceps-dips",
      name: "デスク・トライセプスディップス",
      description: "机の端を使い二の腕中心に体を上下させます。",
      duration: "30秒",
      icon: Dumbbell,
    },
    {
      id: "under-desk-lunge",
      name: "デスク下ランジ",
      description: "机下スペースを使って前後ランジを行います。",
      duration: "30秒",
      icon: Footprints,
    },
    {
      id: "desk-chest-stretch",
      name: "デスク・チェストストレッチ",
      description: "机に手をついて胸を開き、呼吸を深く整えます。",
      duration: "30秒",
      icon: Table2,
    },
    {
      id: "desk-walk",
      name: "デスク周りウォーキング",
      description: "机の周囲を軽く歩いて全身循環をリセットします。",
      duration: "30秒",
      icon: Footprints,
    },
  ],
}

const TAB_LABELS: Record<TrainingCategory, string> = {
  seated: "座ったまま",
  standing: "立ち",
  space: "デスク活用",
}

export function TrainingMenu() {
  const [tab, setTab] = useState<TrainingCategory>("seated")
  const items = useMemo(() => TRAINING_DATA[tab], [tab])

  return (
    <section className="mt-6 w-full rounded-xl border border-[#1E3A66] bg-[#10284A] p-4">
      <h3 className="text-sm font-semibold text-white">トレーニングメニュー</h3>
      <p className="mt-1 text-xs text-white/70">今の姿勢と環境に合わせて選択</p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {(Object.keys(TAB_LABELS) as TrainingCategory[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
              tab === key
                ? "bg-[#F97316] text-white"
                : "bg-[#1B3B69] text-white/75 hover:text-white"
            }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.id}
              className="rounded-lg border border-[#2D568F] bg-[#173A6A] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#F97316]" />
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0F172A] px-2 py-1 text-[10px] text-white/80">
                  <Timer className="h-3 w-3 text-[#F97316]" />
                  {item.duration}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
