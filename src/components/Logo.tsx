import React from 'react';
import {Image} from 'react-native';
import Images from '../assets/Images';

type LogoProps = {
  size?: number;
};

export default function Logo({size = 170}: LogoProps) {
  return (
    <Image
      source={Images.logoSmall}
      style={{height: size, width: size}}
      resizeMode="contain"
    />
  );
}
