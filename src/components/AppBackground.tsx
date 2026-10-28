import React, {type PropsWithChildren} from 'react';
import {ScrollView, View, type StyleProp, type ViewStyle} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../config';
import Header from './Header';

type AppBackgroundProps = PropsWithChildren<{
  title?: string;
  back?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  showHeader?: boolean;
}>;

const AppBackground = ({
  children,
  title,
  back = false,
  containerStyle = {},
  showHeader = true,
}: AppBackgroundProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: showHeader ? 0 : getStatusBarHeight(),
      }}>
      {showHeader ? <Header title={title} back={back} /> : null}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingBottom: 20,
          },
          containerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default AppBackground;
