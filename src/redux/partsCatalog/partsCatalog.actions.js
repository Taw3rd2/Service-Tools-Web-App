import { PartsCatalogActionTypes } from './partsCatalog.types'

//create
export const addPartsCatalogStart = (parts) => ({
    type: PartsCatalogActionTypes.ADD_PARTS_CATALOG_START,
    payload: parts,
})

export const addPartsCatalogSuccess = (parts) => ({
    type: PartsCatalogActionTypes.ADD_PARTS_CATALOG_SUCCESS,
    payload: parts,
})

export const addPartsCatalogFailure = (errorMessage) => ({
    type: PartsCatalogActionTypes.ADD_PARTS_CATALOG_FAILURE,
    payload: errorMessage,
})

//sync
export const fetchPartsCatalogSuccess = (partsMap) => ({
    type: PartsCatalogActionTypes.FETCH_PARTS_CATALOG_SUCCESS,
    payload: partsMap,
})

export const fetchPartsCatalogFailure = (errorMessage) => ({
    type: PartsCatalogActionTypes.FETCH_PARTS_CATALOG_FAILURE,
    payload: errorMessage,
})

//update
export const updatePartsCatalogStart = (parts) => ({
    type: PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_START,
    payload: parts,
})

export const updatePartsCatalogSuccess = (parts) => ({
    type: PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_SUCCESS,
    payload: parts,
})

export const updatePartsCatalogFailure = (errorMessage) => ({
    type: PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_FAILURE,
    payload: errorMessage,
})

//delete
export const deletePartsCatalogStart = (parts) => ({
    type: PartsCatalogActionTypes.DELETE_PARTS_CATALOG_START,
    payload: parts,
})

export const deletePartsCatalogSuccess = (parts) => ({
    type: PartsCatalogActionTypes.DELETE_PARTS_CATALOG_SUCCESS,
    payload: parts,
})

export const deletePartsCatalogFailure = (errorMessage) => ({
    type: PartsCatalogActionTypes.DELETE_PARTS_CATALOG_FAILURE,
    payload: errorMessage,
})