import { all, takeLatest, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import {
    addPartsCatalogFailure,
    fetchPartsCatalogSuccess,
    fetchPartsCatalogFailure,
    updatePartsCatalogSuccess,
    updatePartsCatalogFailure,
    deletePartsCatalogSuccess,
    deletePartsCatalogFailure,
} from './partsCatalog.actions'

import { PartsCatalogActionTypes } from './partsCatalog.types'

//create
export function* addPartAsync({ 
    payload: {
        category,
        crossReference,
        partCost,
        partDataDate,
        partDataServicer,
        partDescription,
        partLabor,
        partNotes,
        partNumber,
        partVendor,
        url,
    }, }) {
    try {
        const docForId = firestore.collection("parts").doc();
        const generatedId = docForId.id;
        const partsCatalogRef = firestore.collection("parts").doc(generatedId);
        yield partsCatalogRef
            .set({
                category,
                crossReference,
                partCost,
                partDataDate,
                partDataServicer,
                partDescription,
                partLabor,
                partNotes,
                partNumber,
                partVendor,
                url,
            })
            .then(() => console.log("Added", partNumber));
    } catch (error) {
        yield put(addPartsCatalogFailure(error.message));
    }
}

export function* onAddNewPartStart() {
    yield takeLatest(
        PartsCatalogActionTypes.ADD_PARTS_CATALOG_START,
        addPartAsync
    );
}

//sync
export function* syncPartsCatalog() {
    const partsCatalogRef = firestore.collection("parts")
    const channel = eventChannel((emit) => partsCatalogRef.onSnapshot(emit));
    try {
        while (true) {
            const snapshot = yield take(channel);
            const collectionsMap = yield call(
                convertCollectionsSnapshotToMap,
                snapshot
            );
            yield put(fetchPartsCatalogSuccess(collectionsMap));
        }
    } catch (error) {
        yield put(fetchPartsCatalogFailure(error.message));
    }
}

//update
export function* updatePartAsync({ 
    payload: {
        category,
        crossReference,
        id,
        partCost,
        partDataDate,
        partDataServicer,
        partDescription,
        partLabor,
        partNotes,
        partNumber,
        partVendor,
        url,
    }, 
}) {
    try {
        const partsCatalogRef = firestore.collection("parts");
        yield partsCatalogRef
        .doc(id)
        .update({
            category,
            crossReference,
            partCost,
            partDataDate,
            partDataServicer,
            partDescription,
            partLabor,
            partNotes,
            partNumber,
            partVendor,
            url,
        })
        .then(() => console.log("Updated ", partNumber));
        yield put(
            updatePartsCatalogSuccess({
                category,
                crossReference,
                partCost,
                partDataDate,
                partDataServicer,
                partDescription,
                partLabor,
                partNotes,
                partNumber,
                partVendor,
                url,
            })
        );
    } catch (error) {
        yield put(updatePartsCatalogFailure(error.message));
    }
}

export function* onUpdatePartsCatalogStart() {
    yield takeLatest(PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_START, updatePartAsync);
}

//delete
export function* deletePartAsync({
    payload: { partNumber, id } }) {
        try {
            const partsCatalogRef = firestore.collection("parts");
            yield partsCatalogRef
                .doc(id)
                .delete()
                .then(() => console.log("Deleted ", partNumber));
            yield put(deletePartsCatalogSuccess({ id }));
        } catch (error) {
            yield put(deletePartsCatalogFailure(error.message));
        }
    }

export function* onDeletePartStart() {
    yield takeLatest(PartsCatalogActionTypes.DELETE_PARTS_CATALOG_START, deletePartAsync);
}

export function* partsCatalogSagas() {
    yield all([
        call(onAddNewPartStart),
        call(syncPartsCatalog),
        call(onUpdatePartsCatalogStart),
        call(onDeletePartStart)
    ]);
}