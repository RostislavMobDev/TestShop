import { StyleSheet, Platform } from 'react-native';

import colors from './colors';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrayColor,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
});

export default baseStyles;
