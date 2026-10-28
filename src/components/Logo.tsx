import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../config';

type LogoProps = {
  size?: number;
};

export default function Logo({size = 170}: LogoProps) {
  return (
    <View style={[styles.wrap, {height: size, width: size}]}>
      <Text style={[styles.label, {fontSize: size * 0.18}]}>Sequence</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
