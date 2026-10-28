import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const boardPadding = 4;
const boardGap = 1;
const CARD_ASPECT = 1.35;

const handCardWidth = Math.min(52, width * 0.12);
const handCardHeight = handCardWidth * 1.35;

export function computeBoardCellSize(
  availableWidth: number,
  availableHeight: number,
) {
  const horizontalBudget = Math.max(0, availableWidth - boardPadding * 2 - boardGap * 9);
  const verticalBudget = Math.max(0, availableHeight - boardPadding * 2 - boardGap * 9);

  const widthFromWidth = horizontalBudget / 10;
  const widthFromHeight = verticalBudget / 10 / CARD_ASPECT;
  const cardWidth = Math.max(12, Math.min(widthFromWidth, widthFromHeight));
  const cardHeight = cardWidth * CARD_ASPECT;

  return {cardWidth, cardHeight};
}

export {
  boardPadding,
  boardGap,
  CARD_ASPECT,
  handCardWidth,
  handCardHeight,
};
