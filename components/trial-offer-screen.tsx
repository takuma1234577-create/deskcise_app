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
          14日間のPro版を開始しますか？
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          立ちメニューと詳細レポートを14日間フル開放します。最初の1分から、
          デスクワークで失う寿命リスクの買い戻しを最大化できます。
        </p>

        <button
          type="button"
          onClick={onStartTrial}
          className="mt-5 w-full rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          14日無料トライアルを開始
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="mt-2 w-full rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground"
        >
          今はスキップ
        </button>
      </section>
    </main>
  )
}
