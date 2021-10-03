import { ClientsActionTypes } from "./clients.types";

// export const fetchClientsStart = () => ({
//   type: ClientsActionTypes.FETCH_CLIENTS_START,
// });

//create
export const addClientStart = (client) => ({
  type: ClientsActionTypes.ADD_CLIENT_START,
  payload: client,
});

export const addClientSuccess = (client) => ({
  type: ClientsActionTypes.ADD_CLIENT_SUCCESS,
  payload: client,
});

export const addClientFailure = (errorMessage) => ({
  type: ClientsActionTypes.ADD_CLIENT_FAILURE,
  payload: errorMessage,
});

//sync
export const fetchClientsSuccess = (clientsMap) => ({
  type: ClientsActionTypes.FETCH_CLIENTS_SUCCESS,
  payload: clientsMap,
});

export const fetchClientsFailure = (errorMessage) => ({
  type: ClientsActionTypes.FETCH_CLIENTS_FAILURE,
  payload: errorMessage,
});

//update
export const updateClientStart = (client) => ({
  type: ClientsActionTypes.UPDATE_CLIENT_START,
  payload: client,
});

export const updateClientSuccess = (client) => ({
  type: ClientsActionTypes.UPDATE_CLIENT_SUCCESS,
  payload: client,
});

export const updateClientFailure = (errorMessage) => ({
  type: ClientsActionTypes.UPDATE_CLIENT_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteClientStart = (client) => ({
  type: ClientsActionTypes.DELETE_CLIENT_START,
  payload: client,
});

export const deleteClientSuccess = (client) => ({
  type: ClientsActionTypes.DELETE_CLIENT_SUCCESS,
  payload: client,
});

export const deleteClientFailure = (errorMessage) => ({
  type: ClientsActionTypes.DELETE_CLIENT_FAILURE,
  payload: errorMessage,
});
