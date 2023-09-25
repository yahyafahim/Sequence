import React from 'react';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavService} from './config';

//Screens
import {AppStack} from './containers';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer
      ref={ref => NavService.setTopLevelNavigator(ref)}
      screenOptions={{animation: 'simple_push'}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          headerShown: false,
        }}
        initialRouteName={'AppStack'}>
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
