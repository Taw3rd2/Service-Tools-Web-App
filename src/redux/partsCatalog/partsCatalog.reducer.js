import { PartsCatalogActionTypes } from './partsCatalog.types'

const INITIAL_STATE = {
    partsCatalog: null,
    isFetching: false,
    errorMessage: undefined,
}

const partsCatalogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PartsCatalogActionTypes.ADD_PARTS_CATALOG_SUCCESS:
            return {
                ...state,
                partsCatalog: [...state.partsCatalog, action.payload],
            }
        case PartsCatalogActionTypes.FETCH_PARTS_CATALOG_START:
            return {
                ...state,
                isFetching: true,
            }
        case PartsCatalogActionTypes.FETCH_PARTS_CATALOG_SUCCESS:
            return {
                ...state,
                isFetching: false,
                partsCatalog: action.payload,
            }
        case PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_SUCCESS:
            return {
                ...state,
                partsCatalog: state.partsCatalog.map((part) => {
                    if (part.id === action.payload.id) {
                        return {
                            ...part,
                            category: action.payload.category,
                            crossReference: action.payload.crossReference,
                            installVanQuantity: action.payload.installVanQuantity,
                            isInstallInventory: action.payload.isInstallInventory,
                            isMaintenanceInventory: action.payload.isMaintenanceInventory,
                            isServiceInventory: action.payload.isServiceInventory,
                            isStockRoomInventory: action.payload.isStockRoomInventory,
                            maintenanceVanQuantity: action.payload.maintenanceVanQuantity,
                            partCost: action.payload.partCost,
                            partDataDate: action.payload.partDataDate,
                            partDataServicer: action.payload.partDataServicer,
                            partDescription: action.payload.partDescription,
                            partLabor: action.payload.partLabor,
                            partNotes: action.payload.partNotes,
                            partNumber: action.payload.partNumber,
                            partVendor: action.payload.partVendor,
                            serviceVanQuantity: action.payload.serviceVanQuantity,
                            stockRoomQuantity: action.payload.stockRoomQuantity,
                            url: action.payload.url,
                        }
                    }
                    return part;
                }),
            }
        case PartsCatalogActionTypes.DELETE_PARTS_CATALOG_SUCCESS:
            return {
                ...state,
                partsCatalog: state.partsCatalog.filter((part) => part.id !== action.payload.id),
            }
        case PartsCatalogActionTypes.ADD_PARTS_CATALOG_FAILURE:
        case PartsCatalogActionTypes.FETCH_PARTS_CATALOG_FAILURE:
        case PartsCatalogActionTypes.UPDATE_PARTS_CATALOG_FAILURE:
        case PartsCatalogActionTypes.DELETE_PARTS_CATALOG_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export default partsCatalogReducer;