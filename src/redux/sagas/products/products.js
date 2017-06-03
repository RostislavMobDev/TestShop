import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import * as productsActions from '../../products';
import * as Query from '../../../utils/query';
export const PRODUCTS = 'GET_PRODUCTS';
export const POST_REVIEW = 'POST_REVIEW';
export const GET_REVIEW = 'GET_REVIEW';

export const apiGetProducts = (token, callback) => ({
  type: PRODUCTS,
  token,
  callback,
});

export const apiPostReview = (data, product_id, callback) => ({
  type: POST_REVIEW,
  data,
  product_id,
  callback,
});

export const apiGetReview = (product_id,callback) => ({
  type: GET_REVIEW,
  product_id,
  callback,
});

function* fetchGetProducts(data) {
  try {
    const result = yield Query.productsQuery(data.token);
    if (result) {
      yield put(productsActions.setProducts(result));
      data.callback(true);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}

function* fetchPostReview(data) {
  try {
    const result = yield Query.postReviewQuery(data.product_id, data.data);
    if (result) {
      // yield put(authActions.authSetUsername(data.username));
      // yield put(authActions.authSetToken(result.token));
      data.callback(true);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}

function* fetchGetReview(data) {
  try {
    const result = yield Query.getReviewQuery(data.product_id);
    if (result) {
      // yield put(authActions.authSetUsername(data.username));
      // yield put(authActions.authSetToken(result.token));
      data.callback(true);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}

export function* fetchProductsFork() {
  yield* takeEvery(PRODUCTS, fetchGetProducts);
}

export function* fetchPostReviewFork() {
  yield* takeEvery(POST_REVIEW, fetchPostReview);
}

export function* fetchGetReviewFork() {
  yield* takeEvery(GET_REVIEW, fetchGetReview);
}
