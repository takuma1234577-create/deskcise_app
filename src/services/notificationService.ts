import type { ExerciseLogRecord } from "../types/schema";

const TRIAL_MILESTONES_DAYS = [3, 7, 12] as const;
const NOTIFICATION_CACHE_KEY = "dekcize.trialNotificationSchedule.v1";

interface NotificationPayload {
  key: string;
  title: string;
  body: string;
}

interface NotificationScheduler {
  scheduleAt: (at: Date, payload: NotificationPayload) => void;
}

class BrowserNotificationScheduler implements NotificationScheduler {
  private timers = new Map<string, number>();

  scheduleAt(at: Date, payload: NotificationPayload) {
    const now = Date.now();
    const delay = at.getTime() - now;
    if (delay <= 0) {
      return;
    }

    const existing = this.timers.get(payload.key);
    if (existing) {
      window.clearTimeout(existing);
    }

    const id = window.setTimeout(() => {
      this.fire(payload);
    }, delay);
    this.timers.set(payload.key, id);
  }

  private fire(payload: NotificationPayload) {
    try {
      if (!("Notification" in window)) {
        return;
      }

      if (Notification.permission === "granted") {
        new Notification(payload.title, { body: payload.body });
        return;
      }

      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(payload.title, { body: payload.body });
          }
        });
      }
    } catch {
      // Ignore notification runtime errors to avoid crashing UI.
    }
  }
}

export const browserNotificationScheduler = new BrowserNotificationScheduler();

function getScheduledCache(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(NOTIFICATION_CACHE_KEY);
  } catch {
    return {};
  }
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function setScheduledCache(next: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(NOTIFICATION_CACHE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures (e.g. private mode restrictions).
  }
}

function buildNotificationBody(day: number, recoveryMinutes: number): string {
  return `トライアル${day}日目。ここまでに${recoveryMinutes}分の寿命リカバリーを積み上げています。この成果を失わないために、今日も1分のリセットを続けましょう。`;
}

export function getCumulativeRecoveryMinutesFromStorage(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem("dekcize.exerciseLogs");
  } catch {
    return 0;
  }
  if (!raw) {
    return 0;
  }

  try {
    const logs = JSON.parse(raw) as ExerciseLogRecord[];
    return logs.reduce((sum, log) => sum + (log.recoveredLifeMinutes ?? 0), 0);
  } catch {
    return 0;
  }
}

export function scheduleTrialMilestoneNotifications(input: {
  trialStartDate: string;
  cumulativeRecoveryMinutes: number;
  scheduler?: NotificationScheduler;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const scheduler = input.scheduler ?? browserNotificationScheduler;
  const trialStartMs = new Date(input.trialStartDate).getTime();
  if (!Number.isFinite(trialStartMs)) {
    return;
  }

  const currentCache = getScheduledCache();
  const nextCache = { ...currentCache };

  for (const day of TRIAL_MILESTONES_DAYS) {
    const at = new Date(trialStartMs + day * 24 * 60 * 60 * 1000);
    const key = `trial-day-${day}`;
    const body = buildNotificationBody(day, input.cumulativeRecoveryMinutes);

    if (at.getTime() <= Date.now()) {
      continue;
    }

    scheduler.scheduleAt(at, {
      key,
      title: "Dekcize Trial Update",
      body,
    });

    nextCache[key] = at.toISOString();
  }

  setScheduledCache(nextCache);
}
