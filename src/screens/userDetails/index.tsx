import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

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
  //  const [editableState, setEditableState] = useState<{
  //    [key in keyof editInterface]: boolean;
  //  }>({
  //    first_name: false,
  //    last_name: false,
  //  });

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

  //  const handleEditPress = (field: keyof editInterface) => {
  //    setEditableState(prevState => ({
  //      ...prevState,
  //      [field]: !prevState[field], // Toggle the editable state
  //    }));
  //  };

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
            <Text style={homeStyle.label}>First Name:</Text>
            <View>
              <TextInput
                style={homeStyle.data}
                placeholder="Enter text here"
                onChangeText={text => handleInputChange('first_name', text)}
                value={formValues?.first_name}
                editable={true}
                //autoFocus={editableState.first_name ? true : false}
              />
              {/*<TouchableOpacity onPress={() => handleEditPress('first_name')}>
                <Text>Edit</Text>
              </TouchableOpacity>*/}
            </View>
          </View>
          <View style={homeStyle.section}>
            <Text style={homeStyle.label}>Last Name:</Text>
            <View>
              <TextInput
                style={homeStyle.data}
                placeholder="Enter text here"
                onChangeText={text => handleInputChange('last_name', text)}
                value={formValues?.last_name}
                editable={true}
              />
              {/*<TouchableOpacity onPress={() => handleEditPress('last_name')}>
                <Text>Edit</Text>
              </TouchableOpacity>*/}
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
