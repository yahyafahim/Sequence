import React, {useMemo, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import GameBoard from '../../components/GameBoard';
import PlayerHand from '../../components/PlayerHand';
import {ChipSvgs} from '../../assets/chips';
import {Colors} from '../../config';
import {
  clearSelection,
  createGame,
  discardDeadCard,
  isCardDead,
  playOnCell,
  selectCard,
} from '../../game/engine';
import {sequencesToWin} from '../../game/deck';
import type {GameState} from '../../game/types';
import type {AppStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'Game'>;

export default function Game({navigation, route}: Props) {
  const {playerCount} = route.params;
  const [state, setState] = useState<GameState>(() => createGame(playerCount));

  const selectedIsDead = useMemo(() => {
    if (state.selectedCardIndex === null) {
      return false;
    }
    const card =
      state.players[state.currentPlayerIndex].hand[state.selectedCardIndex];
    return card ? isCardDead(state, card) : false;
  }, [state]);

  const needed = sequencesToWin(playerCount);

  const onSelectCard = (index: number) => {
    if (state.phase === 'game_over') {
      return;
    }
    setState(prev =>
      prev.selectedCardIndex === index
        ? clearSelection(prev)
        : selectCard(prev, index),
    );
  };

  const onPressCell = (row: number, col: number) => {
    setState(prev => {
      const next = playOnCell(prev, row, col);
      if (next.phase === 'game_over' && next.winnerIndex !== null) {
        const winner = next.players[next.winnerIndex];
        setTimeout(() => {
          Alert.alert(
            'Game over',
            `${winner.name} (${winner.color}) wins!`,
            [
              {
                text: 'Play again',
                onPress: () => setState(createGame(playerCount)),
              },
              {
                text: 'Setup',
                onPress: () => navigation.replace('Setup'),
              },
            ],
          );
        }, 50);
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.replace('Setup')}>
          <Text style={styles.link}>Setup</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sequence</Text>
        <TouchableOpacity onPress={() => setState(createGame(playerCount))}>
          <Text style={styles.link}>Restart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scoreRow}>
        {state.players.map(player => {
          const Chip = ChipSvgs[player.color];
          const active = state.players[state.currentPlayerIndex].id === player.id;
          return (
            <View
              key={player.id}
              style={[styles.scoreCard, active && styles.scoreActive]}>
              <Chip width={18} height={18} />
              <Text style={styles.scoreName}>{player.name}</Text>
              <Text style={styles.scoreValue}>
                {player.sequences}/{needed}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.message}>{state.message}</Text>

      <ScrollView
        contentContainerStyle={styles.boardWrap}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <GameBoard state={state} onPressCell={onPressCell} />
      </ScrollView>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>Draw: {state.drawPile.length}</Text>
        <Text style={styles.meta}>
          Phase:{' '}
          {state.phase === 'place_chip'
            ? 'Place chip'
            : state.phase === 'remove_chip'
              ? 'Remove chip'
              : state.phase === 'game_over'
                ? 'Finished'
                : 'Select card'}
        </Text>
      </View>

      {state.phase !== 'game_over' ? (
        <PlayerHand state={state} onSelectCard={onSelectCard} />
      ) : null}

      <View style={styles.actions}>
        {selectedIsDead ? (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setState(prev => discardDeadCard(prev))}>
            <Text style={styles.primaryBtnText}>Discard Dead Card</Text>
          </TouchableOpacity>
        ) : null}
        {state.selectedCardIndex !== null && state.phase !== 'game_over' ? (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setState(prev => clearSelection(prev))}>
            <Text style={styles.secondaryBtnText}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.muted,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  scoreCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  scoreActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  scoreName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  message: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 6,
    fontSize: 13,
    color: Colors.text,
    minHeight: 36,
  },
  boardWrap: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 2,
  },
  meta: {
    fontSize: 11,
    color: Colors.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.white,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
  },
  secondaryBtnText: {
    color: Colors.text,
    fontWeight: '600',
  },
});
