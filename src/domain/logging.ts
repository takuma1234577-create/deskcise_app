import type {
  AppEventMeta,
  ExerciseLogRecord,
  SittingSessionRecord,
} from "../types/schema";
import type { MenuType } from "./lifeRecovery";

export interface CreateExerciseLogInput {
  menuType: MenuType;
  exerciseMinutes: number;
  recoveredLifeMinutes: number;
  note?: string;
  meta: AppEventMeta;
  now?: Date;
}

export interface CreateSittingSessionInput {
  seatedMinutes: number;
  startedAt: string;
  endedAt?: string;
  isReminderTriggered: boolean;
  meta: AppEventMeta;
}

export function createExerciseLog(
  input: CreateExerciseLogInput
): ExerciseLogRecord {
  const now = input.now ?? new Date();

  return {
    id: buildId("exercise", now),
    performedAt: now.toISOString(),
    menuType: input.menuType,
    exerciseMinutes: input.exerciseMinutes,
    recoveredLifeMinutes: input.recoveredLifeMinutes,
    note: input.note,
    meta: input.meta,
  };
}

export function createSittingSessionLog(
  input: CreateSittingSessionInput
): SittingSessionRecord {
  return {
    id: buildId("sitting", new Date(input.startedAt)),
    startedAt: input.startedAt,
    endedAt: input.endedAt,
    seatedMinutes: input.seatedMinutes,
    isReminderTriggered: input.isReminderTriggered,
    meta: input.meta,
  };
}

function buildId(prefix: "exercise" | "sitting", now: Date): string {
  return `${prefix}_${now.getTime()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
