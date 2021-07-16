import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
    firestore,
    convertCollectionsSnapshotToMap,
  } from "../../firebase/firebase.utils";

  import {
    addTabFailure,
    fetchTabsSuccess,
    fetchTabsFailure,
    updateTabSuccess,
    updateTabFailure,
    deleteTabSuccess,
    deleteTabFailure,
  } from "./tab.actions";

  import { TabActionTypes } from './tab.types'

  //create
  export function* addTabAsync({ payload: { name } }) {
    try {
      const docForId = firestore.collection("tabs").doc();
      const generatedId = docForId.id;
      const tabRef = firestore.collection("tabs").doc(generatedId);
      yield tabRef
        .set({ name: name })
        .then(() => console.log("Added ", name));
    } catch (error) {
      yield put(addTabFailure(error.message));
    }
  }
  
  export function* onAddNewTabStart() {
    yield takeLatest(
      TabActionTypes.ADD_TAB_START,
      addTabAsync
    );
  }

  //sync
  export function* syncTabs() {
    const tabsRef = firestore.collection("tabs");
    const channel = eventChannel((emit) => tabsRef.onSnapshot(emit));
    try {
      while (true) {
        const snapshot = yield take(channel);
        const collectionsMap = yield call(
          convertCollectionsSnapshotToMap,
          snapshot
        );
        yield put(fetchTabsSuccess(collectionsMap));
      }
    } catch (error) {
      yield put(fetchTabsFailure(error.message));
    }
  }
  
  //Update
  export function* updateTabAsync({ payload: { name, id } }) {
    try {
      const tabsRef = firestore.collection("tabs");
      yield tabsRef
        .doc(id)
        .update({ name: name })
        .then(() => console.log("Updated: ", name));
      yield put(updateTabSuccess({ name, id }));
    } catch (error) {
      yield put(updateTabFailure(error.message));
    }
  }
  
  export function* onUpdateTabStart() {
    yield takeLatest(
      TabActionTypes.UPDATE_TAB_START,
      updateTabAsync
    );
    }

    //delete
    export function* deleteTabAsync({ payload: { name, id } }) {
        try {
          const tabRef = firestore.collection("tabs");
          yield tabRef
            .doc(id)
            .delete()
            .then(() => console.log("Deleted ", name));
          yield put(deleteTabSuccess({ name, id }));
        } catch (error) {
          yield put(deleteTabFailure(error.message));
        }
      }
      
      export function* onDeleteTabStart() {
        yield takeLatest(
          TabActionTypes.DELETE_TAB_START,
          deleteTabAsync,
        );
      }

      export function* tabSagas() {
          yield all([
              call(onAddNewTabStart),
              call(syncTabs),
              call(onUpdateTabStart),
              call(onDeleteTabStart),
          ]);
      }
  