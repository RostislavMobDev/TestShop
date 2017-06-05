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
const backButtonIcon = require('../resources/back_button_icon.png');

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
    backgroundColor: 'rgb(122, 57, 150)'
  },
  buttonTitle: {
    fontSize: 15,
    color: 'white'
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSpinner: false,
      username: 'TestUser',
      password: '12345',
    };
  }

  doneButtonPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      this.logInButtonPress();
    }
  }

  logInButtonPress = () => {    
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({ visible: true });
      this.props.dispatch(auth.apiAuthLogin(this.state.username, this.state.password, (success, message) => {
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
      this.setState({ visible: false }, () => {
        Alert.alert('', 'Something went wrong, please try again', [{ text: 'OK' }]);
      }); 
    }
  }

  hideSpinnerAfterError = (message) => {
    Alert.alert('Error', message, 
      [{ text: 'OK',  onPress: () => this.setState({ visible: false }) }]);
  }

  noaccountButtonPress = () => {
    Actions.signup();
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
              value={this.state.username}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Password'}
              underlineColorAndroid={'#00000000'}
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
              placeholderTextColor={'black'}
              onKeyPress={(event) => { this.doneButtonPress(event); }}
              returnKeyType='done'
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.logInButtonPress()}
          >
            <Text style={styles.buttonTitle}>LogIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.noaccountButtonPress()}
          >
            <Text style={styles.buttonTitle}>No account?</Text>
          </TouchableOpacity>       
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default connect()(Login);