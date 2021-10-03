import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addDispatcherFailure,
  fetchDispatchersSuccess,
  fetchDispatchersFailure,
  updateDispatcherSuccess,
  updateDispatcherFailure,
  deleteDispatcherSuccess,
  deleteDispatcherFailure,
} from "./dispatcher.actions";

import { DispatcherActionTypes } from "./dispatcher.types";

//create
export function* addDispatcherAsync({ payload: { name } }) {
  try {
    const docForId = firestore.collection("dispatchers").doc();
    const generatedId = docForId.id;
    const dispatcherRef = firestore.collection("dispatchers").doc(generatedId);
    yield dispatcherRef
      .set({ name: name })
      .then(() => console.log("Added ", name));
  } catch (error) {
    yield put(addDispatcherFailure(error.message));
  }
}

export function* onAddNewDispatcherStart() {
  yield takeLatest(
    DispatcherActionTypes.ADD_DISPATCHER_START,
    addDispatcherAsync
  );
}

//sync
export function* syncDispatchers() {
  const dispatchersRef = firestore.collection("dispatchers");
  const channel = eventChannel((emit) => dispatchersRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        snapshot
      );
      yield put(fetchDispatchersSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchDispatchersFailure(error.message));
  }
}

//update
export function* updateDispatcherAsync({ payload: { name, id } }) {
  try {
    const dispatchersRef = firestore.collection("dispatchers");
    yield dispatchersRef
      .doc(id)
      .update({ name: name })
      .then(() => console.log("Updated: ", name));
    yield put(updateDispatcherSuccess({ name, id }));
  } catch (error) {
    yield put(updateDispatcherFailure(error.message));
  }
}

export function* onUpdateDispatcherStart() {
  yield takeLatest(
    DispatcherActionTypes.UPDATE_DISPATCHER_START,
    updateDispatcherAsync
  );
}

//delete
export function* deleteDispatcherAsync({ payload: { name, id } }) {
  try {
    const dispatcherRef = firestore.collection("dispatchers");
    yield dispatcherRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", name));
    yield put(deleteDispatcherSuccess({ name, id }));
  } catch (error) {
    yield put(deleteDispatcherFailure(error.message));
  }
}

export function* onDeleteDispatcherStart() {
  yield takeLatest(
    DispatcherActionTypes.DELETE_DISPATCHER_START,
    deleteDispatcherAsync,
  );
}

export function* dispatcherSagas() {
  yield all([
    call(onAddNewDispatcherStart),
    call(syncDispatchers),
    call(onUpdateDispatcherStart),
    call(onDeleteDispatcherStart),
  ]);
}
