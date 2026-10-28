import React, {type PropsWithChildren, useEffect} from 'react';
import {
  View,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Orientation from 'react-native-orientation-locker';
import Navigation from './src';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.flex}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
        <Toast />
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

function Wrapper({children}: PropsWithChildren) {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  }

  return <View style={styles.flex}>{children}</View>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
});
