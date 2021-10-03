import { DispatcherActionTypes } from "./dispatcher.types";

const INITIAL_STATE = {
  dispatchers: null,
  isFetching: false,
  errorMessage: undefined,
};

const dispatchersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DispatcherActionTypes.ADD_DISPATCHER_SUCCESS:
      return {
        ...state,
        dispatchers: [...state.dispatchers, action.payload],
      };
    case DispatcherActionTypes.FETCH_DISPATCHERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case DispatcherActionTypes.FETCH_DISPATCHERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dispatchers: action.payload,
      };
    case DispatcherActionTypes.UPDATE_DISPATCHER_SUCCESS:
      return {
        ...state,
        dispatchers: state.dispatchers.map((dispatcher) => {
          if (dispatcher.id === action.payload.id) {
            return { ...dispatcher, name: action.payload.name };
          }
          return dispatcher;
        }),
      };
    case DispatcherActionTypes.DELETE_DISPATCHER_SUCCESS:
      return {
        ...state,
        dispatchers: state.dispatchers.filter(
          (dispatcher) => dispatcher.id !== action.payload.id
        ),
      };
    case DispatcherActionTypes.ADD_DISPATCHER_FAILURE:
    case DispatcherActionTypes.FETCH_DISPATCHERS_FAILURE:
    case DispatcherActionTypes.UPDATE_DISPATCHER_FAILURE:
    case DispatcherActionTypes.DELETE_DISPATCHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default dispatchersReducer;
