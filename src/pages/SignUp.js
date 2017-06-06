import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import colors from '../constants/colors';
import * as auth from '../redux/sagas/auth/auth';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const backButtonIcon = require('../resources/back_button_icon_black.png');

const styles = EStyleSheet.create({
  pageContainer: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight : displayHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  textInput: {
    width: displayWidth - 50,
    height: 40,
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 14,
    borderRadius: 7,
    marginBottom: 20,
  },
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSpinner: false,
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillMount() {
   
  }

  doneButtonPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      this.logInButtonPress();
    }
  }

  registerPress = () => {
    if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0) {
      if (this.password === this.confirmPassword) {
        this.setState({ visible: true });
        this.props.dispatch(auth.apiAuthRegistration(this.state.username, this.state.password, (success, message) => {
          if (success) {
            this.setState({ visible: false }, () => {
              Actions.products();
            });           
          } else if (!success && message){        
            this.hideSpinnerAfterError(message);   
          } else {
            this.hideSpinnerAfterError('Something went wrong, please try again');          
          }
        }));
      } else {
        this.hideSpinnerAfterError('Confirm password does not match the entered password'); 
      }     

    } else {
      this.hideSpinnerAfterError('Please fill all fields'); 
    }
  }

  hideSpinnerAfterError = (message) => {
    Alert.alert('Error', message, 
      [{ text: 'OK',  onPress: () => this.setState({ visible: false }) }]);
  }

  backButtonPress = () => {
    Actions.pop();
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, }}>
        <Spinner visible={this.state.visible} overlayColor={'transparent'} color={colors.grayColor} />
        <View style={styles.pageContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.backButtonPress()}
          > 
            <Image 
              source={backButtonIcon}
              resizeMode='contain'
              style={{ width: 50, height: 20, }}
            />
          </TouchableOpacity>
          <View>        
            <TextInput
              style={styles.textInput}
              placeholder={'Username'}
              underlineColorAndroid={'#00000000'}
              onChangeText={(text) => this.setState({ username: text })}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Password'}
              underlineColorAndroid={'#00000000'}
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Confirm Password'}
              underlineColorAndroid={'#00000000'}
              secureTextEntry
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              placeholderTextColor={'black'}
              onKeyPress={(event) => { this.doneButtonPress(event); }}
              returnKeyType='done'
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.registerPress()}
          >
            <Text style={styles.buttonTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default connect()(SignUp);