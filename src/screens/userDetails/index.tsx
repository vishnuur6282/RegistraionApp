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
import {useNavigation} from '@react-navigation/native';
import {FormValuesType} from '../registration';

interface UserData {
  text: string;
  imagePath: string;
}

interface editInterface {
  first_name: string;
  last_name: string;
}

const UserDetails = ({route}: any) => {
  const dispatch = useDispatch();
  const {users} = useSelector((state: any) => state.users);
  const data = route.params;
  const navigation = useNavigation();

  const [formValues, setFormValues] = useState<editInterface>({
    first_name: '',
    last_name: '',
  });
  const [editableState, setEditableState] = useState<{
    [key in keyof editInterface]: boolean;
  }>({
    first_name: false,
    last_name: false,
  });

  useEffect(() => {
    setFormValues({first_name: data?.first_name, last_name: data?.last_name});
    return () => {
      setEditableState({first_name: false, last_name: false});
    };
  }, [data]);

  const handleInputChange = (inputName: keyof editInterface, text: string) => {
    setFormValues({
      ...formValues,
      [inputName]: text,
    });
  };

  const handleEditPress = (field: keyof editInterface) => {
    setEditableState(prevState => ({
      ...prevState,
      [field]: !prevState[field], // Toggle the editable state
    }));
  };

  const saveEdit = () => {
    setEditableState({first_name: false, last_name: false});
    const updatedParams = {
      ...data,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
    };
    let newUsers: FormValuesType[] = [...users];
    newUsers = newUsers.map((user: FormValuesType) =>
      user.email === data.email
        ? {
            ...user,
            first_name: formValues.first_name,
            last_name: formValues.last_name,
          }
        : user,
    );

    dispatch(updateUsers(newUsers));
    navigation.setParams(updatedParams);
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
                  <MaterialIcon name="save" size={18} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleEditPress('first_name')}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="create" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
            {editableState.first_name ? (
              <TextInput
                style={[homeStyle.data, homeStyle.inputStyle]}
                placeholder="First Name"
                onChangeText={text => handleInputChange('first_name', text)}
                value={formValues?.first_name}
                editable={true}
                autoFocus={true}
                placeholderTextColor="grey"
              />
            ) : (
              <Text style={homeStyle.data}>
                {formValues?.first_name ?? data?.first_name}
              </Text>
            )}
          </View>
          <View style={homeStyle.section}>
            <View style={homeStyle.editWrap}>
              <Text style={homeStyle.label}>Last Name</Text>
              {editableState.last_name ? (
                <TouchableOpacity
                  onPress={saveEdit}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="save" size={18} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleEditPress('last_name')}
                  style={homeStyle.editButton}>
                  <MaterialIcon name="create" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View>
              {editableState.last_name ? (
                <TextInput
                  style={[homeStyle.data, homeStyle.inputStyle]}
                  placeholder="Last Name"
                  onChangeText={text => handleInputChange('last_name', text)}
                  value={formValues?.last_name}
                  editable={true}
                  autoFocus={true}
                  placeholderTextColor="grey"
                />
              ) : (
                <Text style={homeStyle.data}>
                  {formValues?.last_name ?? data?.last_name}
                </Text>
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
