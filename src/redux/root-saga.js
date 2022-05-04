import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";

import { clientSagas } from "./clients/clients.sagas";
import { dispatcherSagas } from "./dispatchers/dispatcher.sagas";
import { workListSagas } from "./workList/workList.sagas";
import { paymentSagas } from "./payments/payment.sagas";
import { technicianSagas } from "./technicians/technician.sagas";
import { eventSagas } from "./events/event.sagas";
import { labelSagas } from "./labels/label.sagas";
import { inventoryContainersSagas } from "./inventoryContainers/inventoryContainers.sagas";
import { partsCatalogSagas } from './partsCatalog/partsCatalog.sagas'
import { tabSagas } from './tabs/tab.sagas';
import { invoiceSagas } from './invoices/invoices.sagas'

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(clientSagas),
    call(dispatcherSagas),
    call(workListSagas),
    call(paymentSagas),
    call(technicianSagas),
    call(eventSagas),
    call(labelSagas),
    call(inventoryContainersSagas),
    call(partsCatalogSagas),
    call(tabSagas),
    call(invoiceSagas),
  ]);
}