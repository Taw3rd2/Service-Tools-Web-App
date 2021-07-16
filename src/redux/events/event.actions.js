import { EventActionTypes } from "./event.types";

//create
export const addEventStart = (event) => ({
  type: EventActionTypes.ADD_EVENT_START,
  payload: event,
});

export const addEventSuccess = (event) => ({
  type: EventActionTypes.ADD_EVENT_SUCCESS,
  payload: event,
});

export const addEventFailure = (errorMessage) => ({
  type: EventActionTypes.ADD_EVENT_FAILURE,
  payload: errorMessage,
});

//sync
export const fetchEventsSuccess = (eventsMap) => ({
  type: EventActionTypes.FETCH_EVENTS_SUCCESS,
  payload: eventsMap,
});

export const fetchEventsFailure = (errorMessage) => ({
  type: EventActionTypes.FETCH_EVENTS_FAILURE,
  payload: errorMessage,
});

//update
export const updateEventStart = (event) => ({
  type: EventActionTypes.UPDATE_EVENT_START,
  payload: event,
});

export const updateEventSuccess = (event) => ({
  type: EventActionTypes.UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFailure = (errorMessage) => ({
  type: EventActionTypes.UPDATE_EVENT_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteEventStart = (event) => ({
  type: EventActionTypes.DELETE_EVENT_START,
  payload: event,
});

export const deleteEventSuccess = (event) => ({
  type: EventActionTypes.DELETE_EVENT_SUCCESS,
  payload: event,
});

export const deleteEventFailure = (errorMessage) => ({
  type: EventActionTypes.DELETE_EVENT_FAILURE,
  payload: errorMessage,
});

//delete two
export const deleteTwoEventsStart = (event) => ({
  type: EventActionTypes.DELETE_TWO_EVENTS_START,
  payload: event,
})

export const deleteTwoEventsSuccess = (event) => ({
  type: EventActionTypes.DELETE_TWO_EVENTS_SUCCESS,
  payload: event,
})

export const deleteTwoEventsFailure = (errorMessage) => ({
  type: EventActionTypes.DELETE_TWO_EVENTS_FAILURE,
  payload: errorMessage,
})
