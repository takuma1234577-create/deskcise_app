import type { MenuType } from "./lifeRecovery";

const TRIAL_DAYS = 14;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface SubscriptionState {
  firstLaunchAt: string;
  trialStartDate: string | null;
  isProUser: boolean;
}

export interface TrialStatus {
  isTrialActive: boolean;
  daysRemaining: number;
  trialEndsAt: string;
}

export type FeatureKey = "standingMenu" | "detailedReport";

export function createInitialSubscriptionState(now: Date = new Date()): SubscriptionState {
  return {
    firstLaunchAt: now.toISOString(),
    trialStartDate: null,
    isProUser: false,
  };
}

export function getTrialStatus(
  trialStartDateISO: string | null,
  now: Date = new Date()
): TrialStatus {
  if (!trialStartDateISO) {
    return {
      isTrialActive: false,
      daysRemaining: 0,
      trialEndsAt: "",
    };
  }

  const firstLaunchAt = new Date(trialStartDateISO);
  const trialEndsAtDate = new Date(
    firstLaunchAt.getTime() + TRIAL_DAYS * MS_PER_DAY
  );
  const diffMs = trialEndsAtDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / MS_PER_DAY));

  return {
    isTrialActive: diffMs > 0,
    daysRemaining,
    trialEndsAt: trialEndsAtDate.toISOString(),
  };
}

export function resolveProAccess(
  state: SubscriptionState,
  now: Date = new Date()
): boolean {
  if (state.isProUser) {
    return true;
  }

  const trial = getTrialStatus(state.trialStartDate, now);
  return trial.isTrialActive;
}

export function canAccessFeature(
  feature: FeatureKey,
  state: SubscriptionState,
  now: Date = new Date()
): boolean {
  const hasProAccess = resolveProAccess(state, now);

  if (feature === "standingMenu" || feature === "detailedReport") {
    return hasProAccess;
  }

  return true;
}

export function resolveMenuAvailability(
  menuType: MenuType,
  state: SubscriptionState,
  now: Date = new Date()
): boolean {
  if (menuType === "standing") {
    return canAccessFeature("standingMenu", state, now);
  }
  return true;
}

export function startTrial(state: SubscriptionState, now: Date = new Date()): SubscriptionState {
  return {
    ...state,
    trialStartDate: now.toISOString(),
  };
}
