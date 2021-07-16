import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addClientFailure,
  fetchClientsSuccess,
  fetchClientsFailure,
  updateClientSuccess,
  updateClientFailure,
  deleteClientSuccess,
  deleteClientFailure,
} from "./clients.actions";

import { ClientsActionTypes } from "./clients.types";

//create
export function* addClientAsync({
  payload: {
    altPhoneName,
    altphone,
    billingAlternateEmail,
    billingAlternateName,
    billingAlternatePhone,
    billingOtherEmail,
    billingOtherName,
    billingOtherPhone,
    billingPrimaryEmail,
    billingPrimaryName,
    billingPrimaryPhone,
    billingcity,
    billingiscommercial,
    billingorg,
    billingstate,
    billingstreet,
    billingzip,
    city,
    cnotes,
    firstname,
    lastname,
    otherPhone,
    otherPhoneName,
    phone,
    phoneName,
    squarefootage,
    state,
    street,
    zip,
  },
}) {
  try {
    const clientRef = firestore.collection("customers");
    yield clientRef
      .add({
        altPhoneName: altPhoneName,
        altphone: altphone,
        billingAlternateEmail: billingAlternateEmail,
        billingAlternateName: billingAlternateName,
        billingAlternatePhone: billingAlternatePhone,
        billingOtherEmail: billingOtherEmail,
        billingOtherName: billingOtherName,
        billingOtherPhone: billingOtherPhone,
        billingPrimaryEmail: billingPrimaryEmail,
        billingPrimaryName: billingPrimaryName,
        billingPrimaryPhone: billingPrimaryPhone,
        billingcity: billingcity,
        billingiscommercial: billingiscommercial,
        billingorg: billingorg,
        billingstate: billingstate,
        billingstreet: billingstreet,
        billingzip: billingzip,
        city: city,
        cnotes: cnotes,
        firstname: firstname,
        lastname: lastname,
        otherPhone: otherPhone,
        otherPhoneName: otherPhoneName,
        phone: phone,
        phoneName: phoneName,
        squarefootage: squarefootage,
        state: state,
        street: street,
        zip: zip,
      })
      .then(() => console.log("Added ", lastname));
  } catch (error) {
    yield put(addClientFailure(error.message));
  }
}

export function* onAddNewClientStart() {
  yield takeLatest(ClientsActionTypes.ADD_CLIENT_START, addClientAsync);
}

//sync
export function* syncClients() {
  const clientsRef = firestore.collection("customers");
  const channel = eventChannel((emit) => clientsRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        snapshot
      );
      yield put(fetchClientsSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchClientsFailure(error.message));
  }
}
// export function* fetchCollectionsAsync() {
//   try {
//     const clientsRef = firestore.collection("customers");
//     const snapshot = yield clientsRef.get();
//     const collectionsMap = yield call(
//       convertCollectionsSnapshotToMap,
//       snapshot
//     );
//     yield put(fetchClientsSuccess(collectionsMap));
//   } catch (error) {
//     yield put(fetchClientsFailure(error.message));
//   }
// }

// export function* fetchCollectionsStart() {
//   yield takeLatest(
//     ClientsActionTypes.FETCH_CLIENTS_START,
//     fetchCollectionsAsync
//   );
// }

//update
export function* updateClientAsync({
  payload: {
    altPhoneName,
    altphone,
    billingAlternateEmail,
    billingAlternateName,
    billingAlternatePhone,
    billingOtherEmail,
    billingOtherName,
    billingOtherPhone,
    billingPrimaryEmail,
    billingPrimaryName,
    billingPrimaryPhone,
    billingcity,
    billingiscommercial,
    billingorg,
    billingstate,
    billingstreet,
    billingzip,
    city,
    cnotes,
    firstname,
    lastname,
    otherPhone,
    otherPhoneName,
    phone,
    phoneName,
    squarefootage,
    state,
    street,
    zip,
    id,
  },
}) {
  try {
    const clientRef = firestore.collection("customers");
    yield clientRef
      .doc(id)
      .update({
        altPhoneName,
        altphone,
        billingAlternateEmail,
        billingAlternateName,
        billingAlternatePhone,
        billingOtherEmail,
        billingOtherName,
        billingOtherPhone,
        billingPrimaryEmail,
        billingPrimaryName,
        billingPrimaryPhone,
        billingcity,
        billingiscommercial,
        billingorg,
        billingstate,
        billingstreet,
        billingzip,
        city,
        cnotes,
        firstname,
        lastname,
        otherPhone,
        otherPhoneName,
        phone,
        phoneName,
        squarefootage,
        state,
        street,
        zip,
      })
      .then(() => console.log("Updated ", lastname));
    yield put(
      updateClientSuccess({
        altPhoneName,
        altphone,
        billingAlternateEmail,
        billingAlternateName,
        billingAlternatePhone,
        billingOtherEmail,
        billingOtherName,
        billingOtherPhone,
        billingPrimaryEmail,
        billingPrimaryName,
        billingPrimaryPhone,
        billingcity,
        billingiscommercial,
        billingorg,
        billingstate,
        billingstreet,
        billingzip,
        city,
        cnotes,
        firstname,
        lastname,
        otherPhone,
        otherPhoneName,
        phone,
        phoneName,
        squarefootage,
        state,
        street,
        zip,
      })
    );
  } catch (error) {
    yield put(updateClientFailure(error.message));
  }
}

export function* onUpdateClientStart() {
  yield takeLatest(ClientsActionTypes.UPDATE_CLIENT_START, updateClientAsync);
}

//delete
export function* deleteClientAsync({ payload: { lastname, id } }) {
  try {
    const clientRef = firestore.collection("customers");
    yield clientRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", lastname));
    yield put(deleteClientSuccess({ id }));
  } catch (error) {
    yield put(deleteClientFailure(error.message));
  }
}

export function* onDeleteClientStart() {
  yield takeLatest(ClientsActionTypes.DELETE_CLIENT_START, deleteClientAsync);
}

export function* clientSagas() {
  yield all([
    call(onAddNewClientStart),
    call(syncClients),
    call(onUpdateClientStart),
    call(onDeleteClientStart),
  ]);
}
