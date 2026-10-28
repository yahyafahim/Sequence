import type {AuthSession, AuthUser} from '../types/auth';
import {apiRequest} from './api';
import {clearSession, saveSession} from './storage';

export type RegisterInput = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export async function register(input: RegisterInput): Promise<AuthSession> {
  const session = await apiRequest<AuthSession>('/api/auth/register', {
    method: 'POST',
    body: input,
    auth: false,
  });
  await saveSession(session);
  return session;
}

export async function login(input: LoginInput): Promise<AuthSession> {
  const session = await apiRequest<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: input,
    auth: false,
  });
  await saveSession(session);
  return session;
}

export async function fetchMe(): Promise<AuthUser> {
  const data = await apiRequest<{user: AuthUser}>('/api/auth/me');
  return data.user;
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<{message?: string}>('/api/auth/logout', {
      method: 'POST',
      body: {},
    });
  } catch (error) {
    console.error('Logout request failed', error);
  } finally {
    await clearSession();
  }
}
