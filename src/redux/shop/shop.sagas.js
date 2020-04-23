import { takeLatest, call, put } from 'redux-saga/effects';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

import { FETCH_COLLECTIONS_START } from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

export function* fetchCollecionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch ({ message }) {
    yield put(fetchCollectionsFailure(message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollecionsAsync);
}
