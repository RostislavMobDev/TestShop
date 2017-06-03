import { fork } from 'redux-saga/effects';

import auth from './auth';
import products from './products';

function* root() {
  yield [
  	fork(auth),
  	fork(products),
  ];
}
export default root;
