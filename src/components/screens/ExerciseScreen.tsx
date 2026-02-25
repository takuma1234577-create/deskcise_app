import type { ExerciseMenuPreset } from "../../features/life-buyback";

export interface ExerciseScreenProps {
  menu: ExerciseMenuPreset;
  liveRecoveryText: string;
}

export function ExerciseScreen({ menu, liveRecoveryText }: ExerciseScreenProps) {
  return (
    <section className="rounded-2xl border border-[#1A1A2E]/15 bg-white p-6">
      <h2 className="text-xl font-semibold text-[#1A1A2E]">Exercise</h2>
      <p className="mt-2 text-sm text-[#1A1A2E]/70">{liveRecoveryText}</p>
      <ul className="mt-4 space-y-2">
        {menu.exercises.map((exercise) => (
          <li key={exercise.id} className="text-sm text-[#1A1A2E]">
            {exercise.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
