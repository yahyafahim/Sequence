import {Dimensions} from 'react-native';
import Cards, {type CardSvg} from '../../assets/cards';

const {width} = Dimensions.get('window');

const cardWidths = (width - 50) / 10;
const cardHeights = cardWidths * 1.452;

export type BoardCard = {
  title: string;
  Card: CardSvg;
};

const row1: BoardCard[] = [
  {title: 'Joker', Card: Cards.red_joker},
  {title: 'six_of_diamonds', Card: Cards.six_of_diamonds},
  {title: 'seven_of_diamonds', Card: Cards.seven_of_diamonds},
  {title: 'eight_of_diamonds', Card: Cards.eight_of_diamonds},
  {title: 'nine_of_diamonds', Card: Cards.nine_of_diamonds},
  {title: 'ten_of_diamonds', Card: Cards.ten_of_diamonds},
  {title: 'queen_of_diamonds', Card: Cards.queen_of_diamonds},
  {title: 'king_of_diamonds', Card: Cards.king_of_diamonds},
  {title: 'ace_of_diamonds', Card: Cards.ace_of_diamonds},
  {title: 'black_joker', Card: Cards.black_joker},
];

const row2: BoardCard[] = [
  {title: 'five_of_diamonds', Card: Cards.five_of_diamonds},
  {title: 'three_of_hearts', Card: Cards.three_of_hearts},
  {title: 'two_of_hearts', Card: Cards.two_of_hearts},
  {title: 'two_of_spades', Card: Cards.two_of_spades},
  {title: 'three_of_spades', Card: Cards.three_of_spades},
  {title: 'four_of_spades', Card: Cards.four_of_spades},
  {title: 'five_of_spades', Card: Cards.five_of_spades},
  {title: 'six_of_spades', Card: Cards.six_of_spades},
  {title: 'seven_of_spades', Card: Cards.seven_of_spades},
  {title: 'ace_of_clubs', Card: Cards.ace_of_clubs},
];

const row3: BoardCard[] = [
  {title: 'four_of_diamonds', Card: Cards.four_of_diamonds},
  {title: 'four_of_hearts', Card: Cards.four_of_hearts},
  {title: 'king_of_diamonds', Card: Cards.king_of_diamonds},
  {title: 'ace_of_diamonds', Card: Cards.ace_of_diamonds},
  {title: 'ace_of_clubs', Card: Cards.ace_of_clubs},
  {title: 'king_of_clubs', Card: Cards.king_of_clubs},
  {title: 'queen_of_clubs', Card: Cards.queen_of_clubs},
  {title: 'ten_of_clubs', Card: Cards.ten_of_clubs},
  {title: 'eight_of_spades', Card: Cards.eight_of_spades},
  {title: 'king_of_clubs', Card: Cards.king_of_clubs},
];

const row4: BoardCard[] = [
  {title: 'three_of_diamonds', Card: Cards.three_of_diamonds},
  {title: 'five_of_hearts', Card: Cards.five_of_hearts},
  {title: 'queen_of_diamonds', Card: Cards.queen_of_diamonds},
  {title: 'queen_of_hearts', Card: Cards.queen_of_hearts},
  {title: 'ten_of_hearts', Card: Cards.ten_of_hearts},
  {title: 'nine_of_hearts', Card: Cards.nine_of_hearts},
  {title: 'eight_of_hearts', Card: Cards.eight_of_hearts},
  {title: 'nine_of_clubs', Card: Cards.nine_of_clubs},
  {title: 'nine_of_spades', Card: Cards.nine_of_spades},
  {title: 'queen_of_clubs', Card: Cards.queen_of_clubs},
];

const row5: BoardCard[] = [
  {title: 'two_of_diamonds', Card: Cards.two_of_diamonds},
  {title: 'six_of_hearts', Card: Cards.six_of_hearts},
  {title: 'ten_of_diamonds', Card: Cards.ten_of_diamonds},
  {title: 'king_of_hearts', Card: Cards.king_of_hearts},
  {title: 'three_of_hearts', Card: Cards.three_of_hearts},
  {title: 'two_of_hearts', Card: Cards.two_of_hearts},
  {title: 'seven_of_hearts', Card: Cards.seven_of_hearts},
  {title: 'eight_of_clubs', Card: Cards.eight_of_clubs},
  {title: 'ten_of_spades', Card: Cards.ten_of_spades},
  {title: 'ten_of_clubs', Card: Cards.ten_of_clubs},
];

const row6: BoardCard[] = [
  {title: 'ace_of_spades', Card: Cards.ace_of_spades},
  {title: 'seven_of_hearts', Card: Cards.seven_of_hearts},
  {title: 'nine_of_diamonds', Card: Cards.nine_of_diamonds},
  {title: 'ace_of_hearts', Card: Cards.ace_of_hearts},
  {title: 'four_of_hearts', Card: Cards.four_of_hearts},
  {title: 'five_of_hearts', Card: Cards.five_of_hearts},
  {title: 'six_of_hearts', Card: Cards.six_of_hearts},
  {title: 'seven_of_clubs', Card: Cards.seven_of_clubs},
  {title: 'queen_of_spades', Card: Cards.queen_of_spades},
  {title: 'nine_of_clubs', Card: Cards.nine_of_clubs},
];

const row7: BoardCard[] = [
  {title: 'king_of_spades', Card: Cards.king_of_spades},
  {title: 'eight_of_hearts', Card: Cards.eight_of_hearts},
  {title: 'eight_of_diamonds', Card: Cards.eight_of_diamonds},
  {title: 'two_of_clubs', Card: Cards.two_of_clubs},
  {title: 'three_of_clubs', Card: Cards.three_of_clubs},
  {title: 'four_of_clubs', Card: Cards.four_of_clubs},
  {title: 'five_of_clubs', Card: Cards.five_of_clubs},
  {title: 'six_of_clubs', Card: Cards.six_of_clubs},
  {title: 'king_of_spades', Card: Cards.king_of_spades},
  {title: 'eight_of_clubs', Card: Cards.eight_of_clubs},
];

const row8: BoardCard[] = [
  {title: 'queen_of_spades', Card: Cards.queen_of_spades},
  {title: 'nine_of_hearts', Card: Cards.nine_of_hearts},
  {title: 'seven_of_diamonds', Card: Cards.seven_of_diamonds},
  {title: 'six_of_diamonds', Card: Cards.six_of_diamonds},
  {title: 'five_of_diamonds', Card: Cards.five_of_diamonds},
  {title: 'four_of_diamonds', Card: Cards.four_of_diamonds},
  {title: 'three_of_diamonds', Card: Cards.three_of_diamonds},
  {title: 'two_of_diamonds', Card: Cards.two_of_diamonds},
  {title: 'ace_of_spades', Card: Cards.ace_of_spades},
  {title: 'seven_of_clubs', Card: Cards.seven_of_clubs},
];

const row9: BoardCard[] = [
  {title: 'ten_of_spades', Card: Cards.ten_of_spades},
  {title: 'ten_of_hearts', Card: Cards.ten_of_hearts},
  {title: 'queen_of_hearts', Card: Cards.queen_of_hearts},
  {title: 'king_of_hearts', Card: Cards.king_of_hearts},
  {title: 'ace_of_hearts', Card: Cards.ace_of_hearts},
  {title: 'two_of_clubs', Card: Cards.two_of_clubs},
  {title: 'three_of_clubs', Card: Cards.three_of_clubs},
  {title: 'four_of_clubs', Card: Cards.four_of_clubs},
  {title: 'five_of_clubs', Card: Cards.five_of_clubs},
  {title: 'six_of_clubs', Card: Cards.six_of_clubs},
];

const row10: BoardCard[] = [
  {title: 'black_joker', Card: Cards.black_joker},
  {title: 'nine_of_spades', Card: Cards.nine_of_spades},
  {title: 'eight_of_spades', Card: Cards.eight_of_spades},
  {title: 'seven_of_spades', Card: Cards.seven_of_spades},
  {title: 'six_of_spades', Card: Cards.six_of_spades},
  {title: 'five_of_spades', Card: Cards.five_of_spades},
  {title: 'four_of_spades', Card: Cards.four_of_spades},
  {title: 'three_of_spades', Card: Cards.three_of_spades},
  {title: 'two_of_spades', Card: Cards.two_of_spades},
  {title: 'red_joker', Card: Cards.red_joker},
];

const board = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10];

const deckOfCards: BoardCard[] = [
  {title: 'two_of_clubs', Card: Cards.two_of_clubs},
  {title: 'two_of_diamonds', Card: Cards.two_of_diamonds},
  {title: 'two_of_hearts', Card: Cards.two_of_hearts},
  {title: 'two_of_spades', Card: Cards.two_of_spades},
  {title: 'three_of_clubs', Card: Cards.three_of_clubs},
  {title: 'three_of_diamonds', Card: Cards.three_of_diamonds},
  {title: 'three_of_hearts', Card: Cards.three_of_hearts},
  {title: 'three_of_spades', Card: Cards.three_of_spades},
  {title: 'four_of_clubs', Card: Cards.four_of_clubs},
  {title: 'four_of_diamonds', Card: Cards.four_of_diamonds},
  {title: 'four_of_hearts', Card: Cards.four_of_hearts},
  {title: 'four_of_spades', Card: Cards.four_of_spades},
  {title: 'five_of_clubs', Card: Cards.five_of_clubs},
  {title: 'five_of_diamonds', Card: Cards.five_of_diamonds},
  {title: 'five_of_hearts', Card: Cards.five_of_hearts},
  {title: 'five_of_spades', Card: Cards.five_of_spades},
  {title: 'six_of_clubs', Card: Cards.six_of_clubs},
  {title: 'six_of_diamonds', Card: Cards.six_of_diamonds},
  {title: 'six_of_hearts', Card: Cards.six_of_hearts},
  {title: 'six_of_spades', Card: Cards.six_of_spades},
  {title: 'seven_of_clubs', Card: Cards.seven_of_clubs},
  {title: 'seven_of_diamonds', Card: Cards.seven_of_diamonds},
  {title: 'seven_of_hearts', Card: Cards.seven_of_hearts},
  {title: 'seven_of_spades', Card: Cards.seven_of_spades},
  {title: 'eight_of_clubs', Card: Cards.eight_of_clubs},
  {title: 'eight_of_diamonds', Card: Cards.eight_of_diamonds},
  {title: 'eight_of_hearts', Card: Cards.eight_of_hearts},
  {title: 'eight_of_spades', Card: Cards.eight_of_spades},
  {title: 'nine_of_clubs', Card: Cards.nine_of_clubs},
  {title: 'nine_of_diamonds', Card: Cards.nine_of_diamonds},
  {title: 'nine_of_hearts', Card: Cards.nine_of_hearts},
  {title: 'nine_of_spades', Card: Cards.nine_of_spades},
  {title: 'ten_of_clubs', Card: Cards.ten_of_clubs},
  {title: 'ten_of_diamonds', Card: Cards.ten_of_diamonds},
  {title: 'ten_of_hearts', Card: Cards.ten_of_hearts},
  {title: 'ten_of_spades', Card: Cards.ten_of_spades},
  {title: 'jack_of_clubs', Card: Cards.jack_of_clubs},
  {title: 'jack_of_diamonds', Card: Cards.jack_of_diamonds},
  {title: 'jack_of_hearts', Card: Cards.jack_of_hearts},
  {title: 'jack_of_spades', Card: Cards.jack_of_spades},
  {title: 'queen_of_clubs', Card: Cards.queen_of_clubs},
  {title: 'queen_of_diamonds', Card: Cards.queen_of_diamonds},
  {title: 'queen_of_hearts', Card: Cards.queen_of_hearts},
  {title: 'queen_of_spades', Card: Cards.queen_of_spades},
  {title: 'king_of_clubs', Card: Cards.king_of_clubs},
  {title: 'king_of_diamonds', Card: Cards.king_of_diamonds},
  {title: 'king_of_hearts', Card: Cards.king_of_hearts},
  {title: 'king_of_spades', Card: Cards.king_of_spades},
  {title: 'ace_of_clubs', Card: Cards.ace_of_clubs},
  {title: 'ace_of_diamonds', Card: Cards.ace_of_diamonds},
  {title: 'ace_of_hearts', Card: Cards.ace_of_hearts},
  {title: 'ace_of_spades', Card: Cards.ace_of_spades},
];

export {cardHeights, cardWidths, board, deckOfCards};
