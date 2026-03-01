"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell, BriefcaseBusiness, Clock3, Volume2 } from "lucide-react"
import {
  DEFAULT_REMINDER_SETTINGS,
  clampMinutes,
  ensureNotificationPermission,
  getMeetingRemainingMinutes,
  isMeetingModeActive,
  loadReminderSettings,
  playReminderTone,
  resolveIntervalMinutes,
  saveReminderSettings,
  sendExerciseReminderNotification,
  type ReminderPreset,
  type ReminderSettingsState,
} from "@/src/services/reminderController"

export function NotificationSettings() {
  const [settings, setSettings] = useState<ReminderSettingsState>(DEFAULT_REMINDER_SETTINGS)
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default")

  useEffect(() => {
    const loaded = loadReminderSettings()
    setSettings(loaded)
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    } else {
      setPermission("unsupported")
    }
  }, [])

  useEffect(() => {
    saveReminderSettings(settings)
  }, [settings])

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      setSettings((prev) => {
        const now = Date.now()
        if (!prev.enabled) return prev

        // Meeting mode explicitly mutes both notification and sound.
        if (isMeetingModeActive(prev.meetingUntil, now)) {
          return prev
        }

        // Auto-clear stale meeting flag.
        const normalized = prev.meetingUntil ? { ...prev, meetingUntil: null } : prev
        const intervalMinutes = resolveIntervalMinutes(normalized)
        const intervalMs = intervalMinutes * 60 * 1000

        if (!normalized.lastNotifiedAt) {
          return { ...normalized, lastNotifiedAt: now }
        }
        if (now - normalized.lastNotifiedAt < intervalMs) {
          return normalized
        }

        void sendExerciseReminderNotification()
        if (normalized.soundEnabled) {
          playReminderTone()
        }
        return { ...normalized, lastNotifiedAt: now }
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const meetingModeOn = useMemo(
    () => isMeetingModeActive(settings.meetingUntil),
    [settings.meetingUntil]
  )
  const meetingRemaining = useMemo(
    () => getMeetingRemainingMinutes(settings.meetingUntil),
    [settings.meetingUntil]
  )

  const requestPermissionIfNeeded = async () => {
    const result = await ensureNotificationPermission()
    setPermission(result)
  }

  const handleToggleEnabled = async (enabled: boolean) => {
    if (enabled) {
      await requestPermissionIfNeeded()
    }
    setSettings((prev) => ({ ...prev, enabled }))
  }

  const handlePresetChange = (preset: ReminderPreset) => {
    setSettings((prev) => ({ ...prev, preset }))
  }

  const handleCustomMinutesChange = (value: string) => {
    const next = clampMinutes(Number(value))
    setSettings((prev) => ({ ...prev, customMinutes: next }))
  }

  const handleMeetingPause = () => {
    const now = Date.now()
    setSettings((prev) => ({
      ...prev,
      meetingUntil: now + 60 * 60 * 1000,
      lastNotifiedAt: now,
    }))
  }

  const handleExitMeetingMode = () => {
    setSettings((prev) => ({ ...prev, meetingUntil: null }))
  }

  return (
    <section className="glass-card rounded-2xl p-4 mb-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
          <Bell className="h-5 w-5 text-orange" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
            NOTIFICATIONS
          </p>
          <p className="text-sm font-medium text-foreground">
            通知設定
          </p>
        </div>
      </div>

      {meetingModeOn && (
        <div className="mb-4 rounded-xl bg-orange/10 px-4 py-3">
          <p className="text-xs font-medium text-orange">
            ミーティングモード有効 - 残り約{meetingRemaining}分
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* Reminder Toggle */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground">リマインダー通知</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">運動タイミングを定期通知</p>
          </div>
          <button
            type="button"
            onClick={() => void handleToggleEnabled(!settings.enabled)}
            className={`relative h-7 w-12 rounded-full transition-all duration-200 ${
              settings.enabled ? "bg-orange" : "bg-muted/40"
            }`}
            aria-pressed={settings.enabled}
            aria-label="通知トグル"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                settings.enabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Interval Setting */}
        <div className="rounded-xl bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock3 className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-xs font-medium text-foreground">リマインダー間隔</span>
          </div>
          <select
            value={settings.preset}
            onChange={(e) => handlePresetChange(e.target.value as ReminderPreset)}
            className="w-full rounded-xl bg-muted/30 px-4 py-3 text-sm text-foreground outline-none border-none appearance-none"
          >
            <option value="60m">1時間ごと</option>
            <option value="120m">2時間ごと</option>
            <option value="custom">カスタム</option>
          </select>
          {settings.preset === "custom" && (
            <div className="mt-3">
              <input
                type="number"
                min={15}
                max={480}
                value={settings.customMinutes}
                onChange={(e) => handleCustomMinutesChange(e.target.value)}
                className="w-full rounded-xl bg-muted/30 px-4 py-3 text-sm text-foreground outline-none border-none"
              />
              <p className="mt-2 text-[10px] text-muted-foreground/50">15〜480分で設定</p>
            </div>
          )}
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground/60" />
              <p className="text-sm font-medium text-foreground">音声アラーム</p>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5 ml-6">通知と同時にトーン再生</p>
          </div>
          <button
            type="button"
            onClick={() => setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            className={`relative h-7 w-12 rounded-full transition-all duration-200 ${
              settings.soundEnabled ? "bg-orange" : "bg-muted/40"
            }`}
            aria-pressed={settings.soundEnabled}
            aria-label="音声トグル"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                settings.soundEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Meeting Mode */}
        <div className="rounded-xl bg-orange/5 border border-orange/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BriefcaseBusiness className="h-4 w-4 text-orange" />
            <p className="text-xs font-medium text-foreground">ミーティングモード</p>
          </div>
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            会議中は通知を1時間停止します
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleMeetingPause}
              className="flex-1 rounded-xl bg-orange px-4 py-2.5 text-xs font-medium text-white transition-all duration-200 active:scale-[0.98]"
            >
              1時間停止
            </button>
            {meetingModeOn && (
              <button
                type="button"
                onClick={handleExitMeetingMode}
                className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
              >
                解除
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-muted-foreground/40 text-center">
        通知権限: {permission === "unsupported" ? "未対応" : permission}
      </p>
    </section>
  )
}
