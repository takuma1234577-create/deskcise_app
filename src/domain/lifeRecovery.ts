import {
  calculateLifeRecovery as calculateLifeRecoveryCore,
  LIFE_BUYBACK_CONFIG,
} from "../features/life-buyback/engine/lifeBuybackEngine";

export type MenuType = "standing" | "seated";

export interface LifeRecoveryInput {
  menuType: MenuType;
  durationMinutes: number;
}

export interface LifeRecoveryResult {
  recoveredMinutes: number;
  baselineSeatDamagePerHour: number;
  details: string;
}

const BASELINE_SEAT_DAMAGE_PER_HOUR = LIFE_BUYBACK_CONFIG.seatedDamagePerHour;
const STANDING_RECOVERY_PER_MINUTE = LIFE_BUYBACK_CONFIG.proRecoveryPerMinute;
const SEATED_RECOVERY_PER_MINUTE = LIFE_BUYBACK_CONFIG.freeRecoveryPerMinute;

export function calculateLifeRecovery(
  input: LifeRecoveryInput
): LifeRecoveryResult {
  if (!Number.isFinite(input.durationMinutes) || input.durationMinutes <= 0) {
    return {
      recoveredMinutes: 0,
      baselineSeatDamagePerHour: BASELINE_SEAT_DAMAGE_PER_HOUR,
      details: "Duration is not positive. No life recovery applied.",
    };
  }

  const recoveredMinutes = calculateLifeRecoveryCore(
    input.menuType === "standing" ? "standing" : "sitting-only",
    input.durationMinutes
  );

  return {
    recoveredMinutes,
    baselineSeatDamagePerHour: BASELINE_SEAT_DAMAGE_PER_HOUR,
    details:
      input.menuType === "standing"
        ? "Pro standing menu recovery applied."
        : "Free seated menu recovery applied.",
  };
}

export const recoveryConfig = {
  baselineSeatDamagePerHour: BASELINE_SEAT_DAMAGE_PER_HOUR,
  standingRecoveryPerMinute: STANDING_RECOVERY_PER_MINUTE,
  seatedRecoveryPerMinute: SEATED_RECOVERY_PER_MINUTE,
} as const;
