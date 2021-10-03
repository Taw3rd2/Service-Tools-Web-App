import { PaymentActionTypes } from "./payment.types";

const INITIAL_STATE = {
  payments: null,
  isFetching: false,
  errorMessage: undefined,
};

const paymentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaymentActionTypes.ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    case PaymentActionTypes.FETCH_PAYMENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PaymentActionTypes.FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        payments: action.payload,
      };
    case PaymentActionTypes.UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.map((payment) => {
          if (payment.id === action.payload.id) {
            return { ...payment, item: action.payload.item };
          }
          return payment;
        }),
      };
    case PaymentActionTypes.DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.filter(
          (payment) => payment.id !== action.payload.id
        ),
      };
    case PaymentActionTypes.ADD_PAYMENT_FAILURE:
    case PaymentActionTypes.FETCH_PAYMENTS_FAILURE:
    case PaymentActionTypes.DELETE_PAYMENT_FAILURE:
    case PaymentActionTypes.UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default paymentsReducer;
