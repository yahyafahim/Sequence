import React, {type PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    <SafeAreaView
      style={styles.safeArea}
      edges={showHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right', 'bottom']}>
      {showHeader ? <Header title={title} back={back} /> : null}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, containerStyle]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBackground;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
