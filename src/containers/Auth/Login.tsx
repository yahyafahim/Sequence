import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import AppBackground from '../../components/AppBackground';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Logo from '../../components/Logo';
import {Colors} from '../../config';
import {useAuth} from '../../context/AuthContext';
import type {AuthStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function Login({navigation}: Props) {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing fields',
        text2: 'Enter your email and password',
      });
      return;
    }

    setSubmitting(true);
    try {
      await login({email: email.trim(), password});
    } catch (error) {
      console.error('Sign in failed', error);
      Toast.show({
        type: 'error',
        text1: 'Sign in failed',
        text2: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppBackground showHeader={false} containerStyle={styles.container}>
      <View style={styles.hero}>
        <Logo size={120} />
        <Text style={styles.subtitle}>Sign in to play online Sequence</Text>
      </View>

      <CustomTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="you@example.com"
        editable={!submitting}
      />
      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        autoComplete="password"
        placeholder="••••••••"
        editable={!submitting}
      />

      <CustomButton
        title={submitting ? 'Signing in…' : 'Sign In'}
        onPress={onSubmit}
        disabled={submitting}
      />
      {submitting ? (
        <ActivityIndicator color={Colors.primary} style={styles.spinner} />
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={submitting}
        onPress={() => navigation.navigate('Signup')}
        style={styles.switchRow}>
        <Text style={styles.switchText}>
          New here? <Text style={styles.switchLink}>Create an account</Text>
        </Text>
      </TouchableOpacity>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.muted,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 12,
  },
  switchRow: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 15,
    color: Colors.muted,
  },
  switchLink: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
