import { TabActionTypes } from './tab.types'

const INITIAL_STATE = {
    tabs: null,
    isFetching: false,
    errorMessage: undefined,
}

const tabsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TabActionTypes.ADD_TAB_SUCCESS:
            return {
                ...state,
                tabs: [...state.tabs, action.payload],
            }
        case TabActionTypes.FETCH_TABS_START:
            return {
                ...state,
                isFetching: true,
            }
        case TabActionTypes.FETCH_TABS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tabs: action.payload,
            }
        case TabActionTypes.UPDATE_TAB_SUCCESS:
            return {
                ...state,
                tabs: state.tabs.map((tab) => {
                    if (tab.id === action.payload.id) {
                        return { ...tab, name: action.payload.name };
                    }
                    return tab;
                })
            }
        case TabActionTypes.DELETE_TAB_SUCCESS:
            return {
                ...state,
                tabs: state.tabs.filter(
                    (tab) => tab.id !== action.payload.id
                ),
            }
        case TabActionTypes.ADD_TAB_FAILURE:
        case TabActionTypes.FETCH_TABS_FAILURE:
        case TabActionTypes.UPDATE_TAB_FAILURE:
        case TabActionTypes.DELETE_TAB_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export default tabsReducer;