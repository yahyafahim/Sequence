import type {PlayerCount} from '../game/types';

export type RootStackParamList = {
  AppStack: undefined;
};

export type AppStackParamList = {
  Setup: undefined;
  Game: {playerCount: PlayerCount};
};
