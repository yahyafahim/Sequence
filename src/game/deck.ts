import Cards from '../assets/cards';
import type {CardId, GameCard, JackType, PlayerCount} from './types';

const STANDARD_CARD_IDS: CardId[] = [
  'two_of_clubs',
  'two_of_diamonds',
  'two_of_hearts',
  'two_of_spades',
  'three_of_clubs',
  'three_of_diamonds',
  'three_of_hearts',
  'three_of_spades',
  'four_of_clubs',
  'four_of_diamonds',
  'four_of_hearts',
  'four_of_spades',
  'five_of_clubs',
  'five_of_diamonds',
  'five_of_hearts',
  'five_of_spades',
  'six_of_clubs',
  'six_of_diamonds',
  'six_of_hearts',
  'six_of_spades',
  'seven_of_clubs',
  'seven_of_diamonds',
  'seven_of_hearts',
  'seven_of_spades',
  'eight_of_clubs',
  'eight_of_diamonds',
  'eight_of_hearts',
  'eight_of_spades',
  'nine_of_clubs',
  'nine_of_diamonds',
  'nine_of_hearts',
  'nine_of_spades',
  'ten_of_clubs',
  'ten_of_diamonds',
  'ten_of_hearts',
  'ten_of_spades',
  'jack_of_clubs',
  'jack_of_diamonds',
  'jack_of_hearts',
  'jack_of_spades',
  'queen_of_clubs',
  'queen_of_diamonds',
  'queen_of_hearts',
  'queen_of_spades',
  'king_of_clubs',
  'king_of_diamonds',
  'king_of_hearts',
  'king_of_spades',
  'ace_of_clubs',
  'ace_of_diamonds',
  'ace_of_hearts',
  'ace_of_spades',
];

function jackTypeFor(id: CardId): JackType {
  if (id === 'jack_of_clubs' || id === 'jack_of_diamonds') {
    return 'two-eyed';
  }
  if (id === 'jack_of_hearts' || id === 'jack_of_spades') {
    return 'one-eyed';
  }
  return null;
}

let uidCounter = 0;

function makeCard(id: CardId): GameCard {
  uidCounter += 1;
  return {
    uid: `${id}_${uidCounter}`,
    id,
    jackType: jackTypeFor(id),
    Svg: Cards[id],
  };
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Sequence uses two full decks (104 cards). */
export function createDrawPile(): GameCard[] {
  uidCounter = 0;
  const cards: GameCard[] = [];
  for (let deck = 0; deck < 2; deck += 1) {
    for (const id of STANDARD_CARD_IDS) {
      cards.push(makeCard(id));
    }
  }
  return shuffle(cards);
}

export function handSizeFor(playerCount: PlayerCount): number {
  return playerCount === 2 ? 7 : 6;
}

export function sequencesToWin(_playerCount: PlayerCount): number {
  // Per game rules: first to 3 sequences wins (2 or 3 players/teams).
  return 3;
}
