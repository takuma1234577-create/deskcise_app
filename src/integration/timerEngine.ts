import {
  calculateLifeRecovery,
  type LifeRecoveryResult,
  type MenuType,
} from "../domain/lifeRecovery";
import {
  canAccessFeature,
  type SubscriptionState,
} from "../domain/subscription";
import { createExerciseLog, createSittingSessionLog } from "../domain/logging";
import {
  type ReminderScheduler,
  triggerSittingReminderIfNeeded,
  type SittingReminderState,
} from "../domain/reminder";
import type {
  AppEventMeta,
  ExerciseLogRecord,
  SittingSessionRecord,
} from "../types/schema";

export interface TimerEngineDependencies {
  reminderScheduler: ReminderScheduler;
  saveExerciseLog: (record: ExerciseLogRecord) => Promise<void>;
  saveSittingLog: (record: SittingSessionRecord) => Promise<void>;
}

export interface ExerciseExecutionInput {
  menuType: MenuType;
  durationMinutes: number;
  subscription: SubscriptionState;
  meta: AppEventMeta;
}

export interface ExerciseExecutionResult {
  lifeRecovery: LifeRecoveryResult;
  exerciseLog: ExerciseLogRecord;
}

export class DekcizeTimerEngine {
  private readonly deps: TimerEngineDependencies;

  constructor(dependencies: TimerEngineDependencies) {
    this.deps = dependencies;
  }

  async executeExercise(
    input: ExerciseExecutionInput
  ): Promise<ExerciseExecutionResult> {
    if (input.menuType === "standing") {
      const hasAccess = canAccessFeature("standingMenu", input.subscription);
      if (!hasAccess) {
        throw new Error("Standing menu is available for Pro users only.");
      }
    }

    const lifeRecovery = calculateLifeRecovery({
      menuType: input.menuType,
      durationMinutes: input.durationMinutes,
    });

    const exerciseLog = createExerciseLog({
      menuType: input.menuType,
      exerciseMinutes: input.durationMinutes,
      recoveredLifeMinutes: lifeRecovery.recoveredMinutes,
      meta: input.meta,
    });

    await this.deps.saveExerciseLog(exerciseLog);
    return { lifeRecovery, exerciseLog };
  }

  async onSittingTimerTick(input: {
    sittingState: SittingReminderState;
    startedAt: string;
    seatedMinutes: number;
    isSessionEnded: boolean;
    meta: AppEventMeta;
  }): Promise<SittingReminderState> {
    const nextState = await triggerSittingReminderIfNeeded(
      input.sittingState,
      this.deps.reminderScheduler
    );

    if (input.isSessionEnded) {
      const sittingLog = createSittingSessionLog({
        startedAt: input.startedAt,
        endedAt: new Date().toISOString(),
        seatedMinutes: input.seatedMinutes,
        isReminderTriggered: nextState.isReminderTriggered,
        meta: input.meta,
      });

      await this.deps.saveSittingLog(sittingLog);
    }

    return nextState;
  }
}
