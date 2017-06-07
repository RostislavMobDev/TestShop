import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from './colors';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const baseStyles = EStyleSheet.create({
  pageContainer: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight : displayHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: (Platform.OS === 'ios') ? 20 : 0,
    left: 0, 
  }
});
EStyleSheet.build();

export default baseStyles;
