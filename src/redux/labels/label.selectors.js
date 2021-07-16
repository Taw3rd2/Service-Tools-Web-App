import { createSelector } from "reselect";

const selectLabels = (state) => state.labels;

export const selectLabelList = createSelector(
  [selectLabels],
  (labels) => labels
);

export const selectLabelsIsFetching = createSelector(
  [selectLabels],
  (labels) => labels.isFetching
);

export const selectIsLabelsLoaded = createSelector(
  [selectLabels],
  (labels) => !!labels.labels
);
