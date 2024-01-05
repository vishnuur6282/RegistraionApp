// Import necessary components from React and React Native
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {loginStyles} from './style';

import showToast from '../../components/Toast';
import {FormValuesType} from '../registration';
import {setCurrentUser} from '../../redux/reducers/signupReducer';

const LoginScreen = ({navigation}: any) => {
  const {users, currentUser} = useSelector((state: any) => state.users);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    if (currentUser.email) {
      showToast('Login Success');
      dispatch(setCurrentUser(currentUser));
      navigation.navigate('Home');
      return;
    }
  };

  const handleSignIn = async () => {
    const validUser = users.find(
      (user: FormValuesType) =>
        user.email === email && user.password === password,
    );

    if (validUser && email && password) {
      showToast('Login Success');
      dispatch(setCurrentUser(validUser));
      navigation.navigate('Home');
    } else {
      showToast('Invalid credentials');
    }
  };
  const onSignUp = () => {
    navigation.navigate('Registration');
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/background.jpg')}
      style={loginStyles.backgroundImage}>
      <View style={loginStyles.container}>
        <View style={loginStyles.wrap}>
          <Text style={loginStyles.title}>Login</Text>

          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={text => setemail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            value={password}
            onSubmitEditing={handleSignIn}
          />
          <TouchableOpacity style={loginStyles.button} onPress={handleSignIn}>
            <Text style={loginStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={loginStyles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={[loginStyles.signUpText, loginStyles.signUpBtnText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
