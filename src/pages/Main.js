import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform, 
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import colors from '../constants/colors';
import baseStyles from '../constants/baseStyles';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
  button: {
    width: displayWidth - 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    backgroundColor: colors.themeColor,
  },
  buttonTitle: {
    fontSize: 15,
    color: colors.whiteColor,
  }
});

EStyleSheet.build();

export default class Main extends Component {
  userAction = () => {
    Actions.login();
  };

  guestAction = () => {
    Actions.products();
  };

  render() {
    return (
      <View style={baseStyles.pageContainer}>        
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.userAction()}
        >
          <Text style={styles.buttonTitle}>Enter like a user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.guestAction()}
        >
          <Text style={styles.buttonTitle}>Enter like a guest</Text>
        </TouchableOpacity>       
      </View>
    );
  }
}
