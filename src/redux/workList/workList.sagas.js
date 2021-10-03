import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addWorkListItemFailure,
  fetchWorkListSuccess,
  fetchWorkListFailure,
  updateWorkListSuccess,
  updateWorkListFailure,
  deleteWorkListItemSuccess,
  deleteWorkListItemFailure,
} from "./workList.actions";

import { WorkListActionTypes } from "./workList.types";

//create
export function* addWorkListAsync({ payload: { item, shorthand } }) {
  try {
    const docForId = firestore.collection("worklist").doc();
    const generatedId = docForId.id;
    const workListRef = firestore.collection("workList").doc(generatedId);
    yield workListRef
      .set({ item: item, shorthand: shorthand })
      .then(() => console.log("Added ", item));
  } catch (error) {
    yield put(addWorkListItemFailure(error.message));
  }
}

export function* onAddNewWorkListStart() {
  yield takeLatest(
    WorkListActionTypes.ADD_WORK_LIST_ITEM_START,
    addWorkListAsync
  );
}

//sync
export function* syncWorkListItems() {
  const workListItemsRef = firestore.collection("workList");
  const channel = eventChannel((emit) => workListItemsRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        snapshot
      );
      yield put(fetchWorkListSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchWorkListFailure(error.message));
  }
}

//update
export function* updateWorkListAsync({ payload: { item, id, shorthand } }) {
  try {
    const workListRef = firestore.collection("workList");
    yield workListRef
      .doc(id)
      .update({ item, shorthand })
      .then(() => console.log("Updated ", item));
    yield put(updateWorkListSuccess({ item, id, shorthand }));
  } catch (error) {
    yield put(updateWorkListFailure(error.message));
  }
}

export function* onUpdateWorkListStart() {
  yield takeLatest(
    WorkListActionTypes.UPDATE_WORK_LIST_ITEM_START,
    updateWorkListAsync
  );
}

//delete
export function* deleteWorkListItemAsync({ payload: { item, id, shorthand } }) {
  try {
    const workListRef = firestore.collection("workList");
    yield workListRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", item));
    yield put(deleteWorkListItemSuccess({ item, id, shorthand }));
  } catch (error) {
    yield put(deleteWorkListItemFailure(error.message));
  }
}

export function* onDeleteWorkListItemStart() {
  yield takeLatest(
    WorkListActionTypes.DELETE_WORK_LIST_ITEM_START,
    deleteWorkListItemAsync
  );
}

export function* workListSagas() {
  yield all([
    call(onAddNewWorkListStart),
    call(syncWorkListItems),
    call(onUpdateWorkListStart),
    call(onDeleteWorkListItemStart),
  ]);
}
