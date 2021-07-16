import { InventoryContainersActionTypes } from "./inventoryContainers.types";

//create
export const addInventoryContainerStart = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_START,
    payload: inventoryContainer,
})

export const addInventoryContainerSuccess = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_SUCCESS,
    payload:inventoryContainer,
})

export const addInventoryContainerFailure = (errorMessage) => ({
    type: InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_FAILURE,
    payload: errorMessage,
})

//sync
export const fetchInventoryContainersSuccess = (inventoryContainersMap) => ({
    type: InventoryContainersActionTypes.FETCH_INVENTORY_CONTAINERS_SUCCESS,
    payload: inventoryContainersMap,
})

export const fetchInventoryContainersFailure = (errorMessage) => ({
    type: InventoryContainersActionTypes.FETCH_INVENTORY_CONTAINERS_FAILURE,
    payload: errorMessage,
})

//update
export const updateInventoryContainerStart = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_START,
    payload: inventoryContainer,
})

export const updateInventoryContainerSuccess = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_SUCCESS,
    payload: inventoryContainer,
})

export const updateInventoryContainerFailure = (errorMessage) => ({
    type: InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_FAILURE,
    payload: errorMessage,
})

//delete
export const deleteInventoryContainerStart = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_START,
    payload: inventoryContainer,
})

export const deleteInventoryContainerSuccess = (inventoryContainer) => ({
    type: InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_SUCCESS,
    payload: inventoryContainer,
})

export const deleteInventoryContainerFailure = (errorMessage) => ({
    type: InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_FAILURE,
    payload: errorMessage,
})