import {BOARD_SIZE} from './boardLayout';
import type {ChipCell, PlayerColor, SequenceLine} from './types';

const DIRECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

const FREE_CORNERS = new Set(['0,0', '0,9', '9,0', '9,9']);

function key(row: number, col: number) {
  return `${row},${col}`;
}

function isFreeCorner(row: number, col: number) {
  return FREE_CORNERS.has(key(row, col));
}

function belongsToPlayer(
  chips: ChipCell[][],
  row: number,
  col: number,
  color: PlayerColor,
) {
  if (isFreeCorner(row, col)) {
    return true;
  }
  return chips[row]?.[col]?.color === color;
}

function collectLine(
  chips: ChipCell[][],
  startRow: number,
  startCol: number,
  dRow: number,
  dCol: number,
  color: PlayerColor,
): Array<{row: number; col: number}> {
  const cells: Array<{row: number; col: number}> = [];
  let row = startRow;
  let col = startCol;

  while (
    row >= 0 &&
    row < BOARD_SIZE &&
    col >= 0 &&
    col < BOARD_SIZE &&
    belongsToPlayer(chips, row, col, color)
  ) {
    cells.push({row, col});
    row += dRow;
    col += dCol;
  }

  return cells;
}

function linesShareMoreThanOne(
  a: Array<{row: number; col: number}>,
  b: Array<{row: number; col: number}>,
) {
  const setA = new Set(a.map(c => key(c.row, c.col)));
  let shared = 0;
  for (const cell of b) {
    if (setA.has(key(cell.row, cell.col))) {
      shared += 1;
      if (shared > 1) {
        return true;
      }
    }
  }
  return false;
}

function sameSequence(
  a: Array<{row: number; col: number}>,
  b: Array<{row: number; col: number}>,
) {
  if (a.length !== b.length) {
    return false;
  }
  const setA = new Set(a.map(c => key(c.row, c.col)));
  return b.every(c => setA.has(key(c.row, c.col)));
}

/**
 * After a chip is placed, find newly completed sequences for that color.
 * Supports the 9-chip = 2 sequences rule for 2-player games.
 */
export function findNewSequences(
  chips: ChipCell[][],
  color: PlayerColor,
  placedRow: number,
  placedCol: number,
  existing: SequenceLine[],
): SequenceLine[] {
  const candidates: Array<Array<{row: number; col: number}>> = [];

  for (const [dRow, dCol] of DIRECTIONS) {
    const forward = collectLine(
      chips,
      placedRow + dRow,
      placedCol + dCol,
      dRow,
      dCol,
      color,
    );
    const backward = collectLine(
      chips,
      placedRow - dRow,
      placedCol - dCol,
      -dRow,
      -dCol,
      color,
    );
    const line = [
      ...backward.reverse(),
      {row: placedRow, col: placedCol},
      ...forward,
    ];

    if (line.length < 5) {
      continue;
    }

    // Every contiguous window of 5 that includes the newly placed chip.
    for (let start = 0; start <= line.length - 5; start += 1) {
      const window = line.slice(start, start + 5);
      const includesPlaced = window.some(
        c => c.row === placedRow && c.col === placedCol,
      );
      if (includesPlaced) {
        candidates.push(window);
      }
    }

    // A straight run of 9 counts as two sequences in 2-player games;
    // windows already cover that (0-4 and 4-8 share the center).
  }

  const owned = existing.filter(seq => seq.owner === color);
  const accepted: SequenceLine[] = [];

  for (const candidate of candidates) {
    const alreadyKnown =
      owned.some(seq => sameSequence(seq.cells, candidate)) ||
      accepted.some(seq => sameSequence(seq.cells, candidate));
    if (alreadyKnown) {
      continue;
    }

    const conflicts =
      owned.some(seq => linesShareMoreThanOne(seq.cells, candidate)) ||
      accepted.some(seq => linesShareMoreThanOne(seq.cells, candidate));
    if (conflicts) {
      continue;
    }

    accepted.push({cells: candidate, owner: color});
  }

  return accepted;
}

export function markSequencesProtected(
  chips: ChipCell[][],
  sequences: SequenceLine[],
): ChipCell[][] {
  const next = chips.map(row => row.map(cell => ({...cell})));
  for (const sequence of sequences) {
    for (const cell of sequence.cells) {
      if (!isFreeCorner(cell.row, cell.col)) {
        next[cell.row][cell.col].protected = true;
      }
    }
  }
  return next;
}

export function createEmptyChips(): ChipCell[][] {
  return Array.from({length: BOARD_SIZE}, () =>
    Array.from({length: BOARD_SIZE}, () => ({
      color: null,
      protected: false,
    })),
  );
}
