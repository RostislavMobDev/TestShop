import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as authActions from '../../auth';
import * as Query from '../../../utils/query';

export const LOGIN = 'AUTH_LOGIN';
export const REGISTRATION = 'AUTH_REGISTRATION';

export const apiAuthLogin = (username, password, callback) => ({
  type: LOGIN,
  username,
  password,
  callback,
});

export const apiAuthRegistration = (username, password, callback) => ({
  type: REGISTRATION,
  username,
  password,
  callback,
});

function* fetchLogin(data) {
  try { 
    const result = yield Query.loginQuery(data.username, data.password);
     if (result.success) {
      yield put(authActions.authSetUsername(data.username));
      yield put(authActions.authSetToken(result.token));
      data.callback(true);
    } else if (result.message) {
      data.callback(false, result.message);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}
function* fetchRegistration(data) {
  try {
    const result = yield Query.registrationQuery(data.username, data.password);
    console.warn('qwe ', result);
    if (result.success) {
      yield put(authActions.authSetUsername(data.username));
      yield put(authActions.authSetToken(result.token));
      data.callback(true);
    } else if (result.message) {
      data.callback(false, result.message);
    } else {
      data.callback(false);
    }
  } catch (e) {
    console.log('Error: ', e);
    data.callback(false);
  }
}


export function* fetchLoginFork() {
  yield* takeEvery(LOGIN, fetchLogin);
}

export function* fetchRegistrationFork() {
  yield* takeEvery(REGISTRATION, fetchRegistration);
}
