import {createBoard, findMatchingSpaces} from './boardLayout';
import {
  createDrawPile,
  handSizeFor,
  sequencesToWin,
  shuffle,
} from './deck';
import {
  createEmptyChips,
  findNewSequences,
  markSequencesProtected,
} from './sequences';
import type {
  GameCard,
  GameState,
  Player,
  PlayerColor,
  PlayerCount,
} from './types';

const COLORS: PlayerColor[] = ['blue', 'red', 'green'];

const board = createBoard();

export function getBoard() {
  return board;
}

function drawCards(
  pile: GameCard[],
  count: number,
): {cards: GameCard[]; pile: GameCard[]} {
  const cards = pile.slice(0, count);
  return {cards, pile: pile.slice(count)};
}

function refillFromDiscard(state: GameState): GameState {
  if (state.drawPile.length > 0 || state.discardPile.length === 0) {
    return state;
  }
  return {
    ...state,
    drawPile: shuffle(state.discardPile),
    discardPile: [],
    message: 'Draw pile reshuffled from discard.',
  };
}

function dealInitial(playerCount: PlayerCount): GameState {
  let drawPile = createDrawPile();
  const handSize = handSizeFor(playerCount);
  const players: Player[] = [];

  for (let i = 0; i < playerCount; i += 1) {
    const dealt = drawCards(drawPile, handSize);
    drawPile = dealt.pile;
    players.push({
      id: i,
      name: `Player ${i + 1}`,
      color: COLORS[i],
      hand: dealt.cards,
      discard: [],
      sequences: 0,
    });
  }

  return {
    playerCount,
    players,
    currentPlayerIndex: 0,
    boardChips: createEmptyChips(),
    sequences: [],
    drawPile,
    discardPile: [],
    selectedCardIndex: null,
    phase: 'select_card',
    winnerIndex: null,
    message: `${players[0].name}'s turn — select a card.`,
  };
}

export function createGame(playerCount: PlayerCount): GameState {
  return dealInitial(playerCount);
}

function currentPlayer(state: GameState): Player {
  return state.players[state.currentPlayerIndex];
}

export function isCardDead(state: GameState, card: GameCard): boolean {
  if (card.jackType) {
    return false;
  }
  const spaces = findMatchingSpaces(board, card.id);
  return spaces.every(({row, col}) => state.boardChips[row][col].color !== null);
}

function advanceTurn(state: GameState): GameState {
  const nextIndex = (state.currentPlayerIndex + 1) % state.playerCount;
  const nextPlayer = state.players[nextIndex];
  return {
    ...state,
    currentPlayerIndex: nextIndex,
    selectedCardIndex: null,
    phase: 'select_card',
    message: `${nextPlayer.name}'s turn — select a card.`,
  };
}

function drawReplacement(state: GameState, playerIndex: number): GameState {
  let next = refillFromDiscard(state);
  if (next.drawPile.length === 0) {
    return {
      ...next,
      message: `${next.players[playerIndex].name} could not draw — deck empty.`,
    };
  }

  const [card, ...rest] = next.drawPile;
  const players = next.players.map((player, index) =>
    index === playerIndex
      ? {...player, hand: [...player.hand, card]}
      : player,
  );

  return {
    ...next,
    players,
    drawPile: rest,
  };
}

function finishPlacement(
  state: GameState,
  playerIndex: number,
  cardIndex: number,
  placedRow: number,
  placedCol: number,
): GameState {
  const player = state.players[playerIndex];
  const card = player.hand[cardIndex];
  const hand = player.hand.filter((_, i) => i !== cardIndex);

  let boardChips = state.boardChips.map(row => row.map(cell => ({...cell})));
  boardChips[placedRow][placedCol] = {
    color: player.color,
    protected: false,
  };

  const newSequences = findNewSequences(
    boardChips,
    player.color,
    placedRow,
    placedCol,
    state.sequences,
  );
  const sequences = [...state.sequences, ...newSequences];
  boardChips = markSequencesProtected(boardChips, sequences);

  let players = state.players.map((p, index) => {
    if (index !== playerIndex) {
      return p;
    }
    return {
      ...p,
      hand,
      discard: [...p.discard, card],
      sequences: p.sequences + newSequences.length,
    };
  });

  let next: GameState = {
    ...state,
    players,
    boardChips,
    sequences,
    discardPile: [...state.discardPile, card],
    selectedCardIndex: null,
    phase: 'select_card',
    message:
      newSequences.length > 0
        ? `${player.name} completed ${newSequences.length} sequence${
            newSequences.length > 1 ? 's' : ''
          }!`
        : `${player.name} placed a chip.`,
  };

  const needed = sequencesToWin(state.playerCount);
  if (players[playerIndex].sequences >= needed) {
    return {
      ...next,
      phase: 'game_over',
      winnerIndex: playerIndex,
      message: `${player.name} wins with ${players[playerIndex].sequences} sequence${
        players[playerIndex].sequences > 1 ? 's' : ''
      }!`,
    };
  }

  next = drawReplacement(next, playerIndex);
  return advanceTurn(next);
}

export function selectCard(
  state: GameState,
  cardIndex: number,
): GameState {
  if (state.phase === 'game_over') {
    return state;
  }

  const player = currentPlayer(state);
  const card = player.hand[cardIndex];
  if (!card) {
    return state;
  }

  if (card.jackType === 'one-eyed') {
    return {
      ...state,
      selectedCardIndex: cardIndex,
      phase: 'remove_chip',
      message: 'One-eyed Jack — remove an unprotected opponent chip.',
    };
  }

  if (card.jackType === 'two-eyed') {
    return {
      ...state,
      selectedCardIndex: cardIndex,
      phase: 'place_chip',
      message: 'Two-eyed Jack — place on any open space.',
    };
  }

  if (isCardDead(state, card)) {
    return {
      ...state,
      selectedCardIndex: cardIndex,
      phase: 'select_card',
      message: 'Dead card — tap Discard Dead to replace it, or pick another card.',
    };
  }

  return {
    ...state,
    selectedCardIndex: cardIndex,
    phase: 'place_chip',
    message: 'Select a matching open space on the board.',
  };
}

export function discardDeadCard(state: GameState): GameState {
  if (state.selectedCardIndex === null || state.phase === 'game_over') {
    return state;
  }

  const playerIndex = state.currentPlayerIndex;
  const player = state.players[playerIndex];
  const card = player.hand[state.selectedCardIndex];
  if (!card || !isCardDead(state, card)) {
    return {
      ...state,
      message: 'Selected card is not dead.',
    };
  }

  const hand = player.hand.filter((_, i) => i !== state.selectedCardIndex);
  let next: GameState = {
    ...state,
    players: state.players.map((p, index) =>
      index === playerIndex
        ? {...p, hand, discard: [...p.discard, card]}
        : p,
    ),
    discardPile: [...state.discardPile, card],
    selectedCardIndex: null,
    phase: 'select_card',
    message: `${player.name} discarded a dead card.`,
  };

  next = drawReplacement(next, playerIndex);
  next = {
    ...next,
    message: `${player.name} replaced a dead card — continue your turn.`,
  };
  return next;
}

export function playOnCell(
  state: GameState,
  row: number,
  col: number,
): GameState {
  if (
    state.selectedCardIndex === null ||
    state.phase === 'game_over' ||
    state.phase === 'select_card'
  ) {
    return state;
  }

  const playerIndex = state.currentPlayerIndex;
  const player = state.players[playerIndex];
  const card = player.hand[state.selectedCardIndex];
  if (!card) {
    return state;
  }

  const cell = board[row][col];
  const chip = state.boardChips[row][col];

  if (state.phase === 'remove_chip') {
    if (cell.isFree) {
      return {...state, message: 'Cannot remove a free corner.'};
    }
    if (!chip.color || chip.color === player.color) {
      return {...state, message: 'Select an opponent chip.'};
    }
    if (chip.protected) {
      return {...state, message: 'That chip is locked in a completed sequence.'};
    }

    const boardChips = state.boardChips.map(r => r.map(c => ({...c})));
    boardChips[row][col] = {color: null, protected: false};

    const hand = player.hand.filter((_, i) => i !== state.selectedCardIndex);
    let next: GameState = {
      ...state,
      boardChips,
      players: state.players.map((p, index) =>
        index === playerIndex
          ? {...p, hand, discard: [...p.discard, card]}
          : p,
      ),
      discardPile: [...state.discardPile, card],
      selectedCardIndex: null,
      phase: 'select_card',
      message: `${player.name} removed an opponent chip.`,
    };
    next = drawReplacement(next, playerIndex);
    return advanceTurn(next);
  }

  // place_chip
  if (cell.isFree) {
    return {...state, message: 'Free corners already count for everyone.'};
  }
  if (chip.color) {
    return {...state, message: 'That space is already occupied.'};
  }

  if (card.jackType !== 'two-eyed' && cell.cardId !== card.id) {
    return {...state, message: 'That space does not match the selected card.'};
  }

  return finishPlacement(state, playerIndex, state.selectedCardIndex, row, col);
}

export function clearSelection(state: GameState): GameState {
  if (state.phase === 'game_over') {
    return state;
  }
  return {
    ...state,
    selectedCardIndex: null,
    phase: 'select_card',
    message: `${currentPlayer(state).name}'s turn — select a card.`,
  };
}

export function isCellPlayable(
  state: GameState,
  row: number,
  col: number,
): boolean {
  if (state.selectedCardIndex === null) {
    return false;
  }
  const player = currentPlayer(state);
  const card = player.hand[state.selectedCardIndex];
  if (!card) {
    return false;
  }

  const cell = board[row][col];
  const chip = state.boardChips[row][col];

  if (state.phase === 'remove_chip') {
    return (
      !cell.isFree &&
      chip.color !== null &&
      chip.color !== player.color &&
      !chip.protected
    );
  }

  if (state.phase !== 'place_chip') {
    return false;
  }

  if (cell.isFree || chip.color) {
    return false;
  }

  if (card.jackType === 'two-eyed') {
    return true;
  }

  return cell.cardId === card.id;
}
