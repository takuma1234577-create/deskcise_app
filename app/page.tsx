"use client"

import { useState, useCallback, useEffect } from "react"
import { DashboardTimer } from "@/components/dashboard-timer"
import { BreakSession } from "@/components/break-session"
import { ExerciseScreen } from "@/components/exercise-screen"
import { ReportScreen } from "@/components/report-screen"
import { SettingsScreen } from "@/components/settings-screen"
import { AuthScreen } from "@/components/auth-screen"
import { TrialOfferScreen } from "@/components/trial-offer-screen"
import { BottomNav, type Screen } from "@/components/bottom-nav"
import { AuthProvider, useAuth } from "@/src/context/AuthContext"
import { SubscriptionProvider, useSubscription } from "@/src/context/SubscriptionContext"
import { createExerciseLog } from "@/src/domain/logging"
import type { ExerciseLogRecord } from "@/src/types/schema"
import type { LifeBuybackMenuType } from "@/src/features/life-buyback"

type BreakPayload = {
  lifeLossPrediction: number
  currentMenu: {
    id: string
    label: string
    menuType: LifeBuybackMenuType
  }
}

function HomeContent() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [isBreakActive, setIsBreakActive] = useState(false)
  const [breakPayload, setBreakPayload] = useState<BreakPayload | null>(null)
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLogRecord[]>([])
  const [completionMessage, setCompletionMessage] = useState<string | null>(null)
  const [showTrialOffer, setShowTrialOffer] = useState(false)
  const [trialOfferHandled, setTrialOfferHandled] = useState(false)
  const { subscription, isProUnlocked, trialStartDate, startTrialOffer } = useSubscription()
  const { user, loading } = useAuth()

  const handleBreakStart = useCallback((payload: BreakPayload) => {
    setBreakPayload(payload)
    setIsBreakActive(true)
  }, [])

  const handleBreakComplete = useCallback((result: {
    recoveredLifeMinutes: number
    lifeLossPrediction: number
    remainingLifeRisk: number
    menuId: string
    menuType: LifeBuybackMenuType
    resetMessage: string
  }) => {
    const exerciseLog = createExerciseLog({
      menuType: result.menuType === "standing" ? "standing" : "seated",
      exerciseMinutes: 1,
      recoveredLifeMinutes: result.recoveredLifeMinutes,
      note: `menu=${result.menuId}; loss=${result.lifeLossPrediction}; remaining=${result.remainingLifeRisk}`,
      meta: {
        sourceApp: "dekcize",
        schemaVersion: "1.0.0",
        tags: ["break-session", "life-buyback"],
      },
    })

    setExerciseLogs((prev) => {
      const next = [...prev, exerciseLog]
      if (typeof window !== "undefined") {
        window.localStorage.setItem("dekcize.exerciseLogs", JSON.stringify(next))
      }
      return next
    })

    setBreakPayload(null)
    setIsBreakActive(false)
    setCompletionMessage(result.resetMessage)
    setTimeout(() => {
      setCompletionMessage(null)
    }, 1800)
  }, [])

  const handleBreakSkip = useCallback(() => {
    setBreakPayload(null)
    setIsBreakActive(false)
  }, [])

  const handleStartTrial = useCallback(() => {
    startTrialOffer()
    setShowTrialOffer(false)
    setTrialOfferHandled(true)
  }, [startTrialOffer])

  const handleSkipTrialOffer = useCallback(() => {
    setShowTrialOffer(false)
    setTrialOfferHandled(true)
  }, [])

  useEffect(() => {
    if (!user || trialOfferHandled) {
      return
    }
    if (!isProUnlocked && !trialStartDate && !subscription.isProUser) {
      setShowTrialOffer(true)
    }
  }, [user, trialOfferHandled, isProUnlocked, trialStartDate, subscription.isProUser])

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange/20 border-t-orange" />
          <p className="text-xs text-muted-foreground/60">読み込み中...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return <AuthScreen />
  }

  if (showTrialOffer) {
    return (
      <TrialOfferScreen
        onStartTrial={handleStartTrial}
        onSkip={handleSkipTrialOffer}
      />
    )
  }

  if (isBreakActive && breakPayload) {
    return (
      <BreakSession
        onComplete={handleBreakComplete}
        onSkip={handleBreakSkip}
        lifeLossPrediction={breakPayload.lifeLossPrediction}
        currentMenu={breakPayload.currentMenu}
        isProUser={isProUnlocked}
      />
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-md bg-background antialiased">
      <div className="pb-24">
        {completionMessage && (
          <div className="mx-5 mt-3 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-center text-sm font-medium text-success animate-fade-in-up">
            {completionMessage}
          </div>
        )}
        {screen === "dashboard" && (
          <DashboardTimer
            onBreakStart={handleBreakStart}
            isProUser={isProUnlocked}
          />
        )}
        {screen === "exercise" && <ExerciseScreen />}
        {screen === "report" && <ReportScreen />}
        {screen === "settings" && <SettingsScreen />}
      </div>
      <BottomNav current={screen} onChange={setScreen} />
    </main>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <HomeContent />
      </SubscriptionProvider>
    </AuthProvider>
  )
}
