import { TabActionTypes } from './tab.types'

//create
export const addTabStart = (tab) => ({
    type: TabActionTypes.ADD_TAB_START,
    payload: tab,
});

export const addTabSuccess = (tab) => ({
    type: TabActionTypes.ADD_TAB_SUCCESS,
    payload: tab,
})

export const addTabFailure = (errorMessage) => ({
    type: TabActionTypes.ADD_TAB_FAILURE,
    payload: errorMessage,
})

//read
export const fetchTabsSuccess = (tabsMap) => ({
    type: TabActionTypes.FETCH_TABS_SUCCESS,
    payload: tabsMap,
})

export const fetchTabsFailure = (errorMessage) => ({
    type: TabActionTypes.FETCH_TABS_FAILURE,
    payload: errorMessage,
})

//update
export const updateTabStart = (tab) => ({
    type: TabActionTypes.UPDATE_TAB_START,
    payload: tab,
})

export const updateTabSuccess = (tab) => ({
    type: TabActionTypes.UPDATE_TAB_SUCCESS,
    payload: tab,
})

export const updateTabFailure = (errorMessage) => ({
    type: TabActionTypes.UPDATE_TAB_FAILURE,
    payload: errorMessage,
})

//delete
export const deleteTabStart = (tab) => ({
    type: TabActionTypes.DELETE_TAB_START,
    payload: tab,
})

export const deleteTabSuccess = (tab) => ({
    type: TabActionTypes.DELETE_TAB_SUCCESS,
    payload: tab,
})

export const deleteTabFailure = (errorMessage) => ({
    type: TabActionTypes.DELETE_TAB_FAILURE,
    payload: errorMessage,
})