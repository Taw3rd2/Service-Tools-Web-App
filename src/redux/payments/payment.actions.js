import { PaymentActionTypes } from "./payment.types";

//create
export const addPaymentStart = (payment) => ({
  type: PaymentActionTypes.ADD_PAYMENT_START,
  payload: payment,
});

export const addPaymentSuccess = (payment) => ({
  type: PaymentActionTypes.ADD_PAYMENT_SUCCESS,
  payload: payment,
});

export const addPaymentFailure = (errorMessage) => ({
  type: PaymentActionTypes.ADD_PAYMENT_FAILURE,
  payload: errorMessage,
});

//sync
export const fetchPaymentsSuccess = (paymentsMap) => ({
  type: PaymentActionTypes.FETCH_PAYMENTS_SUCCESS,
  payload: paymentsMap,
});

export const fetchPaymentsFailure = (errorMessage) => ({
  type: PaymentActionTypes.FETCH_PAYMENTS_FAILURE,
  payload: errorMessage,
});

//update
export const updatePaymentStart = (payment) => ({
  type: PaymentActionTypes.UPDATE_PAYMENT_START,
  payload: payment,
});

export const updatePaymentSuccess = (payment) => ({
  type: PaymentActionTypes.UPDATE_PAYMENT_SUCCESS,
  payload: payment,
});

export const updatePaymentFailure = (errorMessage) => ({
  type: PaymentActionTypes.UPDATE_PAYMENT_FAILURE,
  payload: errorMessage,
});

//delete
export const deletePaymentStart = (payment) => ({
  type: PaymentActionTypes.DELETE_PAYMENT_START,
  payload: payment,
});

export const deletePaymentSuccess = (payment) => ({
  type: PaymentActionTypes.DELETE_PAYMENT_SUCCESS,
  payload: payment,
});

export const deletePaymentFailure = (errorMessage) => ({
  type: PaymentActionTypes.DELETE_PAYMENT_FAILURE,
  payload: errorMessage,
});
