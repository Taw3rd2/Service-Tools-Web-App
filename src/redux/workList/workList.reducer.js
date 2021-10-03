import { WorkListActionTypes } from "./workList.types";

const INITIAL_STATE = {
  workList: null,
  isFetching: false,
  errorMessage: undefined,
};

const workListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WorkListActionTypes.ADD_WORK_LIST_ITEM_SUCCESS:
      return {
        ...state,
        workList: [...state.workList, action.payload],
      };
    case WorkListActionTypes.FETCH_WORK_LIST_START:
      return {
        ...state,
        isFetching: true,
      };
    case WorkListActionTypes.FETCH_WORK_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        workList: action.payload,
      };
    case WorkListActionTypes.UPDATE_WORK_LIST_ITEM_SUCCESS:
      return {
        ...state,
        workList: state.workList.map((listItem) => {
          if (listItem.id === action.payload.id) {
            return {
              ...listItem,
              item: action.payload.item,
              shorthand: action.payload.shorthand,
            };
          }
          return listItem;
        }),
      };
    case WorkListActionTypes.DELETE_WORK_LIST_ITEM_SUCCESS:
      return {
        ...state,
        workList: state.workList.filter(
          (workList) => workList.id !== action.payload.id
        ),
      };
    case WorkListActionTypes.ADD_WORK_LIST_ITEM_FAILURE:
    case WorkListActionTypes.FETCH_WORK_LIST_FAILURE:
    case WorkListActionTypes.UPDATE_WORK_LIST_ITEM_FAILURE:
    case WorkListActionTypes.DELETE_WORK_LIST_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default workListReducer;
