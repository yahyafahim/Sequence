import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  boardGap,
  boardPadding,
  cardHeights,
  cardWidths,
} from '../config/Constants';
import {Colors} from '../config';
import {getBoard, isCellPlayable} from '../game/engine';
import type {GameState} from '../game/types';
import Chip from './Chip';

type GameBoardProps = {
  state: GameState;
  onPressCell: (row: number, col: number) => void;
};

export default function GameBoard({state, onPressCell}: GameBoardProps) {
  const board = getBoard();

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View style={styles.row} key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => {
            const chip = state.boardChips[rowIndex][colIndex];
            const playable = isCellPlayable(state, rowIndex, colIndex);
            const CardSvg = cell.Svg;

            return (
              <TouchableOpacity
                key={`cell-${rowIndex}-${colIndex}`}
                activeOpacity={0.85}
                disabled={!playable}
                onPress={() => onPressCell(rowIndex, colIndex)}
                style={[
                  styles.cell,
                  playable && styles.playable,
                  cell.isFree && styles.freeCell,
                ]}>
                {cell.isFree ? (
                  <View style={styles.freeInner}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                ) : CardSvg ? (
                  <CardSvg width={cardWidths} height={cardHeights} />
                ) : null}
                {chip.color ? (
                  <Chip
                    color={chip.color}
                    size={cardWidths * 0.72}
                    locked={chip.protected}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: Colors.board,
    padding: boardPadding,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: boardGap,
  },
  cell: {
    width: cardWidths,
    height: cardHeights,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  playable: {
    borderWidth: 2,
    borderColor: Colors.highlight,
  },
  freeCell: {
    backgroundColor: Colors.free,
  },
  freeInner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeText: {
    fontSize: Math.max(7, cardWidths * 0.22),
    fontWeight: '800',
    color: Colors.primary,
  },
});
