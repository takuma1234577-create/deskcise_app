"use client"

import { TrainingMenu } from "@/components/TrainingMenu"

export function ExerciseScreen() {
  return (
    <section className="px-5 pb-24 pt-safe-top">
      <header className="py-4 animate-fade-in-up">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          EXERCISE
        </p>
        <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
          エクササイズ
        </h1>
        <p className="mt-1 text-xs text-muted-foreground/60">
          座ったままできるメニュー
        </p>
      </header>
      <div className="animate-fade-in-up">
        <TrainingMenu />
      </div>
    </section>
  )
}

export default ExerciseScreen
