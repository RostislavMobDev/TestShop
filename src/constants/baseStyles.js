import { StyleSheet, Platform } from 'react-native';

import colors from './colors';

const baseStyles = StyleSheet.create({
  pageContainer: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight : displayHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default baseStyles;
