declare module '*.json' {
  const value: {
    name: string;
    displayName?: string;
  };
  export default value;
  export const name: string;
  export const displayName: string;
}
