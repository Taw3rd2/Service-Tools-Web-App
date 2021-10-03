import { createSelector } from "reselect";

const selectPartsCatalog = (state) => state.partsCatalog;

export const selectPartsCatalogList = createSelector(
    [selectPartsCatalog],
    (partsCatalog) => partsCatalog
)

export const selectIsPartsCatalogFetching = createSelector(
    [selectPartsCatalog],
    (partsCatalog) => partsCatalog.isFetching
)

export const selectIsPartsCatalogLoaded = createSelector(
    [selectPartsCatalog],
    (partsCatalog) => !!partsCatalog.partsCatalog
)