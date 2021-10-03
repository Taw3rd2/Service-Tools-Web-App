import { TechnicianActionTypes } from "./technician.types";

const INITIAL_STATE = {
  technicians: null,
  isFetching: false,
  errorMessage: undefined,
};

const techniciansReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TechnicianActionTypes.ADD_TECHNICIAN_START:
      return {
        ...state,
        isFetching: true,
      };
    case TechnicianActionTypes.ADD_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        technicians: [...state.technicians, action.payload],
      };
    case TechnicianActionTypes.FETCH_TECHNICIANS_START:
      return {
        ...state,
        isFetching: true,
      };
    case TechnicianActionTypes.FETCH_TECHNICIANS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        technicians: action.payload,
      };
    case TechnicianActionTypes.UPDATE_TECHNICIAN_START:
      return {
        ...state,
        isFetching: true,
      };
    case TechnicianActionTypes.UPDATE_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        technicians: state.technicians.map((technician) => {
          if (technician.id === action.payload.id) {
            return {
              ...technician,
              color: action.payload.color,
              email: action.payload.email,
              name: action.payload.name,
            };
          }
          return technician;
        }),
      };
    case TechnicianActionTypes.DELETE_TECHNICIAN_SUCCESS:
      return {
        ...state,
        technicians: state.technicians.filter(
          (technician) => technician.id !== action.payload.id
        ),
      };
    case TechnicianActionTypes.ADD_TECHNICIAN_FAILURE:
    case TechnicianActionTypes.FETCH_TECHNICIANS_FAILURE:
    case TechnicianActionTypes.UPDATE_TECHNICIAN_FAILURE:
    case TechnicianActionTypes.DELETE_TECHNICIAN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default techniciansReducer;
