import { createSelector } from "reselect";

const selectTabs = (state) => state.tabs;

export const selectTabsList = createSelector(
    [selectTabs],
    (tabs) => tabs
);

export const selectIsTabFetching = createSelector(
    [selectTabs],
    (tabs) => tabs.isFetching
);

export const selectIsTabsLoaded = createSelector(
    [selectTabs],
    (tabs) => !!tabs.tabs
);