import {createMMKV} from 'react-native-mmkv';
import type {AuthUser} from '../types/auth';

const storage = createMMKV({id: 'sequence'});

const KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: 'user',
} as const;

export type StoredSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export function getStoredSession(): StoredSession | null {
  const access = storage.getString(KEYS.accessToken);
  const refresh = storage.getString(KEYS.refreshToken);
  const userJson = storage.getString(KEYS.user);

  if (!access || !refresh || !userJson) {
    return null;
  }

  try {
    return {
      accessToken: access,
      refreshToken: refresh,
      user: JSON.parse(userJson) as AuthUser,
    };
  } catch (error) {
    console.error('Failed to parse stored auth session', error);
    return null;
  }
}

export function saveSession(session: StoredSession): void {
  storage.set(KEYS.accessToken, session.accessToken);
  storage.set(KEYS.refreshToken, session.refreshToken);
  storage.set(KEYS.user, JSON.stringify(session.user));
}

export function clearSession(): void {
  storage.remove(KEYS.accessToken);
  storage.remove(KEYS.refreshToken);
  storage.remove(KEYS.user);
}

export function getAccessToken(): string | null {
  return storage.getString(KEYS.accessToken) ?? null;
}

export function getRefreshToken(): string | null {
  return storage.getString(KEYS.refreshToken) ?? null;
}
