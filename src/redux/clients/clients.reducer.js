import { ClientsActionTypes } from "./clients.types";

const INITIAL_STATE = {
  clients: null,
  isFetching: false,
  errorMessage: undefined,
};

const clientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClientsActionTypes.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case ClientsActionTypes.FETCH_CLIENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ClientsActionTypes.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        clients: action.payload,
      };
    case ClientsActionTypes.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload.id) {
            return { ...client, lastname: action.payload.lastname };
          }
          return client;
        }),
      };
    case ClientsActionTypes.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.id !== action.payload.id
        ),
      };
    case ClientsActionTypes.ADD_CLIENT_FAILURE:
    case ClientsActionTypes.FETCH_CLIENTS_FAILURE:
    case ClientsActionTypes.UPDATE_CLIENT_FAILURE:
    case ClientsActionTypes.DELETE_CLIENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default clientsReducer;
