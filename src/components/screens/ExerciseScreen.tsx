import type { ExerciseMenuPreset } from "../../features/life-buyback";

export interface ExerciseScreenProps {
  menu: ExerciseMenuPreset;
  liveRecoveryText: string;
}

export function ExerciseScreen({ menu, liveRecoveryText }: ExerciseScreenProps) {
  return (
    <section className="rounded-2xl border border-[#173A6A]/15 bg-white p-6">
      <h2 className="text-xl font-semibold text-[#173A6A]">Exercise</h2>
      <p className="mt-2 text-sm text-[#173A6A]/70">{liveRecoveryText}</p>
      <ul className="mt-4 space-y-2">
        {menu.exercises.map((exercise) => (
          <li key={exercise.id} className="text-sm text-[#173A6A]">
            {exercise.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
