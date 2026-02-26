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
    <section className="rounded-2xl border border-[#F47B2A]/25 bg-[#173A6A] p-6 text-white">
      <h2 className="text-xl font-semibold">DEKCIZE Pro</h2>
      <p className="mt-2 text-sm text-white/80">
        立ちメニューと詳細レポートを開放して寿命バイバック効率を最大化します。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-[#F47B2A] px-3 py-2 text-sm font-medium"
          onClick={onBuyMonthly}
        >
          月額 $4.99
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium"
          onClick={onBuyYearly}
        >
          年額 $39.99
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium"
          onClick={onBuyLifetime}
        >
          買い切り $79.99
        </button>
      </div>
    </section>
  );
}
