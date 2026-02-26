"use client"

interface TrialOfferScreenProps {
  onStartTrial: () => void
  onSkip: () => void
}

export function TrialOfferScreen({ onStartTrial, onSkip }: TrialOfferScreenProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <section className="w-full rounded-2xl border border-orange/30 bg-secondary p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange">
          DEKCIZE 22
        </p>
        <h1 className="mt-2 text-xl font-bold text-foreground">
          14日間のプロ版を開始しますか？
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          今のままだと、1分の休憩で買い戻せるのは「+9分」まで。プロ版なら同じ1分で
          「+22分」まで回復し、毎日の集中後のダメージをより短時間で打ち消せます。
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/20 p-3">
          <div className="rounded-lg border border-border/60 bg-secondary/60 p-2">
            <p className="text-[10px] text-muted-foreground">無料版</p>
            <p className="mt-1 text-sm font-semibold text-foreground">+9分 / 1分休憩</p>
            <p className="mt-1 text-[10px] text-muted-foreground">座りメニューのみ</p>
          </div>
          <div className="rounded-lg border border-orange/40 bg-orange-muted/20 p-2">
            <p className="text-[10px] text-orange">プロ版</p>
            <p className="mt-1 text-sm font-semibold text-foreground">+22分 / 1分休憩</p>
            <p className="mt-1 text-[10px] text-muted-foreground">立ちメニュー + 詳細レポート</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border/70 bg-background/10 p-3">
          <p className="text-xs font-semibold text-foreground">プロ版で変わること</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>・同じ休憩時間でも、寿命リカバリー効率が約2.4倍</li>
            <li>・デスク環境に合わせた立ちメニューで実行しやすい</li>
            <li>・詳細レポートで、積み上げ成果を可視化して継続しやすい</li>
          </ul>
        </div>

        <p className="mt-3 text-[11px] text-orange">
          14日間はいつでも解約可能。まずは「失いたくない成果」を体験してください。
        </p>

        <button
          type="button"
          onClick={onStartTrial}
          className="mt-5 w-full rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          14日無料トライアルを今すぐ開始
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="mt-2 w-full rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground"
        >
          後で検討する
        </button>
      </section>
    </main>
  )
}
