import { EventActionTypes } from "./event.types";

const INITIAL_STATE = {
  events: null,
  isFetching: false,
  errorMessage: undefined,
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventActionTypes.ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case EventActionTypes.FETCH_EVENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case EventActionTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.payload,
      };
    case EventActionTypes.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return {
              ...event,
              altPhoneName: action.payload.altPhoneName,
              altPhone: action.payload.altPhone,
              city: action.payload.city,
              dateCreated: action.payload.dateCreated,
              dateModified: action.payload.dateModified,
              dateScheduled: action.payload.dateScheduled,
              end: action.payload.end,
              firstname: action.payload.firstname,
              issue: action.payload.issue,
              jobNumber: action.payload.jobNumber,
              lastname: action.payload.lastname,
              leadSource: action.payload.leadSource,
              notes: action.payload.notes,
              payment: action.payload.payment,
              phone: action.payload.phone,
              phoneName: action.payload.phoneName,
              scheduledDate: action.payload.scheduledDate,
              shorthand: action.payload.shorthand,
              start: action.payload.start,
              status: action.payload.status,
              street: action.payload.street,
              takenBy: action.payload.takenBy,
              techHelper: action.payload.techHelper,
              techLead: action.payload.techLead,
              timeAlotted: action.payload.timeAlotted,
              timeOfDay: action.payload.timeOfDay,
              title: action.payload.title,
              invoiceId: action.payload.invoiceId
            };
          }
          return event;
        }),
      };
    case EventActionTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload.id),
      };
    case EventActionTypes.DELETE_TWO_EVENTS_SUCCESS:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload.techHelperId)
      }
    case EventActionTypes.ADD_EVENT_FAILURE:
    case EventActionTypes.FETCH_EVENTS_FAILURE:
    case EventActionTypes.UPDATE_EVENT_FAILURE:
    case EventActionTypes.DELETE_EVENT_FAILURE:
    case EventActionTypes.DELETE_TWO_EVENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
