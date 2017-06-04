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
import { connect } from 'react-redux';
import colors from '../constants/colors';

const backButtonIcon = require('../resources/back_button_icon.png');

const { widthHeader } = Dimensions.get('window');
const heightContainers = 70;

const styles = EStyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
    alignItems: 'center',
    backgroundColor: 'rgb(122, 57, 150)',
    flexDirection: 'row',
  },
  leftContainerStyle: {
    flex: 1,
  },
  rightContainerStyle: {
    flex: 1,
  },
  leftButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  rightButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 15,
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
  buttonTitle: {
    color: colors.whiteColor,
    fontSize: 14,    
  }
});

EStyleSheet.build();

class Header extends React.Component {

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.leftContainerStyle}>
        {
          (this.props.isShowLeftButton) &&
            <TouchableOpacity 
              style={styles.leftButtonStyle} 
              onPress={this.props.leftAction}
            >
              <Image 
                source={backButtonIcon}
                resizeMode='contain'
                style={{ width: 50, height: 20, }}
              />
            </TouchableOpacity>
        }
        </View>
        <View style={styles.titleContainerSyle}>
          <Text style={styles.titlePageStyle}>{this.props.title}</Text>
        </View>
        <View style={styles.rightContainerStyle}>
        {
          (this.props.token.length > 0) &&
            <TouchableOpacity 
              style={styles.rightButtonStyle} 
              onPress={this.props.rightAction}
            >
              <Text style={styles.buttonTitle}>LogOut</Text>
            </TouchableOpacity>
        }
        </View>
      </View>
    );
  }
}
export default connect(state => ({
  token: state.auth.token,
}))(Header);
