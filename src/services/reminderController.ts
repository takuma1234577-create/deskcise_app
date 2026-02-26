export type ReminderPreset = "60m" | "120m" | "custom"

export interface ReminderSettingsState {
  enabled: boolean
  preset: ReminderPreset
  customMinutes: number
  soundEnabled: boolean
  meetingUntil: number | null
  lastNotifiedAt: number | null
}

export const REMINDER_SETTINGS_STORAGE_KEY = "dekcise.notification.settings.v1"

export const DEFAULT_REMINDER_SETTINGS: ReminderSettingsState = {
  enabled: true,
  preset: "60m",
  customMinutes: 90,
  soundEnabled: true,
  meetingUntil: null,
  lastNotifiedAt: null,
}

export function loadReminderSettings(): ReminderSettingsState {
  if (typeof window === "undefined") {
    return DEFAULT_REMINDER_SETTINGS
  }
  try {
    const raw = window.localStorage.getItem(REMINDER_SETTINGS_STORAGE_KEY)
    if (!raw) {
      return DEFAULT_REMINDER_SETTINGS
    }
    const parsed = JSON.parse(raw) as Partial<ReminderSettingsState>
    return {
      enabled: parsed.enabled ?? DEFAULT_REMINDER_SETTINGS.enabled,
      preset: parsed.preset ?? DEFAULT_REMINDER_SETTINGS.preset,
      customMinutes: clampMinutes(parsed.customMinutes ?? DEFAULT_REMINDER_SETTINGS.customMinutes),
      soundEnabled: parsed.soundEnabled ?? DEFAULT_REMINDER_SETTINGS.soundEnabled,
      meetingUntil: typeof parsed.meetingUntil === "number" ? parsed.meetingUntil : null,
      lastNotifiedAt: typeof parsed.lastNotifiedAt === "number" ? parsed.lastNotifiedAt : null,
    }
  } catch {
    return DEFAULT_REMINDER_SETTINGS
  }
}

export function saveReminderSettings(next: ReminderSettingsState): void {
  if (typeof window === "undefined") {
    return
  }
  try {
    window.localStorage.setItem(REMINDER_SETTINGS_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore persistence errors in restricted environments.
  }
}

export function clampMinutes(value: number): number {
  if (!Number.isFinite(value)) return 60
  return Math.max(15, Math.min(480, Math.round(value)))
}

export function resolveIntervalMinutes(state: ReminderSettingsState): number {
  if (state.preset === "60m") return 60
  if (state.preset === "120m") return 120
  return clampMinutes(state.customMinutes)
}

export function isMeetingModeActive(meetingUntil: number | null, now: number = Date.now()): boolean {
  return typeof meetingUntil === "number" && meetingUntil > now
}

export function getMeetingRemainingMinutes(meetingUntil: number | null, now: number = Date.now()): number {
  if (!isMeetingModeActive(meetingUntil, now)) {
    return 0
  }
  return Math.ceil((meetingUntil - now) / (60 * 1000))
}

export async function ensureNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported"
  }
  if (Notification.permission === "granted") {
    return "granted"
  }
  if (Notification.permission === "denied") {
    return "denied"
  }
  return Notification.requestPermission()
}

export function playReminderTone(): void {
  if (typeof window === "undefined") {
    return
  }
  try {
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) {
      return
    }
    const context = new Ctx()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    oscillator.type = "sine"
    oscillator.frequency.value = 840
    gainNode.gain.value = 0.06
    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.2)
  } catch {
    // Ignore if audio API is blocked.
  }
}

export async function sendExerciseReminderNotification(): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return
  }
  if (Notification.permission !== "granted") {
    return
  }
  try {
    new Notification("DEKCISE リマインダー", {
      body: "血流をリセットしましょう。1分の運動で回復できます。",
    })
  } catch {
    // Ignore runtime notification failures.
  }
}
