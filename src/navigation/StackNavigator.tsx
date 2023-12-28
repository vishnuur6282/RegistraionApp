import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import RegistrationScreen from '../screens/registration';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent', // Set the background color to transparent
        },
        headerTransparent: true, // Make the header transparent
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
