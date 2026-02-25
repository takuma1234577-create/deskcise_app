import { useCallback, useMemo, useState } from "react";
import {
  calculateLifeBuyback,
  calculateLifeRecovery,
  LIFE_BUYBACK_CONFIG,
  resolveExerciseMenu,
  type LifeBuybackMenuType,
  type EnvironmentSelection,
} from "../features/life-buyback";

export interface UseLifeBuybackState {
  environment: EnvironmentSelection;
  focusMinutes: number;
  breakMinutes: number;
  hasProAccess: boolean;
}

export interface CompleteBreakInput {
  lifeLossPrediction: number;
  menuType?: LifeBuybackMenuType;
  breakMinutes?: number;
}

export interface CompleteBreakResult {
  recoveredLifeMinutes: number;
  remainingLifeRisk: number;
  resetMessage: string;
}

export function useLifeBuyback(initial?: Partial<UseLifeBuybackState>) {
  const [environment, setEnvironment] = useState<EnvironmentSelection>(
    initial?.environment ?? { deskSize: "standard", posture: "sitting" }
  );
  const [focusMinutes, setFocusMinutes] = useState<number>(
    initial?.focusMinutes ?? LIFE_BUYBACK_CONFIG.pomodoroMinutes
  );
  const [breakMinutes, setBreakMinutes] = useState<number>(
    initial?.breakMinutes ?? LIFE_BUYBACK_CONFIG.exerciseMinutes
  );
  const [hasProAccess, setHasProAccess] = useState<boolean>(
    initial?.hasProAccess ?? false
  );

  const menu = useMemo(
    () => resolveExerciseMenu(environment, hasProAccess),
    [environment, hasProAccess]
  );

  const computation = useMemo(
    () =>
      calculateLifeBuyback({
        focusMinutes,
        breakMinutes,
        menuType: menu.menuType,
      }),
    [focusMinutes, breakMinutes, menu.menuType]
  );

  const negativeFocusFeedback = useMemo(
    () => `寿命ロス予測: -${computation.predictedLifeLossMinutes}分`,
    [computation.predictedLifeLossMinutes]
  );

  const liveRecoveryText = useMemo(
    () => `寿命を買い戻し中（+${computation.recoveryPerMinute}分）`,
    [computation.recoveryPerMinute]
  );

  const updateEnvironment = useCallback(
    (next: Partial<EnvironmentSelection>) => {
      setEnvironment((prev) => ({ ...prev, ...next }));
    },
    []
  );

  const setDeskSize = useCallback((deskSize: EnvironmentSelection["deskSize"]) => {
    setEnvironment((prev) => ({ ...prev, deskSize }));
  }, []);

  const setPosture = useCallback((posture: EnvironmentSelection["posture"]) => {
    setEnvironment((prev) => ({ ...prev, posture }));
  }, []);

  const completeBreak = useCallback(
    (input: CompleteBreakInput): CompleteBreakResult => {
      const effectiveMenuType: LifeBuybackMenuType = hasProAccess
        ? input.menuType ?? menu.menuType
        : "sitting-only";
      const effectiveBreakMinutes = input.breakMinutes ?? breakMinutes;
      const recoveredLifeMinutes = calculateLifeRecovery(
        effectiveMenuType,
        effectiveBreakMinutes
      );
      const remainingLifeRisk = Math.max(
        input.lifeLossPrediction - recoveredLifeMinutes,
        0
      );

      return {
        recoveredLifeMinutes,
        remainingLifeRisk,
        resetMessage: "生存リスクがリセットされました！",
      };
    },
    [hasProAccess, menu.menuType, breakMinutes]
  );

  return {
    environment,
    focusMinutes,
    breakMinutes,
    hasProAccess,
    menu,
    computation,
    negativeFocusFeedback,
    liveRecoveryText,
    setFocusMinutes,
    setBreakMinutes,
    setHasProAccess,
    updateEnvironment,
    setDeskSize,
    setPosture,
    completeBreak,
  };
}
