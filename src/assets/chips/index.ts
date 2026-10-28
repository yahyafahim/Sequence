import type {FC} from 'react';
import type {SvgProps} from 'react-native-svg';
import type {PlayerColor} from '../../game/types';
import BlueChip from './blue.svg';
import GreenChip from './green.svg';
import RedChip from './red.svg';

export type ChipSvg = FC<SvgProps>;

export const ChipSvgs: Record<PlayerColor, ChipSvg> = {
  red: RedChip,
  blue: BlueChip,
  green: GreenChip,
};
