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
import {Colors} from '../../config';
import {useAuth} from '../../context/AuthContext';
import type {AuthStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function Signup({navigation}: Props) {
  const {register} = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!displayName.trim() || !email.trim() || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing fields',
        text2: 'Fill in name, email, and password',
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Weak password',
        text2: 'Use at least 8 characters',
      });
      return;
    }

    setSubmitting(true);
    try {
      await register({
        displayName: displayName.trim(),
        email: email.trim(),
        password,
      });
    } catch (error) {
      console.error('Sign up failed', error);
      Toast.show({
        type: 'error',
        text1: 'Sign up failed',
        text2: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppBackground title="Create account" back containerStyle={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.title}>Join Sequence</Text>
        <Text style={styles.subtitle}>
          Create an account to host and join online rooms.
        </Text>
      </View>

      <CustomTextInput
        label="Display name"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="words"
        textContentType="name"
        autoComplete="name"
        placeholder="Yahya"
        editable={!submitting}
      />
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
        textContentType="newPassword"
        autoComplete="password-new"
        placeholder="At least 8 characters"
        editable={!submitting}
      />

      <CustomButton
        title={submitting ? 'Creating…' : 'Create Account'}
        onPress={onSubmit}
        disabled={submitting}
      />
      {submitting ? (
        <ActivityIndicator color={Colors.primary} style={styles.spinner} />
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={submitting}
        onPress={() => navigation.navigate('Login')}
        style={styles.switchRow}>
        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text style={styles.switchLink}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  intro: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: Colors.muted,
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
