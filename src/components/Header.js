import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

const backButtonIcon = require('../resources/back_button_icon.png');

const { widthHeader } = Dimensions.get('window');
const heightContainers = 70;

const styles = EStyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  leftContainerStyle: {
    flex: 1,
  },
  rightContainerStyle: {
    flex: 1,
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  titleContainerSyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePageStyle: {
    color: colors.whiteColor,
    fontSize: 17,   
  },
});

EStyleSheet.build();

export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.leftContainerStyle}>
          <TouchableOpacity 
            style={styles.buttonStyle} 
            onPress={this.props.leftAction}
          >
            <Image 
              source={backButtonIcon}
              resizeMode='contain'
              style={{ width: 50, height: 20, }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainerSyle}>
          <Text style={styles.titlePageStyle}>{this.props.title}</Text>
        </View>
        <View style={styles.rightContainerStyle}>       
        </View>
      </View>
    );
  }
}
