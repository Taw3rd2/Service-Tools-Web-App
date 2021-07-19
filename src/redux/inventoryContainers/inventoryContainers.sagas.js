import { all, takeLatest, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import {
    addInventoryContainerFailure,
    fetchInventoryContainersSuccess,
    fetchInventoryContainersFailure,
    updateInventoryContainerSuccess,
    updateInventoryContainerFailure,
    deleteInventoryContainerSuccess,
    deleteInventoryContainerFailure,
} from './inventoryContainers.actions'

import { InventoryContainersActionTypes } from './inventoryContainers.types'

//create
export function* addContainerAsync({ 
    payload: {
        containerName,
        lastInventoried,
        partsList,
        partsNeeded,
    }, }) {
    try {
        const docForId = firestore.collection("parts").doc();
        const generatedId = docForId.id;
        const inventoryContainerRef = firestore.collection("inventoryContainers").doc(generatedId);
        yield inventoryContainerRef
            .set({
                containerName,
                lastInventoried,
                partsList,
                partsNeeded,
            })
            .then(() => console.log("Added", containerName));
    } catch (error) {
        yield put(addInventoryContainerFailure(error.message));
    }
}

export function* onAddNewContainerStart() {
    yield takeLatest(
        InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_START,
        addContainerAsync
    );
}

//sync
export function* syncInventoryContainers() {
    const inventoryContainersRef = firestore.collection("inventoryContainers")
    const channel = eventChannel((emit) => inventoryContainersRef.onSnapshot(emit));
    try {
        while (true) {
            const snapshot = yield take(channel);
            const collectionsMap = yield call(
                convertCollectionsSnapshotToMap,
                snapshot
            );
            yield put(fetchInventoryContainersSuccess(collectionsMap));
        }
    } catch (error) {
        yield put(fetchInventoryContainersFailure(error.message));
    }
}

//update
export function* updateContainerAsync({ 
    payload: {
        containerName,
        id,
        lastInventoried,
        partsList,
        partsNeeded,
    }, 
}) {
    try {
        const inventoryContainersRef = firestore.collection("inventoryContainers");
        yield inventoryContainersRef
        .doc(id)
        .update({
            containerName,
            lastInventoried,
            partsList,
            partsNeeded,
        })
        .then(() => console.log("Updated ", containerName));
        yield put(
            updateInventoryContainerSuccess({
                containerName,
                lastInventoried,
                partsList,
                partsNeeded,
            })
        );
    } catch (error) {
        yield put(updateInventoryContainerFailure(error.message));
    }
}

export function* onUpdateInventoryContainerStart() {
    yield takeLatest(InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_START, updateContainerAsync);
}

//delete
export function* deleteContainerAsync({
    payload: { containerName, id } }) {
        try {
            const inventoryContainerRef = firestore.collection("inventoryContainers");
            yield inventoryContainerRef
                .doc(id)
                .delete()
                .then(() => console.log("Deleted ", containerName));
            yield put(deleteInventoryContainerSuccess({ id }));
        } catch (error) {
            yield put(deleteInventoryContainerFailure(error.message));
        }
    }

export function* onDeleteContainerStart() {
    yield takeLatest(InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_START, deleteContainerAsync);
}

export function* inventoryContainersSagas() {
    yield all([
        call(onAddNewContainerStart),
        call(syncInventoryContainers),
        call(onUpdateInventoryContainerStart),
        call(onDeleteContainerStart),
    ]);
}