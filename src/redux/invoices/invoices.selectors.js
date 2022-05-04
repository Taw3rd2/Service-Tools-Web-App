import { createSelector } from 'reselect'

const selectInvoices = (state) => state.invoices;

export const selectInvoicesList = createSelector(
    [selectInvoices],
    (invoices) => invoices
)

export const selectIsInvoicesFetching = createSelector(
    [selectInvoices],
    (invoices) => invoices.isFetching
)

export const selectIsInvoicesLoaded = createSelector(
    [selectInvoices],
    (invoices) => !!invoices.invoices
)