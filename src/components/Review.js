import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const starInactive = require('../resources/star_inactive.png');
const starActive = require('../resources/star_active.png');

const styles = EStyleSheet.create({
  pageContainer: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight : displayHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }, 
  form: {
    width: displayWidth - 80,
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    width: displayWidth - 90,
    height: 160,
    height: 160,
    paddingLeft: 5,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flex: 1,
  },
  rate: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    width: displayWidth - 80,
    borderTopWidth: 1,
  },
  rateButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateButtonTitle: {
    fontSize: 22,
  }
});

EStyleSheet.build();

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      rate: 0,
    };   
  }

  componentDidMount() {

  }

  increaseRate = () => {
    if (this.state.rate < 5) {
      this.setState({ rate: ++this.state.rate });
    }
  }

  decreaseRate = () => {
    if (this.state.rate > 0) {
      this.setState({ rate: --this.state.rate });
    }
  }

  hideKeyboard = () => {
    Keyboard.dismiss();
  }

  render() {
    const listIcons = new Array(5);
    listIcons.fill(starInactive);
    return (
      <TouchableWithoutFeedback 
        style={{ flex: 1 }}
        onPress={() => this.hideKeyboard()}
      >
        <View style={styles.pageContainer}>
          <View style={styles.form}>
            <TextInput
              autoCorrect={false}
              multiline
              placeholder={'Add review...'}
              value={this.state.text}
              style={styles.input}
              onChangeText={(text) => this.setState({ text })}
              underlineColorAndroid={'transparent'}
            />
            <View style={styles.rate}>
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => this.decreaseRate()}
            >
              <Text style={styles.rateButtonTitle}>-</Text>
            </TouchableOpacity>
            {            
              listIcons.map((icon, index) =>      
                <Image 
                  key={`key${index}`}
                  source={(index + 1 <= this.state.rate) ? starActive : icon}
                  resizeMode='contain'
                  style={{ width: 20, height: 20 }}
                />  
              )
            }
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => this.increaseRate()}
            >
              <Text style={styles.rateButtonTitle}>+</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.hideReviewForm()}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.postReview(this.state)}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
