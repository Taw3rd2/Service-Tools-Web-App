import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertLabelSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addLabelFailure,
  fetchLabelsSuccess,
  fetchLabelsFailure,
  updateLabelSuccess,
  updateLabelFailure,
  deleteLabelSuccess,
  deleteLabelFailure,
} from "./label.actions";

import { LabelActionTypes } from "./label.types";

//create
export function* addLabelAsync({ payload: { labelDate, locationName, tech } }) {
  try {
    const docForId = firestore.collection("calLabel").doc();
    const generatedId = docForId.id;
    const labelsRef = firestore.collection("calLabel").doc(generatedId);
    yield labelsRef
      .set({ labelDate, locationName, tech })
      .then(() => console.log("Added ", locationName));
  } catch (error) {
    yield put(addLabelFailure(error.message));
  }
}

export function* onAddNewLabelStart() {
  yield takeLatest(LabelActionTypes.ADD_LABEL_START, addLabelAsync);
}

//sync
export function* syncLabels() {
  const labelsRef = firestore.collection("calLabel");
  const channel = eventChannel((emit) => labelsRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(convertLabelSnapshotToMap, snapshot);
      yield put(fetchLabelsSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchLabelsFailure(error.message));
  }
}

//update
export function* updateLabelAsync({
  payload: { labelDate, locationName, tech, id },
}) {
  try {
    const labelsRef = firestore.collection("calLabel");
    yield labelsRef
      .doc(id)
      .update({ labelDate, locationName, tech })
      .then(() => console.log("Updated ", locationName));
    yield put(updateLabelSuccess({ labelDate, locationName, tech }));
  } catch (error) {
    yield put(updateLabelFailure(error.message));
  }
}

export function* onUpdateLabelStart() {
  yield takeLatest(LabelActionTypes.UPDATE_LABEL_START, updateLabelAsync);
}

//delete
export function* deleteLabelAsync({ payload: { id } }) {
  console.log(" you made it to the deletelabelasync in saga");
  try {
    const labelsRef = firestore.collection("calLabel");
    yield labelsRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted "));
    yield put(deleteLabelSuccess({ id }));
  } catch (error) {
    yield put(deleteLabelFailure(error.message));
  }
}

export function* onDeleteLabelStart() {
  yield takeLatest(LabelActionTypes.DELETE_LABEL_START, deleteLabelAsync);
}

export function* labelSagas() {
  yield all([
    call(syncLabels),
    call(onAddNewLabelStart),
    call(onUpdateLabelStart),
    call(onDeleteLabelStart),
  ]);
}
