import type { MenuType } from "../domain/lifeRecovery";

export interface AppEventMeta {
  sourceApp: "dekcize" | "app1";
  schemaVersion: string;
  linkedSessionId?: string;
  tags?: string[];
}

export interface ExerciseLogRecord {
  id: string;
  performedAt: string;
  menuType: MenuType;
  exerciseMinutes: number;
  recoveredLifeMinutes: number;
  note?: string;
  meta: AppEventMeta;
}

export interface SittingSessionRecord {
  id: string;
  startedAt: string;
  endedAt?: string;
  seatedMinutes: number;
  isReminderTriggered: boolean;
  meta: AppEventMeta;
}

export interface UserStateSnapshot {
  userId: string;
  subscription: {
    firstLaunchAt: string;
    trialStartDate: string | null;
    isProUser: boolean;
  };
  createdAt: string;
  updatedAt: string;
  schemaVersion: string;
}

export interface DekcizeDataStore {
  userState: UserStateSnapshot;
  exerciseLogs: ExerciseLogRecord[];
  sittingSessions: SittingSessionRecord[];
}
