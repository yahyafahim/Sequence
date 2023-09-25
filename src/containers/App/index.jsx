import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import Home from './Home';

const Stack = createNativeStackNavigator();

//Extra Stacks

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
