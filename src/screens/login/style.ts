// styles.js
import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  wrap: {
    width: '90%',
    padding: 24,
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    marginTop: 16,
    borderBottomColor: 'grey',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    color: 'black',
  },
  warning: {
    color: '#CE3908',
    paddingTop: 8,
  },
  button: {
    backgroundColor: '#303545',
    padding: 10,
    borderRadius: 12,
    width: '100%',
    color: 'black',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 12,
    width: '100%',
    color: 'black',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 16,
    color: 'white',
    fontWeight: '600',
  },
});
