import { InventoryContainersActionTypes} from './inventoryContainers.types'

const INITIAL_STATE = {
    inventoryContainers: null,
    isFetching: false,
    errorMessage: undefined,
}

const inventoryContainersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_SUCCESS:
            return {
                ...state,
                inventoryContainers: [...state.inventoryContainers, action.payload],
            }
        case InventoryContainersActionTypes.FETCH_INVENTORY_CONTAINERS_START:
            return {
                ...state,
                isFetching: true,
            }
        case InventoryContainersActionTypes.FETCH_INVENTORY_CONTAINERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                inventoryContainers: action.payload,
            }
        case InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_SUCCESS:
            return {
                ...state,
                inventoryContainers: state.inventoryContainers.map((container) => {
                    if (container.id === action.payload.id) {
                        return {
                            ...container,
                            containerName: action.payload.containerName,
                            partsList: action.payload.partsList,
                            partsNeeded: action.payload.partsNeeded,
                        }
                    }
                    return container;
                }),
            }
        case InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_SUCCESS:
            return {
                ...state,
                inventoryContainers: state.inventoryContainers.filter((container) => container.id !== action.payload.id),
            }
        case InventoryContainersActionTypes.ADD_INVENTORY_CONTAINERS_FAILURE:
        case InventoryContainersActionTypes.FETCH_INVENTORY_CONTAINERS_FAILURE:
        case InventoryContainersActionTypes.UPDATE_INVENTORY_CONTAINERS_FAILURE:
        case InventoryContainersActionTypes.DELETE_INVENTORY_CONTAINERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export default inventoryContainersReducer;