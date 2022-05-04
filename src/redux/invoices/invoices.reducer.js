import { InvoiceActionTypes } from './invoices.types'

const INITIAL_STATE = {
    invoices: null,
    isFetching: false,
    errorMessage: undefined,
}

const invoicesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InvoiceActionTypes.ADD_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices, action.payload],
            }
        case InvoiceActionTypes.FETCH_INVOICES_START:
            return {
                ...state,
                isFetching: true,
            }
        case InvoiceActionTypes.FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                invoices: action.payload,
            }
        case InvoiceActionTypes.UPDATE_INVOICES_START:
            return {
                ...state,
                isFetching: true,
            }
        case InvoiceActionTypes.UPDATE_INVOICES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                invoices: state.invoices.map((invoice) => {
                    if (invoice.id === action.payload.id) {
                        return { 
                            ...invoice, 
                            client: action.payload.client,
                            isPreDefinedQuote: action.payload.isPreDefinedQuote,
                            quoteDate: action.payload.quoteDate,
                            equipmentName: action.payload.equipmentName,
                            equipmentBrand: action.payload.equipmentBrand,
                            equipmentModel: action.payload.equipmentModel,
                            equipmentSerial: action.payload.equipmentSerial,
                            partsList: action.payload.partsList,
                            laborHours: action.payload.laborHours,
                            laborRate: action.payload.laborRate,
                            maintenance: action.payload.maintenance,
                            rediagnostic: action.payload.rediagnostic,
                            selectedShipping: action.payload.selectedShipping,
                            regularShippingTime: action.payload.regularShippingTime,
                            regularShippingRate: action.payload.regularShippingRate,
                            quickShippingTime: action.payload.quickShippingTime,
                            quickShippingRate: action.payload.quickShippingRate,
                            shippingNotes: action.payload.shippingNotes,
                            selectedDiscount: action.payload.shippingNotes,
                            disclaimerRed: action.payload.disclaimerRed,
                            invoiceNumberPrefix: action.payload.invoiceNumberPrefix,
                            userCreatedInvoiceNumber: action.payload.userCreatedInvoiceNumber,
                            totalPartsCost: action.payload.totalPartsCost,
                            totalPartsTax: action.payload.totalPartsTax,
                            totalLabor: action.payload.totalLabor,
                            totalPartsRetailCost: action.payload.totalPartsRetailCost,
                            subTotalOfInvoice: action.payload.subTotalOfInvoice,
                            totalMaintenance: action.payload.totalMaintenance,
                            totalRediagnostic: action.payload.totalRedagnostic,
                            totalShipping: action.payload.totalShipping,
                            totalDiscounts: action.payload.totalDiscounts,
                            totalQuote: action.payload.totalQuote,
                            halfDown: action.payload.halfDown,
                            balanceDue: action.payload.balanceDue,
                            workDescription: action.payload.workDescription
                        }
                    }
                    return invoice;
                })
            }
            case InvoiceActionTypes.DELETE_INVOICES_SUCCESS:
                return {
                    ...state,
                    invoices: state.invoices.filter(
                        (invoice) => invoice.id !== action.payload.id
                    ),
                };
            case InvoiceActionTypes.ADD_INVOICES_FAILURE:
            case InvoiceActionTypes.FETCH_INVOICES_FAILURE:
            case InvoiceActionTypes.UPDATE_INVOICES_FAILURE:
            case InvoiceActionTypes.DELETE_INVOICES_FAILURE:
                return {
                    ...state,
                    isFetching: false,
                    errorMessage: action.payload
                }
            default:
                return state;
    }
}

export default invoicesReducer