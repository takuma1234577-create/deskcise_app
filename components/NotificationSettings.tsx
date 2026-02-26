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
    <section className="mb-3 rounded-xl border border-[#2C4E7E] bg-gradient-to-b from-[#16345F] to-[#132C50] p-4">
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange">
        <Bell className="h-3.5 w-3.5" />
        通知設定
      </p>

      <div className="mt-2 rounded-lg border border-[#335987] bg-[#0E2340] px-3 py-2">
        <p className="text-[11px] text-white/75">
          {meetingModeOn
            ? `ミーティングモード：通知オフ（残り約${meetingRemaining}分）`
            : "ミーティングモード：OFF"}
        </p>
      </div>

      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-[#355C8E] bg-[#15335E] px-3 py-2.5">
          <div>
            <p className="text-sm font-medium text-white">リマインダー通知</p>
            <p className="text-[11px] text-white/70">運動タイミングを定期通知</p>
          </div>
          <button
            type="button"
            onClick={() => void handleToggleEnabled(!settings.enabled)}
            className={`relative h-6 w-11 rounded-full transition ${
              settings.enabled ? "bg-[#F97316]" : "bg-[#334155]"
            }`}
            aria-pressed={settings.enabled}
            aria-label="通知トグル"
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                settings.enabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="rounded-lg border border-[#355C8E] bg-[#15335E] px-3 py-2.5">
          <label className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/85">
            <Clock3 className="h-3.5 w-3.5 text-orange" />
            リマインダー間隔
          </label>
          <select
            value={settings.preset}
            onChange={(e) => handlePresetChange(e.target.value as ReminderPreset)}
            className="w-full rounded-md border border-[#3E679A] bg-[#0F2747] px-2.5 py-2 text-sm text-white outline-none"
          >
            <option value="60m">1時間ごと</option>
            <option value="120m">2時間ごと</option>
            <option value="custom">カスタム</option>
          </select>
          {settings.preset === "custom" && (
            <div className="mt-2">
              <input
                type="number"
                min={15}
                max={480}
                value={settings.customMinutes}
                onChange={(e) => handleCustomMinutesChange(e.target.value)}
                className="w-full rounded-md border border-[#3E679A] bg-[#0F2747] px-2.5 py-2 text-sm text-white outline-none"
              />
              <p className="mt-1 text-[10px] text-white/65">15〜480分で設定できます</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#355C8E] bg-[#15335E] px-3 py-2.5">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
              <Volume2 className="h-3.5 w-3.5 text-orange" />
              音声アラーム
            </p>
            <p className="text-[11px] text-white/70">通知と同時に短いトーンを再生</p>
          </div>
          <button
            type="button"
            onClick={() => setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            className={`relative h-6 w-11 rounded-full transition ${
              settings.soundEnabled ? "bg-[#F97316]" : "bg-[#334155]"
            }`}
            aria-pressed={settings.soundEnabled}
            aria-label="音声トグル"
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                settings.soundEnabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="rounded-lg border border-[#F97316]/50 bg-[#F97316]/15 p-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FDBA74]">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            ミーティング対応
          </p>
          <p className="mt-1 text-[11px] text-white/75">
            会議中は通知と音声を止めて、次の運動通知を1時間後に延期します。
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleMeetingPause}
              className="rounded-md bg-[#F97316] px-3 py-2 text-xs font-semibold text-white"
            >
              ミーティング中（1時間停止）
            </button>
            {meetingModeOn && (
              <button
                type="button"
                onClick={handleExitMeetingMode}
                className="rounded-md border border-[#3E679A] bg-[#0F2747] px-3 py-2 text-xs font-medium text-white"
              >
                解除
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-[10px] text-white/65">
        通知権限: {permission === "unsupported" ? "未対応" : permission}
      </p>
    </section>
  )
}
