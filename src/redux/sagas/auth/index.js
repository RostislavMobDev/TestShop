import {fork} from 'redux-saga/effects';
import {
  fetchLoginFork,
  fetchRegistrationFork,
} from './auth';

export default function* () {
  yield fork(fetchLoginFork);
  yield fork(fetchRegistrationFork);
}