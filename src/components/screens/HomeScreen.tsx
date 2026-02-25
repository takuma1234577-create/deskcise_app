import type { EnvironmentSelection } from "../../features/life-buyback";

export interface HomeScreenProps {
  environment: EnvironmentSelection;
  negativeFocusFeedback: string;
  onEnvironmentChange: (next: Partial<EnvironmentSelection>) => void;
}

export function HomeScreen({
  environment,
  negativeFocusFeedback,
  onEnvironmentChange,
}: HomeScreenProps) {
  return (
    <section className="rounded-2xl border border-[#1A1A2E]/15 bg-white p-6">
      <h2 className="text-xl font-semibold text-[#1A1A2E]">Focus Timer</h2>
      <p className="mt-2 text-sm text-[#1A1A2E]/70">{negativeFocusFeedback}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border border-[#1A1A2E]/20 px-3 py-2 text-sm text-[#1A1A2E]"
          onClick={() => onEnvironmentChange({ deskSize: "compact" })}
        >
          Compact
        </button>
        <button
          type="button"
          className="rounded-lg border border-[#1A1A2E]/20 px-3 py-2 text-sm text-[#1A1A2E]"
          onClick={() => onEnvironmentChange({ deskSize: "standard" })}
        >
          Standard
        </button>
        <button
          type="button"
          className="rounded-lg border border-[#1A1A2E]/20 px-3 py-2 text-sm text-[#1A1A2E]"
          onClick={() => onEnvironmentChange({ deskSize: "wide" })}
        >
          Wide
        </button>
      </div>
      <p className="mt-4 text-sm text-[#1A1A2E]/80">
        現在: {environment.deskSize} / {environment.posture}
      </p>
    </section>
  );
}
