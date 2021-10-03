import { createSelector } from "reselect";

const selectPayments = (state) => state.payments;

export const selectPaymentList = createSelector(
  [selectPayments],
  (payments) => payments
);

export const selectIsPaymentsFetching = createSelector(
  [selectPayments],
  (payments) => payments.isFetching
);

export const selectIsPaymentsLoaded = createSelector(
  [selectPayments],
  (payments) => !!payments.payments
);
