import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ListView,
  Alert, 
  Modal,
  AsyncStorage,
  InteractionManager,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { API_IMAGES, REVIEWS, ASYNCSTORAGE_TOKEN_KEY } from '../constants/config';
import colors from '../constants/colors';
import { authClean, } from '../redux/auth';
import { cleanProducts, cleanSelectedProduct, cleanReviews, } from '../redux/products';
import { apiPostReview, } from '../redux/sagas/products/products';

import Header from '../components/Header';
import ReviewRow from '../components/ReviewRow';
import Review from '../components/Review';

import { 
  apiGetReview,
} from '../redux/sagas/products/products';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const plusIcon = require('../resources/plus_icon.png');

const styles = EStyleSheet.create({
  pageContainer: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight : displayHeight - 20,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  listView: {
    width: displayWidth,
    height: (Platform.OS === 'ios') ? displayHeight - (120 + displayWidth * 0.7) : displayHeight - (145 + displayWidth * 0.7),
  }, 
  image: {
    width: displayWidth,
    height: displayWidth * 0.7,
  },
  descriptionContainer: {
    padding: 15,
  },
  description: {
    fontSize: 15,
  },
  bottomButton: { 
    position: 'absolute', 
    bottom: (Platform.OS === 'ios') ? 5 : 25, 
    right: 5, 
    borderRadius: 25, 
    width: 50, 
    height: 50, 
    backgroundColor: 'rgba(122, 57, 150, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

EStyleSheet.build();

class ProductInfo extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      showReviewForm: false,
      loading: true,
    };   
  }

  componentDidMount() {
    if (this.props.isConnected) {
      this.gettingProductReviews();
    } else {   
      Alert.alert('Error', 'No internet connection', 
        [{ text: 'OK',  onPress: () => this.setState({ visible: false }) }]);
    }
    InteractionManager.runAfterInteractions(() => {
      this.setState({loading: false});
    });
  }

  gettingProductReviews = () => {
    this.props.apiGetReview(this.props.token, this.props.selectedProduct.id, (success) => {
      if (success) {
        this.setState({ visible: false })
      } else {
       Alert.alert('', 'Something went wrong, please try again', 
            [{ text: 'OK',  onPress: () => this.setState({ visible: false }) }]);
      }
    })
  };

  backButtonPress = () => {
    Actions.pop();
  }

  logOut = () => {
    this.props.authClean();
    this.props.cleanProducts();
    this.props.cleanSelectedProduct();
    this.props.cleanReviews();
    AsyncStorage.removeItem(ASYNCSTORAGE_TOKEN_KEY);
    Actions.main();
  }

  openReviewForm = () => {
    this.setState({ showReviewForm: true });
  }

  postReview = (data) => {
    this.props.apiPostReview(this.props.token, data, this.props.selectedProduct.id, (success) => {
      if (success) {
        this.hideReviewForm();
        this.gettingProductReviews();
      }
    });
  }

  hideReviewForm = () => {
    this.setState({ showReviewForm: false });
  }

  renderRows = (rowData) => {
    return (
      <ReviewRow 
        rowData={rowData}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Header 
            leftAction={this.backButtonPress}
            rightAction={this.logOut}
            title={this.props.selectedProduct.title}
            isShowLeftButton
          />
          <Spinner visible={this.state.visible} overlayColor={'transparent'} color={colors.grayColor} />
        </View>
      )
    }
   
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});   
    return (
      <View style={styles.pageContainer}>
        <Spinner visible={this.state.visible} overlayColor={'transparent'} color={colors.grayColor} />
        <Header 
          leftAction={this.backButtonPress}
          rightAction={this.logOut}
          title={this.props.selectedProduct.title}
          isShowLeftButton
        />
        <View>
          <Image 
            source={{uri: `${API_IMAGES}${this.props.selectedProduct.img}`}}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{this.props.selectedProduct.text}</Text>
        </View>
        <ListView
         style={styles.listView}
         dataSource={ds.cloneWithRows(this.props.reviews)}
         renderRow={this.renderRows}
         enableEmptySections
       />
       {
        (this.props.token.length > 0) &&
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => this.openReviewForm()}
          >
            <Image 
              source={plusIcon}
              style={{ width: 30, height: 30 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
       }
        <Modal
          animationType={"fade"}
          transparent
          visible={this.state.showReviewForm}
          onRequestClose={() => this.setState({ showReviewForm: false })}
        >
          <Review 
            hideReviewForm={this.hideReviewForm}
            postReview={this.postReview}
            id={this.props.selectedProduct.id}
          />
        </Modal>
      </View>
    );
  }
}
export default connect(state => ({
  selectedProduct: state.products.selectedProduct,
  token: state.auth.token,
  reviews: state.products.reviews,
  isConnected: state.network.isConnected,
}), dispatch => bindActionCreators({
  apiGetReview,
  authClean,
  cleanProducts,
  cleanSelectedProduct,
  cleanReviews,
  apiPostReview,
}, dispatch))(ProductInfo);