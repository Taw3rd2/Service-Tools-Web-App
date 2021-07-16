import { DispatcherActionTypes } from "./dispatcher.types";

//create
export const addDispatcherStart = (dispatcher) => ({
  type: DispatcherActionTypes.ADD_DISPATCHER_START,
  payload: dispatcher,
});

export const addDispatcherSuccess = (dispatcher) => ({
  type: DispatcherActionTypes.ADD_DISPATCHER_SUCCESS,
  payload: dispatcher,
});

export const addDispatcherFailure = (errorMessage) => ({
  type: DispatcherActionTypes.ADD_DISPATCHER_FAILURE,
  payload: errorMessage,
});

//read
// export const fetchDispatchersStart = () => ({
//   type: DispatcherActionTypes.FETCH_DISPATCHERS_START,
// });

export const fetchDispatchersSuccess = (dispatchersMap) => ({
  type: DispatcherActionTypes.FETCH_DISPATCHERS_SUCCESS,
  payload: dispatchersMap,
});

export const fetchDispatchersFailure = (errorMessage) => ({
  type: DispatcherActionTypes.FETCH_DISPATCHERS_FAILURE,
  payload: errorMessage,
});

//update
export const updateDispatcherStart = (dispatcher) => ({
  type: DispatcherActionTypes.UPDATE_DISPATCHER_START,
  payload: dispatcher,
});

export const updateDispatcherSuccess = (dispatcher) => ({
  type: DispatcherActionTypes.UPDATE_DISPATCHER_SUCCESS,
  payload: dispatcher,
});

export const updateDispatcherFailure = (errorMessage) => ({
  type: DispatcherActionTypes.UPDATE_DISPATCHER_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteDispatcherStart = (dispatcher) => ({
  type: DispatcherActionTypes.DELETE_DISPATCHER_START,
  payload: dispatcher,
});

export const deleteDispatcherSuccess = (dispatcher) => ({
  type: DispatcherActionTypes.DELETE_DISPATCHER_SUCCESS,
  payload: dispatcher,
});

export const deleteDispatcherFailure = (errorMessage) => ({
  type: DispatcherActionTypes.DELETE_DISPATCHER_FAILURE,
  payload: errorMessage,
});
