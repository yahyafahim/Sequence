import type {FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import Card1B from './1B.svg';
import Card1J from './1J.svg';
import Card2B from './2B.svg';
import Card2C from './2C.svg';
import Card2D from './2D.svg';
import Card2H from './2H.svg';
import Card2J from './2J.svg';
import Card2S from './2S.svg';
import Card3C from './3C.svg';
import Card3D from './3D.svg';
import Card3H from './3H.svg';
import Card3S from './3S.svg';
import Card4C from './4C.svg';
import Card4D from './4D.svg';
import Card4H from './4H.svg';
import Card4S from './4S.svg';
import Card5C from './5C.svg';
import Card5D from './5D.svg';
import Card5H from './5H.svg';
import Card5S from './5S.svg';
import Card6C from './6C.svg';
import Card6D from './6D.svg';
import Card6H from './6H.svg';
import Card6S from './6S.svg';
import Card7C from './7C.svg';
import Card7D from './7D.svg';
import Card7H from './7H.svg';
import Card7S from './7S.svg';
import Card8C from './8C.svg';
import Card8D from './8D.svg';
import Card8H from './8H.svg';
import Card8S from './8S.svg';
import Card9C from './9C.svg';
import Card9D from './9D.svg';
import Card9H from './9H.svg';
import Card9S from './9S.svg';
import CardAC from './AC.svg';
import CardAD from './AD.svg';
import CardAH from './AH.svg';
import CardAS from './AS.svg';
import CardJC from './JC.svg';
import CardJD from './JD.svg';
import CardJH from './JH.svg';
import CardJS from './JS.svg';
import CardKC from './KC.svg';
import CardKD from './KD.svg';
import CardKH from './KH.svg';
import CardKS from './KS.svg';
import CardQC from './QC.svg';
import CardQD from './QD.svg';
import CardQH from './QH.svg';
import CardQS from './QS.svg';
import CardTC from './TC.svg';
import CardTD from './TD.svg';
import CardTH from './TH.svg';
import CardTS from './TS.svg';

export type CardSvg = FC<SvgProps>;

const Cards = {
  two_of_clubs: Card2C,
  two_of_diamonds: Card2D,
  two_of_hearts: Card2H,
  two_of_spades: Card2S,
  three_of_clubs: Card3C,
  three_of_diamonds: Card3D,
  three_of_hearts: Card3H,
  three_of_spades: Card3S,
  four_of_clubs: Card4C,
  four_of_diamonds: Card4D,
  four_of_hearts: Card4H,
  four_of_spades: Card4S,
  five_of_clubs: Card5C,
  five_of_diamonds: Card5D,
  five_of_hearts: Card5H,
  five_of_spades: Card5S,
  six_of_clubs: Card6C,
  six_of_diamonds: Card6D,
  six_of_hearts: Card6H,
  six_of_spades: Card6S,
  seven_of_clubs: Card7C,
  seven_of_diamonds: Card7D,
  seven_of_hearts: Card7H,
  seven_of_spades: Card7S,
  eight_of_clubs: Card8C,
  eight_of_diamonds: Card8D,
  eight_of_hearts: Card8H,
  eight_of_spades: Card8S,
  nine_of_clubs: Card9C,
  nine_of_diamonds: Card9D,
  nine_of_hearts: Card9H,
  nine_of_spades: Card9S,
  ten_of_clubs: CardTC,
  ten_of_diamonds: CardTD,
  ten_of_hearts: CardTH,
  ten_of_spades: CardTS,
  jack_of_clubs: CardJC,
  jack_of_diamonds: CardJD,
  jack_of_hearts: CardJH,
  jack_of_spades: CardJS,
  queen_of_clubs: CardQC,
  queen_of_diamonds: CardQD,
  queen_of_hearts: CardQH,
  queen_of_spades: CardQS,
  king_of_clubs: CardKC,
  king_of_diamonds: CardKD,
  king_of_hearts: CardKH,
  king_of_spades: CardKS,
  ace_of_clubs: CardAC,
  ace_of_diamonds: CardAD,
  ace_of_hearts: CardAH,
  ace_of_spades: CardAS,
  red_joker: Card1J,
  black_joker: Card2J,
  card_back_black: Card1B,
  card_back_red: Card2B,
} as const satisfies Record<string, CardSvg>;

export type CardName = keyof typeof Cards;

export default Cards;
