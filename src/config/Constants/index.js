import Images from '../../assets/Images';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const cardWidths = (width - 50) / 10;
const cardHeights = cardWidths * 1.452;

const row1 = [
  {title: 'Joker', image: Images.red_joker},
  {title: 'six_of_diamonds', image: Images.six_of_diamonds},
  {title: 'seven_of_diamonds', image: Images.seven_of_diamonds},
  {title: 'eight_of_diamonds', image: Images.eight_of_diamonds},
  {title: 'nine_of_diamonds', image: Images.nine_of_diamonds},
  {title: 'ten_of_diamonds', image: Images.ten_of_diamonds},
  {title: 'queen_of_diamonds', image: Images.queen_of_diamonds},
  {title: 'king_of_diamonds', image: Images.king_of_diamonds},
  {title: 'ace_of_diamonds', image: Images.ace_of_diamonds},
  {title: 'black_joker', image: Images.black_joker},
];

const row2 = [
  {title: 'five_of_diamonds', image: Images.five_of_diamonds},
  {title: 'three_of_hearts', image: Images.three_of_hearts},
  {title: 'two_of_hearts', image: Images.two_of_hearts},
  {title: 'two_of_spades', image: Images.two_of_spades},
  {title: 'three_of_spades', image: Images.three_of_spades},
  {title: 'four_of_spades', image: Images.four_of_spades},
  {title: 'five_of_spades', image: Images.five_of_spades},
  {title: 'six_of_spades', image: Images.six_of_spades},
  {title: 'seven_of_spades', image: Images.seven_of_spades},
  {title: 'ace_of_clubs', image: Images.ace_of_clubs},
];

const row3 = [
  {title: 'four_of_diamonds', image: Images.four_of_diamonds},
  {title: 'four_of_hearts', image: Images.four_of_hearts},
  {title: 'king_of_diamonds', image: Images.king_of_diamonds},
  {title: 'ace_of_diamonds', image: Images.ace_of_diamonds},
  {title: 'ace_of_clubs', image: Images.ace_of_clubs},
  {title: 'king_of_clubs', image: Images.king_of_clubs},
  {title: 'queen_of_clubs', image: Images.queen_of_clubs},
  {title: 'ten_of_clubs', image: Images.ten_of_clubs},
  {title: 'eight_of_spades', image: Images.eight_of_spades},
  {title: 'king_of_clubs', image: Images.king_of_clubs},
];

const row4 = [
  {title: 'three_of_diamonds', image: Images.three_of_diamonds},
  {title: 'five_of_hearts', image: Images.five_of_hearts},
  {title: 'queen_of_diamonds', image: Images.queen_of_diamonds},
  {title: 'queen_of_hearts', image: Images.queen_of_hearts},
  {title: 'ten_of_hearts', image: Images.ten_of_hearts},
  {title: 'nine_of_hearts', image: Images.nine_of_hearts},
  {title: 'eight_of_hearts', image: Images.eight_of_hearts},
  {title: 'nine_of_clubs', image: Images.nine_of_clubs},
  {title: 'nine_of_spades', image: Images.nine_of_spades},
  {title: 'queen_of_clubs', image: Images.queen_of_clubs},
];

const row5 = [
  {title: 'two_of_diamonds', image: Images.two_of_diamonds},
  {title: 'six_of_hearts', image: Images.six_of_hearts},
  {title: 'ten_of_diamonds', image: Images.ten_of_diamonds},
  {title: 'king_of_hearts', image: Images.king_of_hearts},
  {title: 'three_of_hearts', image: Images.three_of_hearts},
  {title: 'two_of_hearts', image: Images.two_of_hearts},
  {title: 'seven_of_hearts', image: Images.seven_of_hearts},
  {title: 'eight_of_clubs', image: Images.eight_of_clubs},
  {title: 'ten_of_spades', image: Images.ten_of_spades},
  {title: 'ten_of_clubs', image: Images.ten_of_clubs},
];

const row6 = [
  {title: 'ace_of_spades', image: Images.ace_of_spades},
  {title: 'seven_of_hearts', image: Images.seven_of_hearts},
  {title: 'nine_of_diamonds', image: Images.nine_of_diamonds},
  {title: 'ace_of_hearts', image: Images.ace_of_hearts},
  {title: 'four_of_hearts', image: Images.four_of_hearts},
  {title: 'five_of_hearts', image: Images.five_of_hearts},
  {title: 'six_of_hearts', image: Images.six_of_hearts},
  {title: 'seven_of_clubs', image: Images.seven_of_clubs},
  {title: 'queen_of_spades', image: Images.queen_of_spades},
  {title: 'nine_of_clubs', image: Images.nine_of_clubs},
];

const row7 = [
  {title: 'king_of_spades', image: Images.king_of_spades},
  {title: 'eight_of_hearts', image: Images.eight_of_hearts},
  {title: 'eight_of_diamonds', image: Images.eight_of_diamonds},
  {title: 'two_of_clubs', image: Images.two_of_clubs},
  {title: 'three_of_clubs', image: Images.three_of_clubs},
  {title: 'four_of_clubs', image: Images.four_of_clubs},
  {title: 'five_of_clubs', image: Images.five_of_clubs},
  {title: 'six_of_clubs', image: Images.six_of_clubs},
  {title: 'king_of_spades', image: Images.king_of_spades},
  {title: 'eight_of_clubs', image: Images.eight_of_clubs},
];

const row8 = [
  {title: 'queen_of_spades', image: Images.queen_of_spades},
  {title: 'nine_of_hearts', image: Images.nine_of_hearts},
  {title: 'seven_of_diamonds', image: Images.seven_of_diamonds},
  {title: 'six_of_diamonds', image: Images.six_of_diamonds},
  {title: 'five_of_diamonds', image: Images.five_of_diamonds},
  {title: 'four_of_diamonds', image: Images.four_of_diamonds},
  {title: 'three_of_diamonds', image: Images.three_of_diamonds},
  {title: 'two_of_diamonds', image: Images.two_of_diamonds},
  {title: 'ace_of_spades', image: Images.ace_of_spades},
  {title: 'seven_of_clubs', image: Images.seven_of_clubs},
];

const row9 = [
  {title: 'ten_of_spades', image: Images.ten_of_spades},
  {title: 'ten_of_hearts', image: Images.ten_of_hearts},
  {title: 'queen_of_hearts', image: Images.queen_of_hearts},
  {title: 'king_of_hearts', image: Images.king_of_hearts},
  {title: 'ace_of_hearts', image: Images.ace_of_hearts},
  {title: 'two_of_clubs', image: Images.two_of_clubs},
  {title: 'three_of_clubs', image: Images.three_of_clubs},
  {title: 'four_of_clubs', image: Images.four_of_clubs},
  {title: 'five_of_clubs', image: Images.five_of_clubs},
  {title: 'six_of_clubs', image: Images.six_of_clubs},
];

const row10 = [
  {title: 'black_joker', image: Images.black_joker},
  {title: 'nine_of_spades', image: Images.nine_of_spades},
  {title: 'eight_of_spades', image: Images.eight_of_spades},
  {title: 'seven_of_spades', image: Images.seven_of_spades},
  {title: 'six_of_spades', image: Images.six_of_spades},
  {title: 'five_of_spades', image: Images.five_of_spades},
  {title: 'four_of_spades', image: Images.four_of_spades},
  {title: 'three_of_spades', image: Images.three_of_spades},
  {title: 'two_of_spades', image: Images.two_of_spades},
  {title: 'red_joker', image: Images.red_joker},
];

const board = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10];

const deckOfCards = [
  {title: 'two_of_clubs', image: Images.two_of_clubs},
  {title: 'two_of_diamonds', image: Images.two_of_diamonds},
  {title: 'two_of_hearts', image: Images.two_of_hearts},
  {title: 'two_of_spades', image: Images.two_of_spades},
  {title: 'three_of_clubs', image: Images.three_of_clubs},
  {title: 'three_of_diamonds', image: Images.three_of_diamonds},
  {title: 'three_of_hearts', image: Images.three_of_hearts},
  {title: 'three_of_spades', image: Images.three_of_spades},
  {title: 'four_of_clubs', image: Images.four_of_clubs},
  {title: 'four_of_diamonds', image: Images.four_of_diamonds},
  {title: 'four_of_hearts', image: Images.four_of_hearts},
  {title: 'four_of_spades', image: Images.four_of_spades},
  {title: 'five_of_clubs', image: Images.five_of_clubs},
  {title: 'five_of_diamonds', image: Images.five_of_diamonds},
  {title: 'five_of_hearts', image: Images.five_of_hearts},
  {title: 'five_of_spades', image: Images.five_of_spades},
  {title: 'six_of_clubs', image: Images.six_of_clubs},
  {title: 'six_of_diamonds', image: Images.six_of_diamonds},
  {title: 'six_of_hearts', image: Images.six_of_hearts},
  {title: 'six_of_spades', image: Images.six_of_spades},
  {title: 'seven_of_clubs', image: Images.seven_of_clubs},
  {title: 'seven_of_diamonds', image: Images.seven_of_diamonds},
  {title: 'seven_of_hearts', image: Images.seven_of_hearts},
  {title: 'seven_of_spades', image: Images.seven_of_spades},
  {title: 'eight_of_clubs', image: Images.eight_of_clubs},
  {title: 'eight_of_diamonds', image: Images.eight_of_diamonds},
  {title: 'eight_of_hearts', image: Images.eight_of_hearts},
  {title: 'eight_of_spades', image: Images.eight_of_spades},
  {title: 'nine_of_clubs', image: Images.nine_of_clubs},
  {title: 'nine_of_diamonds', image: Images.nine_of_diamonds},
  {title: 'nine_of_hearts', image: Images.nine_of_hearts},
  {title: 'nine_of_spades', image: Images.nine_of_spades},
  {title: 'ten_of_clubs', image: Images.ten_of_clubs},
  {title: 'ten_of_diamonds', image: Images.ten_of_diamonds},
  {title: 'ten_of_hearts', image: Images.ten_of_hearts},
  {title: 'ten_of_spades', image: Images.ten_of_spades},
  {title: 'jack_of_clubs', image: Images.jack_of_clubs},
  {title: 'jack_of_diamonds', image: Images.jack_of_diamonds},
  {title: 'jack_of_hearts', image: Images.jack_of_hearts},
  {title: 'jack_of_spades', image: Images.jack_of_spades},
  {title: 'queen_of_clubs', image: Images.queen_of_clubs},
  {title: 'queen_of_diamonds', image: Images.queen_of_diamonds},
  {title: 'queen_of_hearts', image: Images.queen_of_hearts},
  {title: 'queen_of_spades', image: Images.queen_of_spades},
  {title: 'king_of_clubs', image: Images.king_of_clubs},
  {title: 'king_of_diamonds', image: Images.king_of_diamonds},
  {title: 'king_of_hearts', image: Images.king_of_hearts},
  {title: 'king_of_spades', image: Images.king_of_spades},
  {title: 'ace_of_clubs', image: Images.ace_of_clubs},
  {title: 'ace_of_diamonds', image: Images.ace_of_diamonds},
  {title: 'ace_of_hearts', image: Images.ace_of_hearts},
  {title: 'ace_of_spades', image: Images.ace_of_spades},
];

export {cardHeights, cardWidths, board, deckOfCards};
