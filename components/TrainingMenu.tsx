"use client"

import { useEffect, useMemo, useState } from "react"
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

function TrainingAnimation({ menuId }: { menuId: string }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => setFrame((prev) => (prev + 1) % 2), 650)
    return () => window.clearInterval(interval)
  }, [])

  const isAlt = frame === 1

  const svgClass = "h-28 w-28 text-[#F97316]"
  const stroke = "currentColor"
  const strokeWidth = 3

  switch (menuId) {
    case "seated-leg-extension":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="52" cy="22" r="7" fill="currentColor" />
          <rect x="20" y="54" width="28" height="4" fill="currentColor" opacity="0.45" />
          <line x1="52" y1="29" x2="42" y2="49" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="42" y1="49" x2="34" y2="56" stroke={stroke} strokeWidth={strokeWidth} />
          <line
            x1="42"
            y1="49"
            x2={isAlt ? "70" : "60"}
            y2={isAlt ? "60" : "68"}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line x1="34" y1="56" x2="34" y2="80" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "seated-scapula-open":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy="20" r="8" fill="currentColor" />
          <line x1="50" y1="28" x2="50" y2="64" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2={isAlt ? "24" : "34"} y2="36" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2={isAlt ? "76" : "66"} y2="36" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="64" x2="36" y2="88" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="64" x2="64" y2="88" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "neck-stretch":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx={isAlt ? "46" : "54"} cy="22" r="8" fill="currentColor" />
          <line x1="50" y1="30" x2="50" y2="66" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="32" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="68" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="66" x2="38" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="66" x2="62" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "seated-twist":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy="22" r="7" fill="currentColor" />
          <rect x="20" y="56" width="30" height="4" fill="currentColor" opacity="0.45" />
          <line x1="50" y1="30" x2={isAlt ? "58" : "42"} y2="52" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "58" : "42"} y1="52" x2={isAlt ? "72" : "28"} y2="52" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "58" : "42"} y1="52" x2="50" y2="74" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="74" x2="38" y2="92" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="74" x2="62" y2="92" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "ankle-circles":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="52" cy="22" r="7" fill="currentColor" />
          <rect x="20" y="56" width="28" height="4" fill="currentColor" opacity="0.45" />
          <line x1="52" y1="30" x2="42" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="42" y1="50" x2="34" y2="56" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="42" y1="50" x2="66" y2="66" stroke={stroke} strokeWidth={strokeWidth} />
          <circle
            cx={isAlt ? "74" : "68"}
            cy={isAlt ? "66" : "72"}
            r="5"
            stroke={stroke}
            strokeWidth="2"
            fill="none"
            opacity="0.9"
          />
        </svg>
      )
    case "standing-calf-raise":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy={isAlt ? "16" : "20"} r="9" fill="currentColor" />
          <line x1="50" y1={isAlt ? "25" : "29"} x2="50" y2={isAlt ? "64" : "68"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="34" y2="52" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="66" y2="52" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "64" : "68"} x2="40" y2={isAlt ? "88" : "94"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "64" : "68"} x2="60" y2={isAlt ? "88" : "94"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "knee-up":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy="18" r="8" fill="currentColor" />
          <line x1="50" y1="26" x2="50" y2="62" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="40" x2="34" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="40" x2="66" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="62" x2={isAlt ? "38" : "44"} y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="62" x2={isAlt ? "70" : "58"} y2={isAlt ? "74" : "92"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "arm-circle":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy="20" r="8" fill="currentColor" />
          <line x1="50" y1="28" x2="50" y2="66" stroke={stroke} strokeWidth={strokeWidth} />
          <path
            d={isAlt ? "M33 45 C 22 36, 24 26, 34 20" : "M33 45 C 22 56, 24 66, 34 72"}
            stroke={stroke}
            strokeWidth="3"
            fill="none"
          />
          <path
            d={isAlt ? "M67 45 C 78 56, 76 66, 66 72" : "M67 45 C 78 36, 76 26, 66 20"}
            stroke={stroke}
            strokeWidth="3"
            fill="none"
          />
          <line x1="50" y1="66" x2="38" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="66" x2="62" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "side-stretch":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy="20" r="8" fill="currentColor" />
          <line x1="50" y1="28" x2={isAlt ? "44" : "56"} y2="66" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2={isAlt ? "26" : "74"} y2="30" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2={isAlt ? "70" : "30"} y2="56" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "44" : "56"} y1="66" x2="38" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "44" : "56"} y1="66" x2="62" y2="90" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "standing-squat":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx="50" cy={isAlt ? "24" : "20"} r="8" fill="currentColor" />
          <line x1="50" y1={isAlt ? "32" : "28"} x2="50" y2={isAlt ? "66" : "56"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="32" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="42" x2="68" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "66" : "56"} x2="34" y2={isAlt ? "88" : "92"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "66" : "56"} x2="66" y2={isAlt ? "88" : "92"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "desk-pushup":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <line x1="18" y1="78" x2="84" y2="78" stroke={stroke} strokeWidth="2" opacity="0.45" />
          <circle cx="62" cy={isAlt ? "24" : "28"} r="7" fill="currentColor" />
          <line x1="62" y1="32" x2={isAlt ? "48" : "52"} y2="58" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "48" : "52"} y1="58" x2={isAlt ? "28" : "36"} y2="58" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "28" : "36"} y1="58" x2={isAlt ? "28" : "36"} y2="78" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "34" : "42"} y1="58" x2={isAlt ? "34" : "42"} y2="78" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "desk-triceps-dips":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <rect x="18" y="48" width="38" height="4" fill="currentColor" opacity="0.45" />
          <circle cx={isAlt ? "58" : "54"} cy={isAlt ? "34" : "28"} r="7" fill="currentColor" />
          <line x1={isAlt ? "58" : "54"} y1={isAlt ? "42" : "36"} x2="50" y2={isAlt ? "62" : "54"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "62" : "54"} x2="34" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1={isAlt ? "62" : "54"} x2="62" y2={isAlt ? "84" : "76"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="62" y1={isAlt ? "84" : "76"} x2="72" y2="94" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "under-desk-lunge":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <rect x="16" y="34" width="68" height="4" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="22" r="7" fill="currentColor" />
          <line x1="50" y1="30" x2="50" y2="60" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="44" x2="34" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="44" x2="66" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="60" x2={isAlt ? "30" : "40"} y2={isAlt ? "84" : "92"} stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="50" y1="60" x2={isAlt ? "76" : "68"} y2={isAlt ? "92" : "84"} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "desk-chest-stretch":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <rect x="18" y="56" width="36" height="4" fill="currentColor" opacity="0.45" />
          <circle cx="64" cy="22" r="7" fill="currentColor" />
          <line x1="64" y1="30" x2={isAlt ? "54" : "58"} y2="58" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "54" : "58"} y1="58" x2="46" y2="58" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "54" : "58"} y1="58" x2={isAlt ? "66" : "62"} y2="84" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "66" : "62"} y1="84" x2="74" y2="96" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      )
    case "desk-walk":
      return (
        <svg viewBox="0 0 100 120" className={svgClass}>
          <circle cx={isAlt ? "56" : "44"} cy="20" r="8" fill="currentColor" />
          <line x1={isAlt ? "56" : "44"} y1="28" x2={isAlt ? "56" : "44"} y2="62" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "56" : "44"} y1="40" x2={isAlt ? "42" : "58"} y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "56" : "44"} y1="40" x2={isAlt ? "70" : "30"} y2="50" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "56" : "44"} y1="62" x2={isAlt ? "42" : "58"} y2="92" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={isAlt ? "56" : "44"} y1="62" x2={isAlt ? "70" : "30"} y2="80" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1="18" y1="96" x2="82" y2="96" stroke={stroke} strokeWidth="2" opacity="0.35" />
        </svg>
      )
    default:
      return null
  }
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
              <button
                type="button"
                onClick={() => setSelectedId((prev) => (prev === item.id ? null : item.id))}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#F97316] hover:text-[#FB923C]"
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
                <div className="mt-2 rounded-md border border-[#335D93] bg-[#0F2747] p-2">
                  <div className="flex items-center justify-center rounded-md bg-[#10213A] py-2">
                    <TrainingAnimation menuId={item.id} />
                  </div>
                  <p className="mt-2 text-center text-[10px] text-white/60">
                    クリックで確認できるデモアニメーションです
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
