import type {
  LifeBuybackComputationInput,
  LifeBuybackComputationResult,
  LifeBuybackMenuType,
} from "../types";

export const LIFE_BUYBACK_CONFIG = {
  seatedDamagePerHour: 22,
  proRecoveryPerMinute: 22,
  freeRecoveryPerMinute: 9,
  pomodoroMinutes: 25,
  exerciseMinutes: 1,
} as const;

const MINUTES_PER_HOUR = 60;

export function predictLifeLossFromSitting(focusMinutes: number): number {
  if (!Number.isFinite(focusMinutes) || focusMinutes <= 0) {
    return 0;
  }

  const raw = (focusMinutes / MINUTES_PER_HOUR) * LIFE_BUYBACK_CONFIG.seatedDamagePerHour;
  return Math.round(raw);
}

export function calculateLifeRecovery(
  menuType: LifeBuybackMenuType,
  breakMinutes: number
): number {
  if (!Number.isFinite(breakMinutes) || breakMinutes <= 0) {
    return 0;
  }

  const perMinute =
    menuType === "standing"
      ? LIFE_BUYBACK_CONFIG.proRecoveryPerMinute
      : LIFE_BUYBACK_CONFIG.freeRecoveryPerMinute;

  return Math.round(breakMinutes * perMinute);
}

export function calculateLifeBuyback(
  input: LifeBuybackComputationInput
): LifeBuybackComputationResult {
  const predictedLifeLossMinutes = predictLifeLossFromSitting(input.focusMinutes);
  const recoveredLifeMinutes = calculateLifeRecovery(input.menuType, input.breakMinutes);
  const netLifeDeltaMinutes = recoveredLifeMinutes - predictedLifeLossMinutes;
  const recoveryPerMinute =
    input.menuType === "standing"
      ? LIFE_BUYBACK_CONFIG.proRecoveryPerMinute
      : LIFE_BUYBACK_CONFIG.freeRecoveryPerMinute;

  return {
    predictedLifeLossMinutes,
    recoveredLifeMinutes,
    netLifeDeltaMinutes,
    seatedDamagePerHour: LIFE_BUYBACK_CONFIG.seatedDamagePerHour,
    recoveryPerMinute,
  };
}
