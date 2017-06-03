import React from 'react';
import {
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

EStyleSheet.build();

class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar hideTabBar>      
            <Scene key="main" component={Main} />
            <Scene key="login" component={Login} />
            <Scene key="signup" component={SignUp} />
            <Scene key="products" component={Products} /> 
          </Scene>
        </Router>
      </View>
    );
  }
}
export default connect()(Root);
