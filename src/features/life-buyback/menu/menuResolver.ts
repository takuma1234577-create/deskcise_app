import type {
  EnvironmentSelection,
  ExerciseMenuPreset,
  RecoveryTier,
} from "../types";

const MENU_PRESETS: Record<ExerciseMenuPreset["key"], ExerciseMenuPreset> = {
  "wide-standing": {
    key: "wide-standing",
    title: "Wide x Standing",
    menuType: "standing",
    recoveryTier: "pro",
    exercises: [
      { id: "desk-pushup", label: "デスク・プッシュアップ" },
      { id: "burpee-slow", label: "バーピー・スロー" },
    ],
  },
  "standard-standing": {
    key: "standard-standing",
    title: "Standard x Standing",
    menuType: "standing",
    recoveryTier: "pro",
    exercises: [
      { id: "power-heel-raise", label: "パワー・ヒールレイズ" },
      { id: "dynamic-knee-up", label: "ダイナミック・ニーアップ" },
    ],
  },
  "compact-standing": {
    key: "compact-standing",
    title: "Compact x Standing",
    menuType: "standing",
    recoveryTier: "pro",
    exercises: [
      { id: "isometric-squat", label: "アイソメトリック・スクワット" },
      { id: "arm-circuduction", label: "アーム・サーカダクション" },
    ],
  },
  "sitting-only": {
    key: "sitting-only",
    title: "Sitting Only",
    menuType: "sitting-only",
    recoveryTier: "free",
    exercises: [
      { id: "leg-extension", label: "レッグエクステンション" },
      { id: "twist-crunch", label: "ツイストクランチ" },
    ],
  },
};

export function resolveExerciseMenu(
  environment: EnvironmentSelection,
  hasProAccess: boolean
): ExerciseMenuPreset {
  if (environment.posture === "sitting") {
    return MENU_PRESETS["sitting-only"];
  }

  if (!hasProAccess) {
    return MENU_PRESETS["sitting-only"];
  }

  if (environment.deskSize === "wide") {
    return MENU_PRESETS["wide-standing"];
  }
  if (environment.deskSize === "standard") {
    return MENU_PRESETS["standard-standing"];
  }
  return MENU_PRESETS["compact-standing"];
}

export function canUseMenuTier(
  requiredTier: RecoveryTier,
  hasProAccess: boolean
): boolean {
  if (requiredTier === "free") {
    return true;
  }
  return hasProAccess;
}
