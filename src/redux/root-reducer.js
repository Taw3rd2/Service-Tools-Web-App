import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from "./user/user.reducer";
import clientsReducer from "./clients/clients.reducer";
import dispatchersReducer from "./dispatchers/dispatcher.reducer";
import workListReducer from "./workList/workList.reducer";
import paymentsReducer from "./payments/payment.reducer";
import techniciansReducer from "./technicians/technician.reducer";
import eventsReducer from "./events/event.reducer";
import labelsReducer from "./labels/label.reducer";
import inventoryContainersReducer from './inventoryContainers/inventoryContainers.reducer';
import partsCatalogReducer from './partsCatalog/partsCatalog.reducer'
import tabReducer from './tabs/tab.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['clients', 'events', 'partsCatalog', 'technicians']
}

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  dispatchers: dispatchersReducer,
  workList: workListReducer,
  payments: paymentsReducer,
  technicians: techniciansReducer,
  events: eventsReducer,
  labels: labelsReducer,
  inventoryContainers: inventoryContainersReducer,
  partsCatalog: partsCatalogReducer,
  tabs: tabReducer,
});

export default persistReducer(persistConfig, rootReducer)
