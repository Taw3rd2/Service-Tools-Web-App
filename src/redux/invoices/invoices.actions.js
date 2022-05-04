import { InvoiceActionTypes } from './invoices.types'

//create
export const addInvoiceStart = (invoice) => ({
    type: InvoiceActionTypes.ADD_INVOICES_START,
    payload: invoice,
})

export const addInvoiceSuccess = (invoice) => ({
    type: InvoiceActionTypes.ADD_INVOICES_SUCCESS,
    payload: invoice,
})

export const addInvoiceFailure = (errorMessage) => ({
    type: InvoiceActionTypes.ADD_INVOICES_FAILURE,
    payload: errorMessage,
})

//sync (read)
export const fetchInvoicesSuccess = (invoicesMap) => ({
    type: InvoiceActionTypes.FETCH_INVOICES_SUCCESS,
    payload: invoicesMap,
})

export const fetchInvoicesFailure = (errorMessage) => ({
    type: InvoiceActionTypes.FETCH_INVOICES_FAILURE,
    payload: errorMessage,
})

//update
export const updateInvoiceStart = (invoice) => ({
    type: InvoiceActionTypes.UPDATE_INVOICES_START,
    payload: invoice,
})

export const updateInvoiceSuccess = (invoice) => ({
    type: InvoiceActionTypes.UPDATE_INVOICES_SUCCESS,
    payload: invoice,
})

export const updateInvoiceFailure = (errorMessage) => ({
    type: InvoiceActionTypes.UPDATE_INVOICES_FAILURE,
    payload: errorMessage,
})

//delete
export const deleteInvoiceStart = (invoice) => ({
    type: InvoiceActionTypes.DELETE_INVOICES_START,
    payload: invoice,
})

export const deleteInvoiceSuccess = (invoice) => ({
    type: InvoiceActionTypes.DELETE_INVOICES_SUCCESS,
    payload: invoice,
})

export const deleteInvoiceFailure = (errorMessage) => ({
    type: InvoiceActionTypes.DELETE_INVOICES_FAILURE,
    payload: errorMessage,
})
