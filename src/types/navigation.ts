import type {PlayerCount} from '../game/types';

export type RootStackParamList = {
  AuthStack: undefined;
  AppStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  Setup: undefined;
  Game: {playerCount: PlayerCount};
};
