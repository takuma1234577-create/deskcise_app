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
  imageSrc: string
  icon: LucideIcon
  targetMuscles?: string
  effect?: string
  equipment?: string
}

const TRAINING_DATA: Record<TrainingCategory, TrainingItem[]> = {
  seated: [
    {
      id: "seated-leg-extension",
      name: "シーテッド・レッグエクステンション",
      description: "椅子に座ったまま片足ずつゆっくり伸ばして下ろします。",
      duration: "30秒",
      imageSrc: "/images/seated-leg-extension.png",
      icon: Footprints,
    },
    {
      id: "seated-scapula-open",
      name: "座ったまま肩甲骨剥がし",
      description: "胸を開き、肩甲骨を寄せて上半身の固まりをほぐします。",
      duration: "30秒",
      imageSrc: "/images/seated-scapula-open.png",
      icon: StretchHorizontal,
    },
    {
      id: "neck-stretch",
      name: "首のストレッチ",
      description: "首を左右・前後にゆっくり倒して首周りの緊張を緩めます。",
      duration: "30秒",
      imageSrc: "/images/neck-stretch.png",
      icon: RotateCcw,
    },
    {
      id: "seated-twist",
      name: "座ったままツイスト",
      description: "上体を左右へひねり、腰まわりの可動域を回復します。",
      duration: "30秒",
      imageSrc: "/images/seated-twist.png",
      icon: Move3d,
    },
    {
      id: "ankle-raises",
      name: "足首上げ下げ",
      description:
        "椅子に座り、かかとを床につけたまま、つま先をできるだけ高く持ち上げます。15秒キープしてゆっくり下ろしましょう。",
      duration: "15秒キープ × 2セット",
      imageSrc: "/images/ankle-raises.png",
      icon: CircleDot,
      targetMuscles: "ヒラメ筋（ふくらはぎ下部）、前脛骨筋（すね）",
      effect: "足首の柔軟性向上、むくみ解消",
    },
    {
      id: "seated-glute-knee-hug",
      name: "お尻のストレッチ（膝抱え）",
      description:
        "片膝を両手で抱え、胸に引き寄せます。お尻が伸びるのを感じて20秒キープ。",
      duration: "20秒キープ × 左右1セット",
      imageSrc: "/images/seated-glute-knee-hug.png",
      icon: Footprints,
      effect: "腰痛予防、ヒップアップ",
    },
    {
      id: "single-leg-lift-isometric",
      name: "片足リフト（アイソメトリクス）",
      description:
        "片足を床から少しだけ浮かせ、太ももを固くして10秒間耐えます。反対の足も同様に行いましょう。",
      duration: "10秒キープ × 左右2セット",
      imageSrc: "/images/seated-single-leg-lift-isometric.png",
      icon: CircleDot,
      targetMuscles: "大腿四頭筋（太もも前）",
      effect: "筋力維持、足のむくみ対策",
    },
    {
      id: "seated-adduction",
      name: "内もも引き締め（アダクション）",
      description:
        "両方の膝を強く閉じ、押し付け合います。内ももに力を入れて10秒間キープしましょう。",
      duration: "10秒キープ × 3セット",
      imageSrc: "/images/seated-adduction.png",
      icon: CircleDot,
      targetMuscles: "内転筋群（内もも）",
      effect: "O脚予防、足のラインを整える、骨盤の安定",
      equipment: "なし（自重のみ）",
    },
  ],
  standing: [
    {
      id: "standing-calf-raise",
      name: "スタンディング・カーフレイズ",
      description: "かかとを上げ下げしてふくらはぎのポンプを活性化します。",
      duration: "30秒",
      imageSrc: "/images/standing-calf-raise.jpg",
      icon: PersonStanding,
    },
    {
      id: "knee-up",
      name: "その場足踏み（ニーアップ）",
      description: "膝をやや高めに上げて心拍と血流を穏やかに上げます。",
      duration: "30秒",
      imageSrc: "/images/knee-up.jpg",
      icon: ArrowUpDown,
    },
    {
      id: "arm-circle",
      name: "アームサークル",
      description: "腕を大きく回して肩周りの可動域を回復します。",
      duration: "30秒",
      imageSrc: "/images/arm-circle.jpg",
      icon: RotateCcw,
    },
    {
      id: "side-stretch",
      name: "サイドストレッチ",
      description: "左右の脇腹を伸ばして体幹をリセットします。",
      duration: "30秒",
      imageSrc: "/images/side-stretch.jpg",
      icon: StretchHorizontal,
    },
    {
      id: "standing-squat",
      name: "スタンディング・スクワット",
      description: "浅めのスクワットで下半身を使い血流を高めます。",
      duration: "30秒",
      imageSrc: "/images/standing-squat.jpg",
      icon: Dumbbell,
    },
  ],
  space: [
    {
      id: "desk-pushup",
      name: "デスク・プッシュアップ",
      description: "机に手をついて角度をつけた腕立てを行います。",
      duration: "30秒",
      imageSrc: "/images/desk-pushup.jpg",
      icon: Hand,
    },
    {
      id: "desk-triceps-dips",
      name: "デスク・トライセプスディップス",
      description: "机の端を使い二の腕中心に体を上下させます。",
      duration: "30秒",
      imageSrc: "/images/desk-triceps-dips.jpg",
      icon: Dumbbell,
    },
    {
      id: "under-desk-lunge",
      name: "デスク下ランジ",
      description: "机下スペースを使って前後ランジを行います。",
      duration: "30秒",
      imageSrc: "/images/under-desk-lunge.jpg",
      icon: Footprints,
    },
    {
      id: "desk-chest-stretch",
      name: "デスク・チェストストレッチ",
      description: "机に手をついて胸を開き、呼吸を深く整えます。",
      duration: "30秒",
      imageSrc: "/images/desk-chest-stretch.jpg",
      icon: Table2,
    },
    {
      id: "desk-walk",
      name: "デスク周りウォーキング",
      description: "机の周囲を軽く歩いて全身循環をリセットします。",
      duration: "30秒",
      imageSrc: "/images/desk-walk.jpg",
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
    <section className="mt-6 w-full rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#1B3F76] to-[#173A6A] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.35)]">
      <h3 className="text-sm font-semibold text-white">トレーニングメニュー</h3>
      <p className="mt-1 text-xs text-white/70">静止画と説明でメニューを確認</p>

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
              className="rounded-2xl border border-[#3E6FB1] bg-gradient-to-b from-[#203F73] to-[#1A3A6A] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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

              <div className="mt-2 overflow-hidden rounded-xl border border-[#305C90] bg-[#10213A]">
                <img
                  src={item.imageSrc}
                  alt={`${item.name} の静止画`}
                  className="h-40 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>

              <p className="mt-2 text-xs leading-relaxed text-white/75">
                {item.description}
              </p>
              {item.targetMuscles && (
                <p className="mt-1 text-[11px] text-[#FDBA74]">
                  ターゲット筋肉: {item.targetMuscles}
                </p>
              )}
              {item.effect && (
                <p className="mt-1 text-[11px] text-white/70">
                  効果: {item.effect}
                </p>
              )}
              {item.equipment && (
                <p className="mt-1 text-[11px] text-white/65">
                  道具: {item.equipment}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
