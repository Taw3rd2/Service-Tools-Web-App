import { WorkListActionTypes } from "./workList.types";

//create
export const addWorkListItemStart = (workListItem) => ({
  type: WorkListActionTypes.ADD_WORK_LIST_ITEM_START,
  payload: workListItem,
});

export const addWorkListItemSuccess = (workListItem) => ({
  type: WorkListActionTypes.ADD_WORK_LIST_ITEM_SUCCESS,
  payload: workListItem,
});

export const addWorkListItemFailure = (errorMessage) => ({
  type: WorkListActionTypes.ADD_WORK_LIST_ITEM_FAILURE,
  payload: errorMessage,
});

//read
// export const fetchWorkListStart = () => ({
//   type: WorkListActionTypes.FETCH_WORK_LIST_START,
// });

export const fetchWorkListSuccess = (workListMap) => ({
  type: WorkListActionTypes.FETCH_WORK_LIST_SUCCESS,
  payload: workListMap,
});

export const fetchWorkListFailure = (errorMessage) => ({
  type: WorkListActionTypes.FETCH_WORK_LIST_FAILURE,
  payload: errorMessage,
});

//update
export const updateWorkListStart = (workListItem) => ({
  type: WorkListActionTypes.UPDATE_WORK_LIST_ITEM_START,
  payload: workListItem,
});

export const updateWorkListSuccess = (workListItem) => ({
  type: WorkListActionTypes.UPDATE_WORK_LIST_ITEM_SUCCESS,
  payload: workListItem,
});

export const updateWorkListFailure = (errorMessage) => ({
  type: WorkListActionTypes.UPDATE_WORK_LIST_ITEM_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteWorkListItemStart = (workListItem) => ({
  type: WorkListActionTypes.DELETE_WORK_LIST_ITEM_START,
  payload: workListItem,
});

export const deleteWorkListItemSuccess = (workListItem) => ({
  type: WorkListActionTypes.DELETE_WORK_LIST_ITEM_SUCCESS,
  payload: workListItem,
});

export const deleteWorkListItemFailure = (errorMessage) => ({
  type: WorkListActionTypes.DELETE_WORK_LIST_ITEM_FAILURE,
  payload: errorMessage,
});
