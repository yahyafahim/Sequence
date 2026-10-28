import React, {type PropsWithChildren} from 'react';
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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Navigation from './src';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  return (
    <SafeAreaProvider>
      <Wrapper>
        <GestureHandlerRootView style={styles.flex}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
          <Toast />
        </GestureHandlerRootView>
      </Wrapper>
    </SafeAreaProvider>
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
