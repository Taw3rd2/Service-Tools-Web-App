import { createSelector } from "reselect";

const selectIssues = (state) => state.workList;

export const selectWorkList = createSelector(
  [selectIssues],
  (workList) => workList
);

export const selectIsWorkListFetching = createSelector(
  [selectIssues],
  (workList) => workList.isFetching
);

export const selectIsWorkListLoaded = createSelector(
  [selectIssues],
  (workList) => !!workList.workList
);
