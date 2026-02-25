export type DeskSize = "compact" | "standard" | "wide";
export type Posture = "sitting" | "standing";

export type RecoveryTier = "pro" | "free";
export type LifeBuybackMenuType = "standing" | "sitting-only";

export interface EnvironmentSelection {
  deskSize: DeskSize;
  posture: Posture;
}

export interface ExerciseMenuItem {
  id: string;
  label: string;
}

export interface ExerciseMenuPreset {
  key:
    | "wide-standing"
    | "standard-standing"
    | "compact-standing"
    | "sitting-only";
  title: string;
  menuType: LifeBuybackMenuType;
  recoveryTier: RecoveryTier;
  exercises: ExerciseMenuItem[];
}

export interface LifeBuybackComputationInput {
  focusMinutes: number;
  breakMinutes: number;
  menuType: LifeBuybackMenuType;
}

export interface LifeBuybackComputationResult {
  predictedLifeLossMinutes: number;
  recoveredLifeMinutes: number;
  netLifeDeltaMinutes: number;
  seatedDamagePerHour: number;
  recoveryPerMinute: number;
}
