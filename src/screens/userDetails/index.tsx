import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {homeStyle} from './style';
import {updateUsers} from '../../redux/reducers/signupReducer';

interface UserData {
  text: string;
  imagePath: string;
}

interface editInterface {
  first_name: string;
  last_name: string;
}

const UserDetails = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const {currentUser, users} = useSelector((state: any) => state.users);
  const data = route.params;
  const [formValues, setFormValues] = useState<editInterface>({
    first_name: data?.first_name,
    last_name: data?.last_name,
  });
  const [editableState, setEditableState] = useState<{
    [key in keyof editInterface]: boolean;
  }>({
    first_name: false,
    last_name: false,
  });

  useEffect(() => {
    const userDetail: UserData = {
      text:
        currentUser?.email === data.email
          ? currentUser?.first_name + ' (You)'
          : data?.first_name,
      imagePath: data.imageUrl,
    };
    navigation.setParams({userDetail});
  }, [navigation]);

  const handleInputChange = (inputName: keyof editInterface, text: string) => {
    setFormValues({
      ...formValues,
      [inputName]: text,
    });
    let newUsers: any = [...users];
    newUsers = newUsers.map((user: any) =>
      user.email === data.email ? {...user, [inputName]: text} : user,
    );
    dispatch(updateUsers(newUsers));
  };

  const handleEditPress = (field: keyof editInterface) => {
    setEditableState(prevState => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the editable state
    }));
  };

  const saveEdit = () => {
    setEditableState({first_name: false, last_name: false});
  };

  return (
    <View style={homeStyle.container}>
      <ImageBackground
        style={homeStyle.contentBg}
        source={require('../../assets/Images/whatsappbg.jpg')}>
        <View style={homeStyle.userImageWrap}>
          <Text style={homeStyle.heading}>
            {data.first_name} {data.last_name}
          </Text>
        </View>
        <View style={homeStyle.detailWrap}>
          <View style={homeStyle.section}>
            <View style={homeStyle.editWrap}>
              <Text style={homeStyle.label}>First Name</Text>
              {editableState.first_name ? (
                <TouchableOpacity
                  onPress={saveEdit}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="save" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleEditPress('first_name')}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="create" size={18} />
                </TouchableOpacity>
              )}
            </View>
            {editableState.first_name ? (
              <TextInput
                style={[homeStyle.data, homeStyle.inputStyle]}
                placeholder="Enter text here"
                onChangeText={text => handleInputChange('first_name', text)}
                value={formValues?.first_name}
                editable={true}
                autoFocus={true}
              />
            ) : (
              <Text style={homeStyle.data}>{formValues?.first_name}</Text>
            )}
          </View>
          <View style={homeStyle.section}>
            <View style={homeStyle.editWrap}>
              <Text style={homeStyle.label}>Last Name</Text>
              {editableState.last_name ? (
                <TouchableOpacity
                  onPress={saveEdit}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="save" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleEditPress('last_name')}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="create" size={18} />
                </TouchableOpacity>
              )}
            </View>
            <View>
              {editableState.last_name ? (
                <TextInput
                  style={[homeStyle.data, homeStyle.inputStyle]}
                  placeholder="Enter text here"
                  onChangeText={text => handleInputChange('last_name', text)}
                  value={formValues?.last_name}
                  editable={true}
                  autoFocus={true}
                />
              ) : (
                <Text style={homeStyle.data}>{formValues?.last_name}</Text>
              )}
            </View>
          </View>
          <View style={homeStyle.section}>
            <Text style={homeStyle.label}>Email:</Text>
            <Text style={homeStyle.data}>{data?.email}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserDetails;
