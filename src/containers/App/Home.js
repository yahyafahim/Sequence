import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {board, cardHeights, cardWidths} from '../../config/Constants';
import {Colors, Shadows} from '../../config';
import Header from '../../components/Header';
import Images from '../../assets/Images';

const Home = () => {
  const [playedCards, setPlayedCards] = React.useState([]);
  const [play, setPlay] = React.useState(false);

  return (
    <View style={styles.mainContainer} title={'Sequence'}>
      <Header title={'Sequence'} />
      {board.map((row, rowIndex) => {
        return (
          <View style={styles.row} key={rowIndex.toString()}>
            {row.map((card, index) => {
              const isPlayed = playedCards.findIndex(
                item => item?.rowNo == rowIndex && item?.columnNo == index,
              );
              let player = '';
              if (isPlayed >= 0) {
                player = playedCards[isPlayed].player;
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cardContainer}
                  onPress={() => {
                    const newPlayedCards = [...playedCards];
                    if (isPlayed == -1) {
                      newPlayedCards.push({
                        player: play ? 'red' : 'blue',
                        rowNo: rowIndex,
                        columnNo: index,
                      });
                    }
                    setPlayedCards(newPlayedCards);
                    setPlay(!play);
                  }}
                  key={index.toString()}
                  disabled={
                    (rowIndex == 0 && index == 0) ||
                    (rowIndex == 0 && index == 9) ||
                    (rowIndex == 9 && index == 0) ||
                    (rowIndex == 9 && index == 9)
                  }>
                  <Image source={card.image} style={styles.card} />
                  {isPlayed != -1 && (
                    <Image
                      source={
                        player == 'red' ? Images.redChip : Images.blueChip
                      }
                      style={styles.chip}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, paddingBottom: 40},
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    ...Shadows.shadow3,
    marginBottom: 5,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: cardWidths,
    height: cardHeights,
    resizeMode: 'contain',
    backgroundColor: Colors.white,
  },
  chip: {
    width: cardWidths,
    height: cardHeights,
    resizeMode: 'contain',
    position: 'absolute',
  },
});
