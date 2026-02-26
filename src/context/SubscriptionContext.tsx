import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createInitialSubscriptionState,
  getTrialStatus,
  resolveProAccess,
  startTrial,
  type SubscriptionState,
} from "../domain/subscription";
import {
  getCumulativeRecoveryMinutesFromStorage,
  scheduleTrialMilestoneNotifications,
} from "../services/notificationService";

export type BillingPlan = "monthly" | "yearly" | "lifetime";

export interface SubscriptionContextValue {
  subscription: SubscriptionState;
  trialStartDate: string | null;
  isProUnlocked: boolean;
  trialDaysRemaining: number;
  trialEndsAt: string;
  startTrialOffer: () => void;
  purchasePlan: (plan: BillingPlan) => void;
  restorePurchase: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionState>(() =>
    createInitialSubscriptionState()
  );

  const trialStatus = useMemo(
    () => getTrialStatus(subscription.trialStartDate),
    [subscription.trialStartDate]
  );

  const isProUnlocked = useMemo(
    () => resolveProAccess(subscription),
    [subscription]
  );

  useEffect(() => {
    // TODO: Connect with IAP receipt verification.
  }, []);

  useEffect(() => {
    const schedule = () => {
      try {
        const cumulativeRecoveryMinutes = getCumulativeRecoveryMinutesFromStorage();
        if (!subscription.trialStartDate) {
          return;
        }
        scheduleTrialMilestoneNotifications({
          trialStartDate: subscription.trialStartDate,
          cumulativeRecoveryMinutes,
        });
      } catch {
        // Avoid breaking app boot from notification side effects.
      }
    };

    schedule();
    window.addEventListener("storage", schedule);
    window.addEventListener("focus", schedule);
    return () => {
      window.removeEventListener("storage", schedule);
      window.removeEventListener("focus", schedule);
    };
  }, [subscription.trialStartDate]);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      subscription,
      trialStartDate: subscription.trialStartDate,
      isProUnlocked,
      trialDaysRemaining: trialStatus.daysRemaining,
      trialEndsAt: trialStatus.trialEndsAt,
      startTrialOffer: () => {
        setSubscription((prev) => startTrial(prev));
      },
      purchasePlan: (_plan: BillingPlan) => {
        setSubscription((prev) => ({ ...prev, isProUser: true }));
      },
      restorePurchase: () => {
        setSubscription((prev) => ({ ...prev, isProUser: true }));
      },
    }),
    [
      subscription,
      isProUnlocked,
      trialStatus.daysRemaining,
      trialStatus.trialEndsAt,
    ]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider.");
  }
  return context;
}
