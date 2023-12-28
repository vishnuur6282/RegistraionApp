// styles.js
import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    paddingLeft: 16,
  },
  drawerbutton: {
    backgroundColor: 'red',
    height: 60,
  },
  imageWrap: {
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentBg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  userImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 94,
    objectFit: 'cover',
  },
  detailWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    padding: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: '600',
    color: '#E3DFDE',
  },
  data: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
  },
});
