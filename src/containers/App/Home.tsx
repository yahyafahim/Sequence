import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {board, cardHeights, cardWidths} from '../../config/Constants';
import {Colors, Shadows} from '../../config';
import Header from '../../components/Header';

type PlayerColor = 'red' | 'blue';

type PlayedCard = {
  player: PlayerColor;
  rowNo: number;
  columnNo: number;
};

const Home = () => {
  const [playedCards, setPlayedCards] = useState<PlayedCard[]>([]);
  const [play, setPlay] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <Header title="Sequence" />
      <View style={styles.mainContainer}>
        {board.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex.toString()}>
            {row.map((card, index) => {
              const isPlayed = playedCards.findIndex(
                item => item.rowNo === rowIndex && item.columnNo === index,
              );
              let player: PlayerColor | '' = '';
              if (isPlayed >= 0) {
                player = playedCards[isPlayed].player;
              }

              const CardSvg = card.Card;

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cardContainer}
                  onPress={() => {
                    const newPlayedCards = [...playedCards];
                    if (isPlayed === -1) {
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
                    (rowIndex === 0 && index === 0) ||
                    (rowIndex === 0 && index === 9) ||
                    (rowIndex === 9 && index === 0) ||
                    (rowIndex === 9 && index === 9)
                  }>
                  <CardSvg width={cardWidths} height={cardHeights} />
                  {isPlayed !== -1 ? (
                    <View
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            player === 'red' ? '#E53935' : '#1E88E5',
                        },
                      ]}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 40,
  },
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
  chip: {
    width: cardWidths * 0.7,
    height: cardWidths * 0.7,
    borderRadius: (cardWidths * 0.7) / 2,
    position: 'absolute',
    opacity: 0.9,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
