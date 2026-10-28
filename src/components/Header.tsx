import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, NavService} from '../config';

type HeaderProps = {
  title?: string;
  back?: boolean;
};

export function Header({title, back = false}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      {title?.length ? (
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}

      {back ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={NavService.goBack}
          style={styles.backButton}>
          <Text style={styles.backLabel}>{'‹'}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
    height: 45,
  },
  titleWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
  },
  backLabel: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.text,
  },
});
