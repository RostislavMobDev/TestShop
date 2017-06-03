import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux';
import Root from './root';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
