import React, {useMemo, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import GameBoard from '../../components/GameBoard';
import PlayerHand from '../../components/PlayerHand';
import {ChipSvgs} from '../../assets/chips';
import {Colors} from '../../config';
import {computeBoardCellSize} from '../../config/Constants';
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
  const [boardArea, setBoardArea] = useState({width: 0, height: 0});

  const selectedIsDead = useMemo(() => {
    if (state.selectedCardIndex === null) {
      return false;
    }
    const card =
      state.players[state.currentPlayerIndex].hand[state.selectedCardIndex];
    return card ? isCardDead(state, card) : false;
  }, [state]);

  const needed = sequencesToWin(playerCount);
  const showActions =
    selectedIsDead ||
    (state.selectedCardIndex !== null && state.phase !== 'game_over');

  const {cardWidth, cardHeight} = useMemo(
    () => computeBoardCellSize(boardArea.width, boardArea.height),
    [boardArea.height, boardArea.width],
  );

  const onBoardLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setBoardArea(prev =>
      prev.width === width && prev.height === height
        ? prev
        : {width, height},
    );
  };

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
          Alert.alert('Game over', `${winner.name} (${winner.color}) wins!`, [
            {
              text: 'Play again',
              onPress: () => setState(createGame(playerCount)),
            },
            {
              text: 'Setup',
              onPress: () => navigation.replace('Setup'),
            },
          ]);
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
          const active =
            state.players[state.currentPlayerIndex].id === player.id;
          return (
            <View
              key={player.id}
              style={[styles.scoreCard, active && styles.scoreActive]}>
              <Chip width={16} height={16} />
              <Text style={styles.scoreName} numberOfLines={1}>
                {player.name}
              </Text>
              <Text style={styles.scoreValue}>
                {player.sequences}/{needed}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.boardArea} onLayout={onBoardLayout}>
        {boardArea.width > 0 && boardArea.height > 0 ? (
          <GameBoard
            state={state}
            cellWidth={cardWidth}
            cellHeight={cardHeight}
            onPressCell={onPressCell}
          />
        ) : null}
      </View>

      {state.phase !== 'game_over' ? (
        <PlayerHand state={state} onSelectCard={onSelectCard} />
      ) : null}

      {showActions ? (
        <View style={styles.actions}>
          {selectedIsDead ? (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setState(prev => discardDeadCard(prev))}>
              <Text style={styles.primaryBtnText}>Discard Dead</Text>
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
      ) : null}
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
    paddingHorizontal: 14,
    paddingBottom: 2,
    flexShrink: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.muted,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    marginBottom: 4,
    flexShrink: 0,
  },
  scoreCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  scoreActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  scoreName: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
  },
  scoreValue: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  boardArea: {
    flex: 1,
    minHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 4,
    flexShrink: 0,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: Colors.danger,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryBtn: {
    paddingHorizontal: 14,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
  },
  secondaryBtnText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
});
