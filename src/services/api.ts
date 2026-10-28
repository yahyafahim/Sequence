import env from '../config/env';
import type {ApiResponse, AuthSession} from '../types/auth';
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  getStoredSession,
  saveSession,
} from './storage';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
  retry?: boolean;
};

let refreshPromise: Promise<AuthSession | null> | null = null;

async function parseJson(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    console.error('Failed to parse API response JSON', error);
    return null;
  }
}

async function refreshSession(): Promise<AuthSession | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearSession();
      return null;
    }

    try {
      const response = await fetch(`${env.apiBaseUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken}),
      });
      const json = (await parseJson(response)) as ApiResponse<AuthSession> | null;

      if (!response.ok || !json || !json.success) {
        await clearSession();
        return null;
      }

      await saveSession(json.data);
      return json.data;
    } catch (error) {
      console.error('Failed to refresh auth session', error);
      await clearSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {method = 'GET', body, auth = true, retry = true} = options;
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 401 && auth && retry) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return apiRequest<T>(path, {...options, retry: false});
    }
  }

  const json = (await parseJson(response)) as ApiResponse<T> | null;

  if (!response.ok || !json) {
    const message =
      json && 'message' in json && json.message
        ? json.message
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  if (!json.success) {
    throw new Error(json.message || 'Request failed');
  }

  return json.data;
}

export async function restoreSessionUser() {
  const stored = await getStoredSession();
  if (!stored) {
    return null;
  }

  try {
    const data = await apiRequest<{user: AuthSession['user']}>('/api/auth/me');
    const next = {
      ...stored,
      user: data.user,
    };
    await saveSession(next);
    return next;
  } catch (error) {
    console.error('Failed to restore session via /me', error);
    const refreshed = await refreshSession();
    return refreshed;
  }
}
