import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ListView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import colors from '../constants/colors';
import Header from '../components/Header';
import ProductRow from '../components/ProductRow';

import { 
  apiGetProducts,
} from '../redux/sagas/products/products';

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
  backButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: (Platform.OS === 'ios') ? 20 : 0,
    left: 0, 
  },
  listView: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight - 70 : displayHeight - 90,
  }
});

EStyleSheet.build();

class Products extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };   
  }

  componentDidMount() {
    this.gettingProducts();
  }

  gettingProducts = () => {
    this.props.apiGetProducts(this.props.token, (success) => {
      if (success) {        
        this.setState({ visible: false, });
      } else {
        this.setState({ visible: false });
          Alert.alert('', 'Something went wrong, please try again', [{ text: 'OK' }]);
      }
    });
  }

  backButtonPress = () => {
    Actions.pop();
  }

  openProductDetails = () => {
    Actions.productinfo();
  }

  renderRows = (rowData) => {
    return (
      <ProductRow
        data={rowData}
        openProductDetails={this.openProductDetails}
      />
    );
  }

  render() {
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});   
    return (
      <View>
        <Spinner visible={this.state.visible} overlayColor={'transparent'} color={colors.grayColor} />
        <Header 
          leftAction={this.backButtonPress}
          title={'Products'}
        />
        <ListView
          style={styles.listView}
          dataSource={ds.cloneWithRows(this.props.products)}
          renderRow={this.renderRows}
          enableEmptySections
        />
      </View>
    );
  }
}
export default connect(state => ({
  products: state.products.products,
  token: state.auth.token,
}), dispatch => bindActionCreators({
  apiGetProducts,
}, dispatch))(Products);