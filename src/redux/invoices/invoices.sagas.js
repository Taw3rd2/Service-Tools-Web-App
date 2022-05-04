import { all, takeLatest, call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import {
    addInvoiceFailure,
    fetchInvoicesSuccess,
    fetchInvoicesFailure,
    updateInvoiceSuccess,
    updateInvoiceFailure,
    deleteInvoiceSuccess,
    deleteInvoiceFailure
} from './invoices.actions'

import { InvoiceActionTypes } from './invoices.types'

//create
export function* addInvoiceAsync({ payload: {
    client,
    isPreDefinedQuote,
    quoteDate,
    equipmentName,
    equipmentBrand,
    equipmentModel,
    equipmentSerial,
    partsList,
    laborHours,
    laborRate,
    maintenance,
    rediagnostic,
    selectedShipping,
    regularShippingTime,
    regularShippingRate,
    quickShippingTime,
    quickShippingRate,
    shippingNotes,
    selectedDiscount,
    disclaimerRed,
    invoiceNumberPrefix,
    userCreatedInvoiceNumber,
    totalPartsCost,
    totalPartsTax,
    totalLabor,
    totalPartsRetailCost,
    subTotalOfInvoice,
    totalMaintenance,
    totalRediagnostic,
    totalShipping,
    totalDiscounts,
    totalQuote,
    halfDown,
    balanceDue,
    workDescription
} }) {
    try {
        const docForId = firestore.collection("invoices").doc();
        const generatedId = docForId.id
        const invoiceRef = firestore.collection("invoices").doc(generatedId)
        yield invoiceRef
            .set({
                client: client,
                isPreDefinedQuote: isPreDefinedQuote,
                quoteDate: quoteDate,
                equipmentName: equipmentName,
                equipmentBrand: equipmentBrand,
                equipmentModel: equipmentModel,
                equipmentSerial: equipmentSerial,
                partsList: partsList,
                laborHours: laborHours,
                laborRate: laborRate,
                maintenance: maintenance,
                rediagnostic: rediagnostic,
                selectedShipping: selectedShipping,
                regularShippingTime: regularShippingTime,
                regularShippingRate: regularShippingRate,
                quickShippingTime: quickShippingTime,
                quickShippingRate: quickShippingRate,
                shippingNotes: shippingNotes,
                selectedDiscount: selectedDiscount,
                disclaimerRed: disclaimerRed,
                invoiceNumberPrefix: invoiceNumberPrefix,
                userCreatedInvoiceNumber: userCreatedInvoiceNumber,
                totalPartsCost: totalPartsCost,
                totalPartsTax: totalPartsTax,
                totalLabor: totalLabor,
                totalPartsRetailCost: totalPartsRetailCost,
                subTotalOfInvoice: subTotalOfInvoice,
                totalMaintenance: totalMaintenance,
                totalRediagnostic: totalRediagnostic,
                totalShipping: totalShipping,
                totalDiscounts: totalDiscounts,
                totalQuote: totalQuote,
                halfDown: halfDown,
                balanceDue: balanceDue,
                workDescription: workDescription
            })
            .then(() => console.log("added ", generatedId))
    } catch (error) {
        yield put(addInvoiceFailure(error.message))
    }
}

export function* onAddNewInvoiceStart() {
    yield takeLatest(
        InvoiceActionTypes.ADD_INVOICES_START,
        addInvoiceAsync
    )
}

//sync
export function* syncInvoices() {
    const invoicesRef = firestore.collection("invoices")
    const channel = eventChannel((emit) => invoicesRef.onSnapshot(emit))
    try {
        while (true) {
            const snapshot = yield take(channel)
            const collectionsMap = yield call(
                convertCollectionsSnapshotToMap,
                snapshot
            )
            yield put(fetchInvoicesSuccess(collectionsMap))
        }
    } catch (error) {
        yield put(fetchInvoicesFailure(error.message))
    }
}

//update
export function* updateInvoiceAsync({
    payload: {
        client,
        isPreDefinedQuote,
        quoteDate,
        equipmentName,
        equipmentBrand,
        equipmentModel,
        equipmentSerial,
        partsList,
        laborHours,
        laborRate,
        maintenance,
        rediagnostic,
        selectedShipping,
        regularShippingTime,
        regularShippingRate,
        quickShippingTime,
        quickShippingRate,
        shippingNotes,
        selectedDiscount,
        disclaimerRed,
        invoiceNumberPrefix,
        userCreatedInvoiceNumber,
        totalPartsCost,
        totalPartsTax,
        totalLabor,
        totalPartsRetailCost,
        subTotalOfInvoice,
        totalMaintenance,
        totalRediagnostic,
        totalShipping,
        totalDiscounts,
        totalQuote,
        halfDown,
        balanceDue,
        workDescription,
        id,
    },
}) {
    try {
        const invoiceRef = firestore.collection("invoices")
        yield invoiceRef
            .doc(id)
            .update({
                client,
                isPreDefinedQuote,
                quoteDate,
                equipmentName,
                equipmentBrand,
                equipmentModel,
                equipmentSerial,
                partsList,
                laborHours,
                laborRate,
                maintenance,
                rediagnostic,
                selectedShipping,
                regularShippingTime,
                regularShippingRate,
                quickShippingTime,
                quickShippingRate,
                shippingNotes,
                selectedDiscount,
                disclaimerRed,
                invoiceNumberPrefix,
                userCreatedInvoiceNumber,
                totalPartsCost,
                totalPartsTax,
                totalLabor,
                totalPartsRetailCost,
                subTotalOfInvoice,
                totalMaintenance,
                totalRediagnostic,
                totalShipping,
                totalDiscounts,
                totalQuote,
                halfDown,
                balanceDue,
                workDescription
            })
            .then(() => console.log("Updated quote for ", equipmentName))
            yield put(updateInvoiceSuccess({
                client,
                isPreDefinedQuote,
                quoteDate,
                equipmentName,
                equipmentBrand,
                equipmentModel,
                equipmentSerial,
                partsList,
                laborHours,
                laborRate,
                maintenance,
                rediagnostic,
                selectedShipping,
                regularShippingTime,
                regularShippingRate,
                quickShippingTime,
                quickShippingRate,
                shippingNotes,
                selectedDiscount,
                disclaimerRed,
                invoiceNumberPrefix,
                userCreatedInvoiceNumber,
                totalPartsCost,
                totalPartsTax,
                totalLabor,
                totalPartsRetailCost,
                subTotalOfInvoice,
                totalMaintenance,
                totalRediagnostic,
                totalShipping,
                totalDiscounts,
                totalQuote,
                halfDown,
                balanceDue,
                workDescription
            }))
    } catch (error) {
        yield put(updateInvoiceFailure(error.message))
    }
}

export function* onUpdateInvoiceStart() {
    yield takeLatest(
        InvoiceActionTypes.UPDATE_INVOICES_START,
        updateInvoiceAsync
    )
}

//delete
export function* deleteInvoiceAsync({ payload: { id }}) {
    try {
        const invoicesRef = firestore.collection("invoices")
        yield invoicesRef
            .doc(id)
            .delete()
            .then(() => console.log("Deleted Invoice"))
            yield put(deleteInvoiceSuccess({ id }))
    } catch (error) {
        yield put(deleteInvoiceFailure(error.message))
    }
}

export function* onDeleteInvoiceStart() {
    yield takeLatest(
        InvoiceActionTypes.DELETE_INVOICES_START,
        deleteInvoiceAsync
    )
}

export function* invoiceSagas() {
    yield all([
        call(onAddNewInvoiceStart),
        call(syncInvoices),
        call(onUpdateInvoiceStart),
        call(onDeleteInvoiceStart),
    ])
}

