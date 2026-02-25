export interface ReminderScheduler {
  scheduleAfterMinutes: (
    minutes: number,
    payload: { title: string; body: string; key: string }
  ) => Promise<void>;
  cancel: (key: string) => Promise<void>;
}

export interface SittingReminderState {
  startedAt: string;
  lastReminderScheduledAt?: string;
  isReminderTriggered: boolean;
}

export const SITTING_REMINDER_KEY = "sitting-over-60m";
const SITTING_THRESHOLD_MINUTES = 60;

export async function triggerSittingReminderIfNeeded(
  state: SittingReminderState,
  scheduler: ReminderScheduler,
  now: Date = new Date()
): Promise<SittingReminderState> {
  const elapsedMinutes = Math.floor(
    (now.getTime() - new Date(state.startedAt).getTime()) / (60 * 1000)
  );

  if (elapsedMinutes < SITTING_THRESHOLD_MINUTES || state.isReminderTriggered) {
    return state;
  }

  await scheduler.scheduleAfterMinutes(0, {
    key: SITTING_REMINDER_KEY,
    title: "Dekcize",
    body: "血流をリセットしてください",
  });

  return {
    ...state,
    isReminderTriggered: true,
    lastReminderScheduledAt: now.toISOString(),
  };
}

export async function resetSittingReminder(
  scheduler: ReminderScheduler
): Promise<void> {
  await scheduler.cancel(SITTING_REMINDER_KEY);
}
