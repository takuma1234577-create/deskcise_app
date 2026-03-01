"use client"

import { useState, useCallback, useEffect } from "react"
import { DashboardTimer } from "@/components/dashboard-timer"
import { BreakSession } from "@/components/break-session"
import { ReportScreen } from "@/components/report-screen"
import { PaywallScreen } from "@/components/paywall-screen"
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
  const { subscription, purchasePlan, isProUnlocked, trialStartDate, startTrialOffer } = useSubscription()
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
        <p className="text-sm text-muted-foreground">ログイン状態を確認中...</p>
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
    <main className="mx-auto min-h-screen max-w-md bg-background">
      <div className="pb-20">
        {completionMessage && (
          <div className="mx-4 mt-3 rounded-lg border border-success/40 bg-success-muted px-3 py-2 text-center text-sm font-semibold text-success">
            {completionMessage}
          </div>
        )}
        {screen === "dashboard" && (
          <DashboardTimer
            onBreakStart={handleBreakStart}
            isProUser={isProUnlocked}
          />
        )}
        {screen === "report" && <ReportScreen />}
        {screen === "paywall" && (
          <PaywallScreen
            onClose={() => setScreen("dashboard")}
            onUpgrade={() => {
              purchasePlan("monthly")
              setScreen("dashboard")
            }}
          />
        )}
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
