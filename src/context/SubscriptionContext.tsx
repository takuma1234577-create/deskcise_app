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
  type SubscriptionState,
} from "../domain/subscription";

export type BillingPlan = "monthly" | "yearly" | "lifetime";

export interface SubscriptionContextValue {
  subscription: SubscriptionState;
  isProUnlocked: boolean;
  trialDaysRemaining: number;
  trialEndsAt: string;
  purchasePlan: (plan: BillingPlan) => void;
  restorePurchase: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionState>(() =>
    createInitialSubscriptionState()
  );

  const trialStatus = useMemo(
    () => getTrialStatus(subscription.firstLaunchAt),
    [subscription.firstLaunchAt]
  );

  const isProUnlocked = useMemo(
    () => resolveProAccess(subscription),
    [subscription]
  );

  useEffect(() => {
    // TODO: Connect with storage layer and IAP receipt verification.
  }, []);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      subscription,
      isProUnlocked,
      trialDaysRemaining: trialStatus.daysRemaining,
      trialEndsAt: trialStatus.trialEndsAt,
      purchasePlan: (_plan: BillingPlan) => {
        setSubscription((prev) => ({ ...prev, isProUser: true }));
      },
      restorePurchase: () => {
        setSubscription((prev) => ({ ...prev, isProUser: true }));
      },
    }),
    [subscription, isProUnlocked, trialStatus.daysRemaining, trialStatus.trialEndsAt]
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
