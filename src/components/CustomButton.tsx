import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {Colors} from '../config';

const {width} = Dimensions.get('screen');

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
};

export default function CustomButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  icon,
  iconStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          flexDirection: 'row',
          width: width - 40,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: disabled ? Colors.grey : Colors.primary,
          marginTop: 20,
          borderRadius: 60,
          alignSelf: 'center',
        },
        buttonStyle,
      ]}>
      <Text
        style={[
          {
            fontSize: 20,
            color: Colors.white,
          },
          textStyle,
        ]}>
        {title}
      </Text>
      {icon ? (
        <Image
          source={icon}
          style={[
            {
              width: 20,
              height: 20,
              marginLeft: 20,
              resizeMode: 'contain',
            },
            iconStyle,
          ]}
        />
      ) : null}
    </TouchableOpacity>
  );
}
