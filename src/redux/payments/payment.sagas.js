import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addPaymentFailure,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  updatePaymentSuccess,
  updatePaymentFailure,
  deletePaymentSuccess,
  deletePaymentFailure,
} from "./payment.actions";

import { PaymentActionTypes } from "./payment.types";

//create
export function* addPaymentAsync({ payload: { item } }) {
  try {
    const docForId = firestore.collection("payments").doc();
    const generatedId = docForId.id;
    const paymentsRef = firestore.collection("payments").doc(generatedId);
    yield paymentsRef
      .set({ item: item })
      .then(() => console.log("Added ", item));
  } catch (error) {
    yield put(addPaymentFailure(error.message));
  }
}

export function* onAddNewPaymentStart() {
  yield takeLatest(PaymentActionTypes.ADD_PAYMENT_START, addPaymentAsync);
}

//read
// export function* fetchPaymentCollectionsAsync() {
//   try {
//     const paymentsRef = firestore.collection("payments");
//     const snapshot = yield paymentsRef.get();
//     const collectionsMap = yield call(
//       convertCollectionsSnapshotToMap,
//       snapshot
//     );
//     yield put(fetchPaymentsSuccess(collectionsMap));
//   } catch (error) {
//     yield put(fetchPaymentsFailure(error.message));
//   }
// }

// export function* fetchPaymentCollectionsStart() {
//   yield takeLatest(
//     PaymentActionTypes.FETCH_PAYMENTS_START,
//     fetchPaymentCollectionsAsync
//   );
//   }

//sync
export function* syncPayments() {
  const paymentsRef = firestore.collection("payments");
  const channel = eventChannel((emit) => paymentsRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(
        convertCollectionsSnapshotToMap,
        snapshot
      );
      yield put(fetchPaymentsSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error.message));
  }
}

//update
export function* updatePaymentAsync({ payload: { item, id } }) {
  try {
    const paymentsRef = firestore.collection("payments");
    yield paymentsRef
      .doc(id)
      .update({ item: item })
      .then(() => console.log("Updated ", item));
    yield put(updatePaymentSuccess({ item, id }));
  } catch (error) {
    yield put(updatePaymentFailure(error.message));
  }
}

export function* onUpdatePaymentStart() {
  yield takeLatest(PaymentActionTypes.UPDATE_PAYMENT_START, updatePaymentAsync);
}

//delete
export function* deletePaymentAsync({ payload: { item, id } }) {
  try {
    const paymentsRef = firestore.collection("payments");
    yield paymentsRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", item));
    yield put(deletePaymentSuccess({ item, id }));
  } catch (error) {
    yield put(deletePaymentFailure(error.message));
  }
}

export function* onDeletePaymentStart() {
  yield takeLatest(PaymentActionTypes.DELETE_PAYMENT_START, deletePaymentAsync);
}

export function* paymentSagas() {
  yield all([
    call(syncPayments),
    call(onDeletePaymentStart),
    call(onAddNewPaymentStart),
    call(onUpdatePaymentStart),
  ]);
}
