import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const boardPadding = 8;
const boardGap = 2;
const cardWidths = (width - boardPadding * 2 - boardGap * 9) / 10;
const cardHeights = cardWidths * 1.4;
const handCardWidth = Math.min(64, width * 0.14);
const handCardHeight = handCardWidth * 1.4;

export {
  boardPadding,
  boardGap,
  cardWidths,
  cardHeights,
  handCardWidth,
  handCardHeight,
};
