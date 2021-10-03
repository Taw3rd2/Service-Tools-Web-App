import { LabelActionTypes } from "./label.types";

const INITIAL_STATE = {
  labels: null,
  isFetching: false,
  errorMessage: undefined,
};

const labelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelActionTypes.ADD_LABEL_SUCCESS:
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    case LabelActionTypes.FETCH_LABEL_START:
      return {
        ...state,
        isFetching: true,
      };
    case LabelActionTypes.FETCH_LABEL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        labels: action.payload,
      };
    case LabelActionTypes.UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        labels: state.labels.map((label) => {
          if (label.id === action.payload.id) {
            return {
              ...label,
              labelDate: action.payload.labelDate,
              locationName: action.payload.locationName,
              tech: action.payload.tech,
            };
          }
          return label;
        }),
      };
    case LabelActionTypes.DELETE_LABEL_SUCCESS:
      return {
        ...state,
        lables: state.labels.filter((label) => label.id !== action.payload.id),
      };
    case LabelActionTypes.ADD_LABEL_FAILURE:
    case LabelActionTypes.FETCH_LABEL_FAILURE:
    case LabelActionTypes.UPDATE_LABEL_FAILURE:
    case LabelActionTypes.DELETE_LABEL_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default labelsReducer;
