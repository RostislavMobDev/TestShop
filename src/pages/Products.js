import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ListView,
  AsyncStorage,
  Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import colors from '../constants/colors';
import baseStyles from '../constants/baseStyles';
import { ASYNCSTORAGE_TOKEN_KEY } from '../constants/config';
import Header from '../components/Header';
import ProductRow from '../components/ProductRow';
import { authClean } from '../redux/auth';
import { cleanProducts } from '../redux/products';
import { apiGetProducts, } from '../redux/sagas/products/products';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const styles = EStyleSheet.create({
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
    setTimeout(() => {  
      if (this.props.isConnected) {
        this.gettingProducts();
      } else {   
        Alert.alert('Error', 'No internet connection', 
          [{ text: 'OK',  onPress: () => this.setState({ visible: false }) }]);
      }
    }, 0);
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

  logOut = () => {
    this.props.authClean();
    this.props.cleanProducts();
    AsyncStorage.removeItem(ASYNCSTORAGE_TOKEN_KEY);
    Actions.main();
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
      <View style={baseStyles.pageContainer}>
        <Spinner visible={this.state.visible} overlayColor={'transparent'} color={colors.grayColor} />
        <Header 
          leftAction={this.backButtonPress}
          rightAction={this.logOut}
          title={'Products'}
          isShowLeftButton={(this.props.token.length > 0) ? false : true}      
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
  isConnected: state.network.isConnected,
}), dispatch => bindActionCreators({
  apiGetProducts,
  authClean,
  cleanProducts,
}, dispatch))(Products);