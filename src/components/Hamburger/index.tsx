import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import imagePaths from '../../constants/images';
import {styles} from './style';
import {setCurrentUser} from '../../redux/reducers/signupReducer';
import {useDispatch, useSelector} from 'react-redux';

const DrawerMenu = ({navigation}: any) => {
  const {currentUser} = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const onLogingOut = () => {
    dispatch(setCurrentUser({}));
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.drawerImageWrap}>
        {!!currentUser?.imageUrl && (
          <Image
            source={{
              uri: currentUser?.imageUrl,
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
