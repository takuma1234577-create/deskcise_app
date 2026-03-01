"use client"

import { useMemo } from "react"
import {
  CircleDot,
  Footprints,
  Move3d,
  RotateCcw,
  StretchHorizontal,
  Timer,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

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

const SEATED_TRAINING_DATA: TrainingItem[] = [
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
]

export function TrainingMenu() {
  const items = useMemo(() => SEATED_TRAINING_DATA, [])

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex rounded-full bg-orange/10 px-3 py-1.5 text-[10px] font-medium text-orange">
          座ったまま
        </span>
        <span className="text-[10px] text-muted-foreground/50">
          {items.length}種目
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.id}
              className="glass-card rounded-2xl p-4 transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Timer className="h-3 w-3 text-muted-foreground/50" />
                      <span className="text-[10px] text-muted-foreground/70">{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl bg-muted/20">
                <img
                  src={item.imageSrc}
                  alt={`${item.name} の静止画`}
                  className="h-36 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                {item.description}
              </p>
              
              {(item.targetMuscles || item.effect) && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                  {item.targetMuscles && (
                    <p className="text-[10px] text-orange/80">
                      <span className="text-muted-foreground/50">ターゲット:</span> {item.targetMuscles}
                    </p>
                  )}
                  {item.effect && (
                    <p className="text-[10px] text-muted-foreground/70">
                      <span className="text-muted-foreground/50">効果:</span> {item.effect}
                    </p>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
