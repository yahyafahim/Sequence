import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ChipSvgs} from '../assets/chips';
import type {PlayerColor} from '../game/types';

type ChipProps = {
  color: PlayerColor;
  size: number;
  locked?: boolean;
};

export default function Chip({color, size, locked = false}: ChipProps) {
  const Svg = ChipSvgs[color];
  return (
    <View style={[styles.wrap, {width: size, height: size}, locked && styles.locked]}>
      <Svg width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locked: {
    opacity: 1,
  },
});
