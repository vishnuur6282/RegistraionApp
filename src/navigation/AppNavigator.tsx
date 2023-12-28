import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import StackNavigator from './StackNavigator';
import DrawerMenu from '../components/Hamburger';
import UserDetails from '../screens/userDetails';
import imagePaths from '../constants/images';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <DrawerMenu {...props} />}
    screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Home" component={StackNavigator} />
    <Drawer.Screen
      name="UserDetails"
      component={UserDetails}
      options={({route}) => {
        const navigation = useNavigation();

        return {
          drawerLabel: 'User Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#232D36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri:
                    (route.params as any)?.userDetail?.imagePath ??
                    imagePaths[0],
                }}
                style={styles.headerImage}
              />
              <Text style={{color: 'white', fontSize: 18}}>
                {(route.params as any)?.userDetail?.text || 'User name'}
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginLeft: 16}}>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
        };
      }}
    />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 54,
    marginRight: 8,
  },
});

export default DrawerNavigator;
