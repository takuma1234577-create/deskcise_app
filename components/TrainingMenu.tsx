"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Dumbbell,
  Footprints,
  Hand,
  Move3d,
  PersonStanding,
  RotateCcw,
  StretchHorizontal,
  Sparkles,
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

type AnimationMode = "seated" | "standing" | "desk"

function resolveAnimationMode(menuId: string): AnimationMode {
  if (
    menuId === "seated-leg-extension" ||
    menuId === "seated-scapula-open" ||
    menuId === "neck-stretch" ||
    menuId === "seated-twist" ||
    menuId === "ankle-circles"
  ) {
    return "seated"
  }
  if (
    menuId === "standing-calf-raise" ||
    menuId === "knee-up" ||
    menuId === "arm-circle" ||
    menuId === "side-stretch" ||
    menuId === "standing-squat"
  ) {
    return "standing"
  }
  return "desk"
}

function TrainingAnimation({ menuId }: { menuId: string }) {
  const mode = resolveAnimationMode(menuId)

  return (
    <div className="relative h-32 w-32">
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        initial={{ opacity: 0.85, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <defs>
          <radialGradient id={`glow-${menuId}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="60" cy="104" rx="38" ry="10" fill="#0F172A" opacity="0.65" />
        <circle cx="60" cy="72" r="36" fill={`url(#glow-${menuId})`} />

        {mode !== "standing" && (
          <>
            <rect x="26" y="63" width="34" height="7" rx="3.5" fill="#F97316" opacity="0.7" />
            <rect x="50" y="56" width="8" height="37" rx="4" fill="#F97316" opacity="0.35" />
            <rect x="43" y="93" width="24" height="5" rx="2.5" fill="#F97316" opacity="0.35" />
          </>
        )}

        {mode === "desk" && (
          <>
            <rect x="18" y="44" width="36" height="6" rx="3" fill="#F97316" opacity="0.45" />
            <rect x="26" y="50" width="5" height="16" rx="2.5" fill="#F97316" opacity="0.35" />
          </>
        )}

        <circle cx={mode === "desk" ? 72 : 70} cy={mode === "standing" ? 25 : 27} r="8.5" fill="#F97316" />
        <rect
          x={mode === "desk" ? 60 : 58}
          y={mode === "standing" ? 34 : 36}
          width="14"
          height="30"
          rx="7"
          fill="#F97316"
        />

        {mode === "seated" && (
          <>
            <rect x="48" y="58" width="24" height="8" rx="4" fill="#F97316" />
            <motion.rect
              x="67"
              y="63"
              width="30"
              height="7"
              rx="3.5"
              fill="#F97316"
              animate={{ rotate: [-22, 6, -22], x: [0, -2, 0], y: [0, -2, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "67px 66px" }}
            />
            <rect x="46" y="65" width="8" height="27" rx="4" fill="#F97316" />
          </>
        )}

        {mode === "standing" && (
          <>
            <motion.rect
              x="52"
              y="62"
              width="8"
              height="30"
              rx="4"
              fill="#F97316"
              animate={{ y: [62, 58, 62] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect
              x="67"
              y="62"
              width="8"
              height="30"
              rx="4"
              fill="#F97316"
              animate={{ y: [58, 62, 58] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {mode === "desk" && (
          <>
            <motion.rect
              x="47"
              y="60"
              width="24"
              height="8"
              rx="4"
              fill="#F97316"
              animate={{ rotate: [-18, 8, -18], x: [0, -1, 0], y: [0, -2, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "47px 64px" }}
            />
            <rect x="43" y="66" width="8" height="26" rx="4" fill="#F97316" />
            <rect x="64" y="66" width="8" height="26" rx="4" fill="#F97316" />
          </>
        )}
      </motion.svg>

      <motion.div
        className="absolute left-5 top-5 text-[#FB923C]"
        animate={{ rotate: [-12, 12, -12], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M7 23C12 14 19 12 27 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M22 7L28 10L24 16" fill="currentColor" />
        </svg>
      </motion.div>
    </div>
  )
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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const items = useMemo(() => TRAINING_DATA[tab], [tab])

  useEffect(() => {
    setSelectedId(null)
  }, [tab])

  return (
    <section className="mt-6 w-full rounded-2xl border border-[#2E5FA2] bg-gradient-to-b from-[#1B3F76] to-[#173A6A] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.35)]">
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
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                {item.description}
              </p>
              <button
                type="button"
                onClick={() => setSelectedId((prev) => (prev === item.id ? null : item.id))}
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:text-[#FB923C]"
              >
                {selectedId === item.id ? (
                  <>
                    アニメーションを閉じる
                    <ChevronUp className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    アニメーションを見る
                    <ChevronDown className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              {selectedId === item.id && (
                <div className="relative mt-3 rounded-3xl border border-[#4D79B9] bg-gradient-to-b from-[#1A3F78] to-[#142F59] p-3">
                  <div className="flex items-center justify-center rounded-2xl border border-[#203F6A] bg-gradient-to-r from-[#111F39] via-[#10264A] to-[#111F39] py-3">
                    <TrainingAnimation menuId={item.id} />
                  </div>
                  <p className="mt-3 text-center text-[10px] text-white/60">
                    クリックで確認できるデモアニメーションです
                  </p>
                  <Sparkles className="absolute bottom-2 right-2 h-3.5 w-3.5 text-white/60" />
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
