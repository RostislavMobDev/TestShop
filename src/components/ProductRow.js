import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../constants/colors';
import { API_IMAGES } from '../constants/config';
import { setSelectedProduct } from '../redux/products';

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

class ProductRow extends React.Component {

  openProductDetails = () => {
    this.props.setSelectedProduct(this.props.data);
    this.props.openProductDetails();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity 
          style={styles.buttonStyle} 
          onPress={() => this.openProductDetails()}
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
export default connect(state => ({
  selectedProduct: state.products.selectedProduct,
}), dispatch => bindActionCreators({
  setSelectedProduct,
}, dispatch))(ProductRow);