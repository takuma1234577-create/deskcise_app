export interface PaywallScreenProps {
  onBuyMonthly: () => void;
  onBuyYearly: () => void;
  onBuyLifetime: () => void;
}

export function PaywallScreen({
  onBuyMonthly,
  onBuyYearly,
  onBuyLifetime,
}: PaywallScreenProps) {
  return (
    <section className="rounded-2xl border border-[#FF5F1F]/25 bg-[#1A1A2E] p-6 text-white">
      <h2 className="text-xl font-semibold">Dekcize Pro</h2>
      <p className="mt-2 text-sm text-white/80">
        立ちメニューと詳細レポートを開放して寿命バイバック効率を最大化します。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-[#FF5F1F] px-3 py-2 text-sm font-medium"
          onClick={onBuyMonthly}
        >
          Monthly $4.99
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium"
          onClick={onBuyYearly}
        >
          Yearly $39.99
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium"
          onClick={onBuyLifetime}
        >
          Lifetime $79.99
        </button>
      </div>
    </section>
  );
}
