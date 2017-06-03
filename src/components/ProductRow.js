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
import { API_IMAGES } from '../constants/config';

const backButtonIcon = require('../resources/back_button_icon.png');

const { widthHeader } = Dimensions.get('window');
const heightContainers = 150;

const styles = EStyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
  },
  image: {
    width: widthHeader,
    height: heightContainers,
  }
});

EStyleSheet.build();

export default class ProductRow extends React.Component {

  render() {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity 
          style={styles.buttonStyle} 
          onPress={this.props.leftAction}
        >
          <Image 
            source={{uri: `${API_IMAGES}${this.props.data.img}`}}
            resizeMode='contain'
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
