import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {styles} from './style';
import {setCurrentUser} from '../../redux/reducers/signupReducer';
import {persistor} from '../../..';

const DrawerMenu = ({navigation}: any) => {
  const {currentUser} = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const onLogingOut = () => {
    persistor.purge();
    navigation.navigate('Login');
    dispatch(setCurrentUser({}));
  };

  const closeDrawer = () => {
    navigation.closeDrawer();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.drawerCloseButton} onPress={closeDrawer}>
        <MaterialIcon name="clear" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.drawerImageWrap}>
        {!!(currentUser as any)?.imageUrl && (
          <Image
            source={{
              uri: (currentUser as any)?.imageUrl,
            }}
            style={styles.drawerImage}
          />
        )}
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogingOut}>
        <Text style={styles.logoutbtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerMenu;
