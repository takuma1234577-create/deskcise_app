import { DekcizeTimerEngine } from "./timerEngine";
import type {
  AppEventMeta,
  ExerciseLogRecord,
  SittingSessionRecord,
} from "../types/schema";
import type { ReminderScheduler } from "../domain/reminder";
import type { MenuType } from "../domain/lifeRecovery";
import type { SubscriptionState } from "../domain/subscription";

export interface V0BridgeOptions {
  reminderScheduler: ReminderScheduler;
  metaFactory: () => AppEventMeta;
}

export interface V0TimerState {
  sessionStartedAt: string;
  seatedMinutes: number;
  sittingReminder: {
    startedAt: string;
    isReminderTriggered: boolean;
  };
}

export function createV0Bridge(options: V0BridgeOptions) {
  const exerciseLogs: ExerciseLogRecord[] = [];
  const sittingLogs: SittingSessionRecord[] = [];

  const engine = new DekcizeTimerEngine({
    reminderScheduler: options.reminderScheduler,
    saveExerciseLog: async (record) => {
      exerciseLogs.push(record);
    },
    saveSittingLog: async (record) => {
      sittingLogs.push(record);
    },
  });

  return {
    async onExerciseCompleted(input: {
      menuType: MenuType;
      durationMinutes: number;
      subscription: SubscriptionState;
    }) {
      return engine.executeExercise({
        ...input,
        meta: options.metaFactory(),
      });
    },

    async onTimerTick(timerState: V0TimerState, isSessionEnded: boolean) {
      return engine.onSittingTimerTick({
        sittingState: timerState.sittingReminder,
        startedAt: timerState.sessionStartedAt,
        seatedMinutes: timerState.seatedMinutes,
        isSessionEnded,
        meta: options.metaFactory(),
      });
    },

    getLocalLogs() {
      return {
        exerciseLogs,
        sittingLogs,
      };
    },
  };
}
