const Colors = {
  white: '#FFFFFF',
  black: '#121212',
  primary: '#1B5E4B',
  primarySoft: '#E8F5F0',
  grey: '#9E9E9E',
  lightGrey: '#F0F0F0',
  background: '#F4F7F5',
  text: '#1A1A1A',
  muted: '#5F6B66',
  board: '#0F3D32',
  free: '#C8E6C9',
  highlight: '#FFD54F',
  danger: '#C62828',
} as const;

export type ColorName = keyof typeof Colors;

export default Colors;
