import { createSelector } from "reselect";

const selectEvents = (state) => state.events;

export const selectEventsList = createSelector(
  [selectEvents],
  (events) => events
);

export const selectIsEventFetching = createSelector(
  [selectEvents],
  (event) => event.isFetching
);

export const selectIsEventLoaded = createSelector(
  [selectEvents],
  (events) => !!events.events
);
