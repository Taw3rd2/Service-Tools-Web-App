import { createSelector } from "reselect";

const selectDispatchers = (state) => state.dispatchers;

export const selectDispatchersList = createSelector(
  [selectDispatchers],
  (dispatchers) => dispatchers
);

export const selectIsDispatcherFetching = createSelector(
  [selectDispatchers],
  (dispatcher) => dispatcher.isFetching
);

export const selectIsDispatcherLoaded = createSelector(
  [selectDispatchers],
  (dispatchers) => !!dispatchers.dispatchers
);
