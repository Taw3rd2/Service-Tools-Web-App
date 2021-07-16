import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addTechnicianFailure,
  fetchTechniciansSuccess,
  fetchTechniciansFailure,
  updateTechnicianSuccess,
  updateTechnicianFailure,
  deleteTechnicianSuccess,
  deleteTechnicianFailure,
} from "./technician.actions";

import { TechnicianActionTypes } from "./technician.types";

//create
export function* addTechnicianAsync({ payload: { color, email, name } }) {
  try {
    const docForId = firestore.collection("technicians").doc();
    const generatedId = docForId.id;
    const techniciansRef = firestore.collection("technicians").doc(generatedId);
    yield techniciansRef
      .set({ color: color, email: email, name: name })
      .then(() => console.log("Added ", name));
  } catch (error) {
    yield put(addTechnicianFailure(error.message));
  }
}

export function* onAddNewTechnicianStart() {
  yield takeLatest(
    TechnicianActionTypes.ADD_TECHNICIAN_START,
    addTechnicianAsync
  );
}

//sync
export function* syncTechnicians() {
  const techniciansRef = firestore.collection("technicians");
  const channel = eventChannel((emit) => techniciansRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        snapshot
      );
      yield put(fetchTechniciansSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchTechniciansFailure(error.message));
  }
}

//update
export function* updateTechnicianAsync({
  payload: { color, email, name, id },
}) {
  try {
    const techniciansRef = firestore.collection("technicians");
    yield techniciansRef
      .doc(id)
      .update({ color, email, name })
      .then(() => console.log("Updated ", name));
    yield put(updateTechnicianSuccess({ color, email, name, id }));
  } catch (error) {
    yield put(updateTechnicianFailure(error.message));
  }
}

export function* onUpdateTechnicianStart() {
  yield takeLatest(
    TechnicianActionTypes.UPDATE_TECHNICIAN_START,
    updateTechnicianAsync
  );
}

//delete
export function* deleteTechnicianAsync({ payload: { name, id } }) {
  try {
    const techniciansRef = firestore.collection("technicians");
    yield techniciansRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", name));
    yield put(deleteTechnicianSuccess({ id }));
  } catch (error) {
    yield put(deleteTechnicianFailure(error.message));
  }
}

export function* onDeleteTechnicianStart() {
  yield takeLatest(
    TechnicianActionTypes.DELETE_TECHNICIAN_START,
    deleteTechnicianAsync
  );
}

export function* technicianSagas() {
  yield all([
    call(onAddNewTechnicianStart),
    call(syncTechnicians),
    call(onUpdateTechnicianStart),
    call(onDeleteTechnicianStart),
  ]);
}
