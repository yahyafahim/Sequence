import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {boardGap, boardPadding} from '../config/Constants';
import {Colors} from '../config';
import {getBoard, isCellPlayable} from '../game/engine';
import type {GameState} from '../game/types';
import Chip from './Chip';

type GameBoardProps = {
  state: GameState;
  cellWidth: number;
  cellHeight: number;
  onPressCell: (row: number, col: number) => void;
};

export default function GameBoard({
  state,
  cellWidth,
  cellHeight,
  onPressCell,
}: GameBoardProps) {
  const board = getBoard();

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View
          style={[styles.row, rowIndex < 9 && {marginBottom: boardGap}]}
          key={`row-${rowIndex}`}>
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
                  {
                    width: cellWidth,
                    height: cellHeight,
                  },
                  playable && styles.playable,
                  cell.isFree && styles.freeCell,
                ]}>
                {cell.isFree ? (
                  <View style={styles.freeInner}>
                    <Text
                      style={[
                        styles.freeText,
                        {fontSize: Math.max(6, cellWidth * 0.2)},
                      ]}>
                      FREE
                    </Text>
                  </View>
                ) : CardSvg ? (
                  <CardSvg width={cellWidth} height={cellHeight} />
                ) : null}
                {chip.color ? (
                  <Chip
                    color={chip.color}
                    size={Math.min(cellWidth, cellHeight) * 0.72}
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
    borderRadius: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: boardGap,
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
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
    fontWeight: '800',
    color: Colors.primary,
  },
});
