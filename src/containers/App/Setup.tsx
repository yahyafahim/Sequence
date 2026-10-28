import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../../config';
import {ChipSvgs} from '../../assets/chips';
import {useAuth} from '../../context/AuthContext';
import type {AppStackParamList} from '../../types/navigation';
import type {PlayerCount} from '../../game/types';
import {handSizeFor, sequencesToWin} from '../../game/deck';

type Props = NativeStackScreenProps<AppStackParamList, 'Setup'>;

const OPTIONS: PlayerCount[] = [2, 3];

export default function Setup({navigation}: Props) {
  const {user, logout} = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const start = (playerCount: PlayerCount) => {
    navigation.replace('Game', {playerCount});
  };

  const onLogout = async () => {
    if (signingOut) {
      return;
    }
    setSigningOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Sign out failed', error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.brand}>Sequence</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout}
            disabled={signingOut}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>
              {signingOut ? '…' : 'Sign out'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>
          {user ? `Hi, ${user.displayName}` : 'Welcome'}
        </Text>
        <Text style={styles.subtitle}>
          Choose players. First to complete the required sequences wins.
        </Text>

        <View style={styles.chipsRow}>
          <ChipSvgs.blue width={36} height={36} />
          <ChipSvgs.red width={36} height={36} />
          <ChipSvgs.green width={36} height={36} />
        </View>

        {OPTIONS.map(count => (
          <TouchableOpacity
            key={count}
            style={styles.option}
            activeOpacity={0.85}
            onPress={() => start(count)}>
            <Text style={styles.optionTitle}>
              {count} Players
            </Text>
            <Text style={styles.optionMeta}>
              {handSizeFor(count)} cards each · first to{' '}
              {sequencesToWin(count)} sequence
              {sequencesToWin(count) > 1 ? 's' : ''}
            </Text>
            <Text style={styles.optionColors}>
              {count === 2 ? 'Blue vs Red' : 'Blue · Red · Green'}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.rules}>
          <Text style={styles.rulesTitle}>Quick rules</Text>
          <Text style={styles.rulesText}>
            Play a card, place a matching chip, then draw. Corners are FREE for
            every sequence. Two-eyed Jacks are wild; one-eyed Jacks remove an
            unprotected opponent chip. Completed sequences are locked.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primarySoft,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  greeting: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.muted,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 24,
  },
  option: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  optionMeta: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.muted,
  },
  optionColors: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  rules: {
    marginTop: 'auto',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 6,
  },
  rulesText: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.text,
  },
});
