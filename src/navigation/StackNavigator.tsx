import React from 'react';

import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import RegistrationScreen from '../screens/registration';
import CustomIcon from '../components/customIcons';

const Stack = createStackNavigator();

const StackNavigator = ({navigation}: any) => (
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
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={() => {
        return {
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{marginLeft: 16}}>
              <CustomIcon>
                <MaterialIcon name="menu" />
              </CustomIcon>
            </TouchableOpacity>
          ),
        };
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
