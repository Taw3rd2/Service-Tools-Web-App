import { LabelActionTypes } from "./label.types";

//create
export const addLabelStart = (label) => ({
  type: LabelActionTypes.ADD_LABEL_START,
  payload: label,
});

export const addLabelSuccess = (label) => ({
  type: LabelActionTypes.ADD_LABEL_SUCCESS,
  payload: label,
});

export const addLabelFailure = (errorMessage) => ({
  type: LabelActionTypes.ADD_LABEL_FAILURE,
  payload: errorMessage,
});

//sync
export const fetchLabelsSuccess = (labelsMap) => ({
  type: LabelActionTypes.FETCH_LABEL_SUCCESS,
  payload: labelsMap,
});

export const fetchLabelsFailure = (errorMessage) => ({
  type: LabelActionTypes.FETCH_LABEL_FAILURE,
  payload: errorMessage,
});

//update
export const updateLabelStart = (label) => ({
  type: LabelActionTypes.UPDATE_LABEL_START,
  payload: label,
});

export const updateLabelSuccess = (label) => ({
  type: LabelActionTypes.UPDATE_LABEL_SUCCESS,
  payload: label,
});

export const updateLabelFailure = (errorMessage) => ({
  type: LabelActionTypes.UPDATE_LABEL_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteLabelStart = (label) => ({
  type: LabelActionTypes.DELETE_LABEL_START,
  payload: label,
});

export const deleteLabelSuccess = (label) => ({
  type: LabelActionTypes.DELETE_LABEL_SUCCESS,
  payload: label,
});

export const deleteLabelFailure = (errorMessage) => ({
  type: LabelActionTypes.DELETE_LABEL_FAILURE,
  payload: errorMessage,
});
