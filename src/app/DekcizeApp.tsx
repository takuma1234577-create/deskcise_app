import { ExerciseScreen } from "../components/screens/ExerciseScreen";
import { HomeScreen } from "../components/screens/HomeScreen";
import { PaywallScreen } from "../components/screens/PaywallScreen";
import { SubscriptionProvider, useSubscription } from "../context/SubscriptionContext";
import { useLifeBuyback } from "../hooks/useLifeBuyback";

function DekcizeAppBody() {
  const { isProUnlocked, purchasePlan, trialDaysRemaining } = useSubscription();
  const lifeBuyback = useLifeBuyback({ hasProAccess: isProUnlocked });

  return (
    <main className="min-h-screen space-y-4 bg-[#F8F8FB] p-4">
      <HomeScreen
        environment={lifeBuyback.environment}
        negativeFocusFeedback={lifeBuyback.negativeFocusFeedback}
        onEnvironmentChange={lifeBuyback.updateEnvironment}
      />
      <ExerciseScreen
        menu={lifeBuyback.menu}
        liveRecoveryText={lifeBuyback.liveRecoveryText}
      />
      {!isProUnlocked && (
        <PaywallScreen
          onBuyMonthly={() => purchasePlan("monthly")}
          onBuyYearly={() => purchasePlan("yearly")}
          onBuyLifetime={() => purchasePlan("lifetime")}
        />
      )}
      <p className="text-xs text-[#1A1A2E]/60">
        {isProUnlocked ? "Pro Enabled" : `Trial: ${trialDaysRemaining} days left`}
      </p>
    </main>
  );
}

export function DekcizeApp() {
  return (
    <SubscriptionProvider>
      <DekcizeAppBody />
    </SubscriptionProvider>
  );
}
