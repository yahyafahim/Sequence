import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AppStackParamList} from '../../types/navigation';
import Setup from './Setup';
import Game from './Game';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName="Setup">
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
};

export default AppStack;
