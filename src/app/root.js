import React from 'react';
import {
  View,
  Platform,
  AsyncStorage,
  NetInfo,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';
import ProductInfo from '../pages/ProductInfo';
import * as authActions from '../redux/auth';
import { ASYNCSTORAGE_TOKEN_KEY } from '../constants/config';
import * as networkActions from '../redux/network';
import colors from '../constants/colors';
 
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});

EStyleSheet.build();

class Root extends React.Component {
  componentDidMount() {
    NetInfo.addEventListener(
      'change',
      this.handleFirstConnectivityChange,
    );
    this.loadUserToken()
  }

  handleFirstConnectivityChange = (reach) => {
    const isConnected = (reach.toLowerCase() !== 'none' && reach.toLowerCase() !== 'unknown');
    this.props.dispatch(networkActions.setNetworkIsConnected(isConnected));
  };

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'change',
      this.handleFirstConnectivityChange,
    );
  }

  loadUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNCSTORAGE_TOKEN_KEY);
      if (value !== null) {
        this.props.dispatch(authActions.authSetToken(value));
        Actions.products();
      }
    } catch (error) {
      console.log('load data error: ' + error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar hideTabBar>      
            <Scene key="main" component={Main} />
            <Scene key="login" component={Login} />
            <Scene key="signup" component={SignUp} />
            <Scene key="products" component={Products} /> 
            <Scene key="productinfo" component={ProductInfo} /> 
          </Scene>
        </Router>
      </View>
    );
  }
}
export default connect()(Root);
