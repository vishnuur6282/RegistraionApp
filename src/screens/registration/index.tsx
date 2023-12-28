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

import {loginStyles} from '../login/style';
import {onSigningUp} from '../../redux/reducers/signupReducer';
import showToast from '../../components/Toast';

export interface FormValuesType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegistrationScreen = ({navigation}: any) => {
  const {users} = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<FormValuesType>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldWarnings, setFieldWarnings] = useState<Partial<FormValuesType>>(
    {},
  );
  const [disableSubmit, setdisableSubmit] = useState(false);

  useEffect(() => {
    const errorsStatus = Object.values(fieldWarnings).every(
      value => value === '',
    );
    const valuesStatus = Object.values(formValues).every(value => !!value);
    if (errorsStatus && valuesStatus) {
      setdisableSubmit(false);
    } else {
      setdisableSubmit(true);
    }
  }, [fieldWarnings]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (inputName: keyof FormValuesType, text: string) => {
    setFormValues({
      ...formValues,
      [inputName]: text,
    });

    setFieldWarnings({
      ...fieldWarnings,
      [inputName]: '',
    });
  };

  const handleEmailBlur = () => {
    // Validate email on blur
    if (formValues.email && !validateEmail(formValues.email)) {
      setFieldWarnings({
        ...fieldWarnings,
        email: 'Email is invalid',
      });
    } else if (
      users.some((user: FormValuesType) => user.email === formValues.email)
    ) {
      setFieldWarnings({
        ...fieldWarnings,
        email: 'Email already in use',
      });
    } else {
      setFieldWarnings({
        ...fieldWarnings,
        email: '',
      });
    }
  };

  const handleSignIn = () => {
    const newFieldWarnings: Partial<FormValuesType> = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        newFieldWarnings[key as keyof FormValuesType] = 'Field cannot be empty';
      }
    });

    if (formValues.password !== formValues.confirmPassword) {
      newFieldWarnings.confirmPassword = 'Passwords do not match';
    }

    //if (Object.keys(newFieldWarnings).length > 0) {
    //  setFieldWarnings(newFieldWarnings);
    //  showToast(
    //    'Please fill in all required fields and make sure passwords match',
    //  );
    //  return;
    //}

    dispatch(onSigningUp(formValues));
    showToast('Successfully registered');
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/background.jpg')}
      style={loginStyles.backgroundImage}>
      <View style={loginStyles.container}>
        <View style={loginStyles.wrap}>
          <TextInput
            style={loginStyles.input}
            placeholder="First Name"
            placeholderTextColor="grey"
            onChangeText={text => handleInputChange('first_name', text)}
            value={formValues.first_name}
          />
          {fieldWarnings.first_name && (
            <Text style={loginStyles.warning}>{fieldWarnings.first_name}</Text>
          )}
          <TextInput
            style={loginStyles.input}
            placeholder="Last Name"
            placeholderTextColor="grey"
            onChangeText={text => handleInputChange('last_name', text)}
            value={formValues.last_name}
          />
          {fieldWarnings.last_name && (
            <Text style={loginStyles.warning}>{fieldWarnings.last_name}</Text>
          )}
          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={text => handleInputChange('email', text)}
            value={formValues.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={handleEmailBlur}
          />
          {fieldWarnings.email && (
            <Text style={loginStyles.warning}>{fieldWarnings.email}</Text>
          )}
          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => handleInputChange('password', text)}
            value={formValues.password}
            autoCapitalize="none"
          />
          {fieldWarnings.password && (
            <Text style={loginStyles.warning}>{fieldWarnings.password}</Text>
          )}
          <TextInput
            style={loginStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            value={formValues.confirmPassword}
            autoCapitalize="none"
            onSubmitEditing={handleSignIn}
          />
          {fieldWarnings.confirmPassword && (
            <Text style={loginStyles.warning}>
              {fieldWarnings.confirmPassword}
            </Text>
          )}
          <TouchableOpacity
            disabled={disableSubmit}
            style={[
              loginStyles.button,
              disableSubmit && loginStyles.disabledButton,
            ]}
            onPress={handleSignIn}>
            <Text style={loginStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegistrationScreen;
