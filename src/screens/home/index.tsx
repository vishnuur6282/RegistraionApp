import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {homeStyle} from './style';

import {FormValuesType} from '../registration';
import ModalComponent from '../../components/modal';
import {useAppSelector} from '../../redux/hooks';

const HomeScreen = ({navigation}: any) => {
  const {currentUser, users} = useAppSelector(state => state.users);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState('');

  const onPressUser = (data: FormValuesType) => {
    navigation.navigate('UserDetails', data);
  };

  const onPressImage = (data: FormValuesType | any) => {
    setselectedImage(data.imageUrl);
    setVisible(true);
  };

  const handleModalOutsidePress = () => {
    setVisible(false);
  };

  const renderItem = ({item}: FormValuesType | any) => (
    <Pressable onPress={() => onPressUser(item)} key={item.email}>
      <View style={homeStyle.section}>
        <View style={homeStyle.leftpart}>
          <TouchableOpacity onPress={() => onPressImage(item)}>
            <Image
              style={homeStyle.profileImage}
              source={{uri: item?.imageUrl}}
            />
          </TouchableOpacity>
          <View style={homeStyle.datawrap}>
            <Text style={homeStyle.name}>
              {item?.email === currentUser?.email
                ? item.first_name + ' (You)'
                : item.first_name}
            </Text>
            <Text style={homeStyle.email}>{item?.email}</Text>
          </View>
        </View>
        <Text style={homeStyle.registertime}>Tap to view more</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.imageWrap}>
        <ImageBackground
          source={require('../../assets/Images/background.jpg')}
          style={homeStyle.backgroundImage}>
          <Text style={homeStyle.heading}>
            Hi, {currentUser?.first_name} {currentUser?.last_name}
          </Text>
        </ImageBackground>
      </View>
      <View style={homeStyle.detailWrap}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.email}
        />
      </View>
      <ModalComponent
        visible={visible}
        image={selectedImage}
        handleModalOutsidePress={handleModalOutsidePress}
      />
    </View>
  );
};

export default HomeScreen;
