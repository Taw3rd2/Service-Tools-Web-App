import { createSelector } from "reselect";

const selectInventoryContainers = (state) => state.inventoryContainers;

export const selectInventoryContainersList = createSelector(
    [selectInventoryContainers],
    (inventoryContainers) => inventoryContainers
)

export const selectIsContainerFetching = createSelector(
    [selectInventoryContainers],
    (container) => container.isFetching
)

export const selectIsContainerLoaded = createSelector(
    [selectInventoryContainers],
    (containers) => !!containers.containers
)