import { all, takeLatest, call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  firestore,
  convertEventSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  addEventFailure,
  fetchEventsSuccess,
  fetchEventsFailure,
  updateEventSuccess,
  updateEventFailure,
  deleteEventSuccess,
  deleteEventFailure,
  deleteTwoEventsSuccess,
  deleteTwoEventsFailure,
} from "./event.actions";

import { EventActionTypes } from "./event.types";

//create
export function* addEventAsync({
  payload: {
    altPhoneName,
    altphone,
    city,
    customerId,
    dateCreated,
    dateModified,
    dateScheduled,
    end,
    firstname,
    invoiceId,
    issue,
    jobNumber,
    lastname,
    leadSource,
    notes,
    payment,
    phone,
    phoneName,
    scheduledDate,
    shorthand,
    start,
    status,
    street,
    takenBy,
    techHelper,
    techHelperId,
    techLead,
    timeAlotted,
    timeOfDay,
    title,
    id,
  },
}) {
  try {
    const eventsRef = firestore.collection("events").doc(id);
    yield eventsRef
      .set({
        altPhoneName,
        altphone,
        city,
        customerId,
        dateCreated,
        dateModified,
        dateScheduled,
        end,
        firstname,
        invoiceId,
        issue,
        jobNumber,
        lastname,
        leadSource,
        notes,
        payment,
        phone,
        phoneName,
        scheduledDate,
        shorthand,
        start,
        status,
        street,
        takenBy,
        techHelper,
        techHelperId,
        techLead,
        timeAlotted,
        timeOfDay,
        title,
      })
      .then(() => console.log("Added ", lastname));
  } catch (error) {
    yield put(addEventFailure(error.message));
  }
}

export function* onAddNewEventStart() {
  yield takeLatest(EventActionTypes.ADD_EVENT_START, addEventAsync);
}

//sync
export function* syncEvents() {
  const eventsRef = firestore.collection("events");
  const channel = eventChannel((emit) => eventsRef.onSnapshot(emit));
  try {
    while (true) {
      const snapshot = yield take(channel);
      const collectionsMap = yield call(convertEventSnapshotToMap, snapshot);
      yield put(fetchEventsSuccess(collectionsMap));
    }
  } catch (error) {
    yield put(fetchEventsFailure(error.message));
  }
}

//update
export function* updateEventAsync({
  payload: {
    altPhoneName,
    altphone,
    city,
    customerId,
    dateCreated,
    dateModified,
    dateScheduled,
    end,
    firstname,
    issue,
    jobNumber,
    lastname,
    leadSource,
    notes,
    payment,
    phone,
    phoneName,
    scheduledDate,
    shorthand,
    start,
    status,
    street,
    takenBy,
    techHelper,
    techHelperId,
    techLead,
    timeAlotted,
    timeOfDay,
    title,
    id,
    invoiceId,
  },
}) {
  try {
    const eventsRef = firestore.collection("events");
    yield eventsRef
      .doc(id)
      .update({
        altPhoneName,
        altphone,
        city,
        customerId,
        dateCreated,
        dateModified,
        dateScheduled,
        end,
        firstname,
        invoiceId,
        issue,
        jobNumber,
        lastname,
        leadSource,
        notes,
        payment,
        phone,
        phoneName,
        scheduledDate,
        shorthand,
        start,
        status,
        street,
        takenBy,
        techHelper,
        techHelperId,
        techLead,
        timeAlotted,
        timeOfDay,
        title,
      })
      .then(() => console.log("Updated ", lastname));
    yield put(
      updateEventSuccess({
        altPhoneName,
        altphone,
        city,
        customerId,
        dateCreated,
        dateModified,
        dateScheduled,
        end,
        firstname,
        invoiceId,
        issue,
        jobNumber,
        lastname,
        leadSource,
        notes,
        payment,
        phone,
        phoneName,
        scheduledDate,
        shorthand,
        start,
        status,
        street,
        takenBy,
        techHelper,
        techHelperId,
        techLead,
        timeAlotted,
        timeOfDay,
        title,
      })
    );
  } catch (error) {
    yield put(updateEventFailure(error.message));
  }
}

export function* onUpdateEventStart() {
  yield takeLatest(EventActionTypes.UPDATE_EVENT_START, updateEventAsync);
}

//delete
export function* deleteEventAsync({ payload: { lastname, id } }) {
  try {
    const eventsRef = firestore.collection("events");
    yield eventsRef
      .doc(id)
      .delete()
      .then(() => console.log("Deleted ", lastname));
    yield put(deleteEventSuccess({ id }));
  } catch (error) {
    yield put(deleteEventFailure(error.message));
  }
}

export function* onDeleteEventStart() {
  yield takeLatest(EventActionTypes.DELETE_EVENT_START, deleteEventAsync);
}

//delete two events
export function* deleteTwoEventsAsync({ payload: { lastname, id, techHelperId } }) {
  try {
    console.log("id: ", id)
    console.log("techHelperId: ", techHelperId)
    let batch = firestore.batch()
    const firstRef = firestore.collection("events").doc(id);
    const secondRef = firestore.collection("events").doc(techHelperId);
    batch.delete(firstRef)
    batch.delete(secondRef)
    yield batch.commit().then(() => console.log(" BATCH COMPLETED for: ", lastname))
    yield put(deleteEventSuccess({ id }));
    yield put(deleteTwoEventsSuccess({ techHelperId }));
  } catch (error) {
    yield put(deleteTwoEventsFailure(error.message));
  }
}

export function* onDeleteTwoEventsStart() {
  yield takeLatest(EventActionTypes.DELETE_TWO_EVENTS_START, deleteTwoEventsAsync)
}

export function* eventSagas() {
  yield all([
    call(onAddNewEventStart),
    call(syncEvents),
    call(onUpdateEventStart),
    call(onDeleteEventStart),
    call(onDeleteTwoEventsStart),
  ]);
}
