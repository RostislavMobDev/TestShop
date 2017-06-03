import {fork} from 'redux-saga/effects';
import {
  fetchProductsFork,
  fetchPostReviewFork,
  fetchGetReviewFork,
} from './products';

export default function* () {
  yield fork(fetchProductsFork);
  yield fork(fetchPostReviewFork);
  yield fork(fetchGetReviewFork);
}