const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#1E88E5',
  grey: '#9E9E9E',
  lightGrey: '#F0F0F0',
  background: '#FFFFFF',
  text: '#212121',
} as const;

export type ColorName = keyof typeof Colors;

export default Colors;
