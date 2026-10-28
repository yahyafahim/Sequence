import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {handCardHeight, handCardWidth} from '../config/Constants';
import {Colors} from '../config';
import {isCardDead} from '../game/engine';
import type {GameCard, GameState} from '../game/types';

type PlayerHandProps = {
  state: GameState;
  onSelectCard: (index: number) => void;
};

function HandCard({
  card,
  selected,
  dead,
  onPress,
}: {
  card: GameCard;
  selected: boolean;
  dead: boolean;
  onPress: () => void;
}) {
  const Svg = card.Svg;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, selected && styles.selected, dead && styles.dead]}>
      <Svg width={handCardWidth - 2} height={handCardHeight - 2} />
      {card.jackType ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {card.jackType === 'two-eyed' ? 'WILD' : 'RMV'}
          </Text>
        </View>
      ) : null}
      {dead ? (
        <View style={styles.deadBadge}>
          <Text style={styles.deadText}>DEAD</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function PlayerHand({state, onSelectCard}: PlayerHandProps) {
  const player = state.players[state.currentPlayerIndex];

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}>
        {player.hand.map((card, index) => (
          <HandCard
            key={card.uid}
            card={card}
            selected={state.selectedCardIndex === index}
            dead={isCardDead(state, card)}
            onPress={() => onSelectCard(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexShrink: 0,
  },
  row: {
    paddingHorizontal: 10,
    gap: 6,
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  card: {
    width: handCardWidth,
    height: handCardHeight,
    borderRadius: 5,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    overflow: 'hidden',
  },
  selected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    transform: [{translateY: -4}],
  },
  dead: {
    opacity: 0.75,
  },
  badge: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 2,
    paddingVertical: 1,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 7,
    fontWeight: '700',
    textAlign: 'center',
  },
  deadBadge: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: Colors.danger,
    borderRadius: 2,
    paddingHorizontal: 2,
  },
  deadText: {
    color: Colors.white,
    fontSize: 6,
    fontWeight: '800',
  },
});
