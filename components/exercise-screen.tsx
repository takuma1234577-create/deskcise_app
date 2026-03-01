"use client"

import { TrainingMenu } from "@/components/TrainingMenu"

export function ExerciseScreen() {
  return (
    <section className="px-4 pb-24">
      <div className="py-4">
        <h1 className="text-lg font-semibold text-foreground">エクササイズ</h1>
        <p className="text-xs text-muted-foreground">座ったままできるメニュー</p>
      </div>
      <TrainingMenu />
    </section>
  )
}

export default ExerciseScreen
