import React, { useState } from "react";
import { connect } from "react-redux";

//test
// import EventList from "./test/EventList";

//dispatchers
import DispatcherList from "./dispatcher/DispatcherList";
import AddNewDispatcher from "./dispatcher/modals/AddNewDispatcher.modal";
import DeleteDispatcher from "./dispatcher/modals/DeleteDispatcher.modal";
import EditDispatcher from "./dispatcher/modals/EditDispatcher.modal";
import {
  deleteDispatcherStart,
  addDispatcherStart,
  updateDispatcherStart,
} from "../../redux/dispatchers/dispatcher.actions";

//payments
import PaymentList from "./payment/PaymentList";
import AddNewPayment from "./payment/modals/AddNewPayment.modal";
import DeletePayment from "./payment/modals/DeletePayment.modal";
import EditPayment from "./payment/modals/EditPayment.modal";
import {
  deletePaymentStart,
  addPaymentStart,
  updatePaymentStart,
} from "../../redux/payments/payment.actions";

//workList
import WorkList from "./workList/WorkList";
import AddNewWorkListItem from "./workList/modals/AddNewWorkListItem";
import DeleteWorkListItem from "./workList/modals/DeleteWorkListItem";
import EditWorkListItem from "./workList/modals/EditWorkListItem";
import {
  deleteWorkListItemStart,
  addWorkListItemStart,
  updateWorkListStart,
} from "../../redux/workList/workList.actions";

//technicians
import TechnicianList from "./technician/TechnicianList";
import AddNewTechnician from "./technician/modals/AddNewTechnician.modal";
import DeleteTechnician from "./technician/modals/DeleteTechnician.modal";
import EditTechnician from "./technician/modals/EditTechnician.modal";
import {
  deleteTechnicianStart,
  addTechnicianStart,
  updateTechnicianStart,
} from "../../redux/technicians/technician.actions";

//inventory tabs
import TabList from "./inventoryTabs/TabList";
import AddTab from "./inventoryTabs/modals/AddNewTab.modal";
import DeleteTab from "./inventoryTabs/modals/DeleteTab.modal";
import EditTab from "./inventoryTabs/modals/EditTab.modal";
import {
  deleteTabStart,
  addTabStart,
  updateTabStart,
} from "../../redux/tabs/tab.actions";

//version
import Version from "./version/Version.card";

import Grid from "@material-ui/core/Grid";

const Settings = ({
  deletePaymentStart,
  addPaymentStart,
  updatePaymentStart,
  deleteDispatcherStart,
  addDispatcherStart,
  updateDispatcherStart,
  deleteWorkListItemStart,
  addWorkListItemStart,
  updateWorkListStart,
  deleteTechnicianStart,
  addTechnicianStart,
  updateTechnicianStart,
  deleteTabStart,
  addTabStart,
  updateTabStart,
}) => {
  //dispatcher
  const [dispatcher, setDispatcher] = useState({});
  //add dispatcher modal
  const [isAddDispatcherModalOpen, setAddDispatcherModalOpen] = useState(false);
  const openAddDispatcherModal = () => {
    setAddDispatcherModalOpen(true);
  };
  const closeAddDispatcherModal = () => {
    setAddDispatcherModalOpen(false);
  };
  //delete dispatcher modal
  const [isDeleteDispatcherModalOpen, setDeleteDispatcherModalOpen] =
    useState(false);
  const openDeleteDispatcherModal = (dispatcher) => {
    setDeleteDispatcherModalOpen(true);
    setDispatcher(dispatcher);
  };
  const closeDeleteDispatcherModal = () => {
    setDeleteDispatcherModalOpen(false);
  };
  const removeDispatcher = (dispatcherToDelete) => {
    console.log(dispatcherToDelete);
    deleteDispatcherStart(dispatcherToDelete);
    closeDeleteDispatcherModal();
  };
  //edit dispatcher modal
  const [isEditDispatcherModalOpen, setEditDispatcherModalOpen] =
    useState(false);
  const openEditDisptcherModal = (dispatcher) => {
    setEditDispatcherModalOpen(true);
    setDispatcher(dispatcher);
  };
  const closeEditDispatcherModal = () => {
    setEditDispatcherModalOpen(false);
  };

  //Payment
  const [payment, setPayment] = useState({});
  //add payment modal
  const [isAddPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const openAddPaymentModal = () => {
    setAddPaymentModalOpen(true);
  };
  const closeAddPaymentModal = () => {
    setAddPaymentModalOpen(false);
  };

  //delete payment modal
  const [isDeletePaymentModalOpen, setDeletePaymentModalOpen] = useState(false);
  const openDeletePaymentModal = (payment) => {
    setDeletePaymentModalOpen(true);
    setPayment(payment);
  };
  const closeDeletePaymentModal = () => {
    setDeletePaymentModalOpen(false);
  };
  const removePayment = (paymentToDelete) => {
    deletePaymentStart(paymentToDelete);
    closeDeletePaymentModal();
  };
  //edit payment
  const [isEditPaymentModalOpen, setEditPaymentModalOpen] = useState(false);
  const openEditPaymentModal = (payment) => {
    setEditPaymentModalOpen(true);
    setPayment(payment);
  };
  const closeEditPaymentModal = () => {
    setEditPaymentModalOpen(false);
  };

  //Work List Item
  const [workListItem, setWorkListItem] = useState({});
  // add work list item
  const [isAddWorkListItemModalOpen, setAddWorkListItemOpen] = useState(false);
  const openAddWorkListItemModal = () => {
    setAddWorkListItemOpen(true);
  };
  const closeAddWorkListItemModal = () => {
    setAddWorkListItemOpen(false);
  };
  // delete work list item
  const [isDeleteWorkListItemModalOpen, setDeleteWorkListItemModalOpen] =
    useState(false);

  const openDeleteWorkListItemModal = (workListItemOption) => {
    console.log("openDeleteWorkListItemModal: ", workListItemOption);
    setDeleteWorkListItemModalOpen(true);
    setWorkListItem(workListItemOption);
  };
  const closeDeleteWorkListItemModal = () => {
    setDeleteWorkListItemModalOpen(false);
  };
  const removeWorkListItem = (workListItemToDelete) => {
    console.log("removeWorkListItem: ", workListItemToDelete);
    deleteWorkListItemStart(workListItemToDelete);
    closeDeleteWorkListItemModal();
  };
  //edit work list item
  const [isEditWorkListItemModalOpen, setEditWorkListItemModalOpen] =
    useState(false);
  const openEditWorkListItemModal = (workListItemOption) => {
    console.log("openEditWorkListItemModal: ", workListItemOption);
    setEditWorkListItemModalOpen(true);
    setWorkListItem(workListItemOption);
  };
  const closeEditWorkListItemModal = () => {
    setEditWorkListItemModalOpen(false);
  };

  // Technician
  const [technician, setTechnician] = useState({});
  //add technician
  const [isAddTechnicianModalOpen, setAddTechnicianModalOpen] = useState(false);
  const openAddTechnicianModal = () => {
    setAddTechnicianModalOpen(true);
  };
  const closeAddTechnicianModal = () => {
    setAddTechnicianModalOpen(false);
  };
  //delete technician
  const [isDeleteTechnicianModalOpen, setDeleteTechnicianModalOpen] =
    useState(false);
  const openDeleteTechnicianModal = (technicianToDelete) => {
    setDeleteTechnicianModalOpen(true);
    setTechnician(technicianToDelete);
  };
  const closeDeleteTechnicianModal = () => {
    setDeleteTechnicianModalOpen(false);
  };
  const removeTechnician = (technicianToRemove) => {
    deleteTechnicianStart(technicianToRemove);
    closeDeleteTechnicianModal();
  };
  //edit technician
  const [isEditTechnicianModalOpen, setEditTechnicianModalOpen] =
    useState(false);
  const openEditTechnicianModal = (technicianToEdit) => {
    setEditTechnicianModalOpen(true);
    setTechnician(technicianToEdit);
  };
  const closeEditTechnicianModal = () => {
    setEditTechnicianModalOpen(false);
  };

  //inventory tabs
  const [tab, setTab] = useState({});
  //add tab modal
  const [isAddTabModalOpen, setAddTabModalOpen] = useState(false);
  const openAddTabModal = () => {
    setAddTabModalOpen(true);
  };
  const closeAddTabModal = () => {
    setAddTabModalOpen(false);
  };
  //delete tab modal
  const [isDeleteTabModalOpen, setDeleteTabModalOpen] = useState(false);
  const openDeleteTabModal = (tab) => {
    setDeleteTabModalOpen(true);
    setTab(tab);
  };
  const closeDeleteTabModal = () => {
    setDeleteTabModalOpen(false);
  };
  const removeTab = (tabToDelete) => {
    console.log(tabToDelete);
    deleteTabStart(tabToDelete);
    closeDeleteTabModal();
  };
  // edit tab modal
  const [isEditTabModalOpen, setEditTabModalOpen] = useState(false);
  const openEditTabModal = (tab) => {
    setEditTabModalOpen(true);
    setTab(tab);
  };
  const closeEditTabModal = () => {
    setEditTabModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <DispatcherList
            openAddDispatcherModal={openAddDispatcherModal}
            openDeleteDispatcherModal={openDeleteDispatcherModal}
            openEditDispatcherModal={openEditDisptcherModal}
          />
        </Grid>
        <Grid item xs={4}>
          <PaymentList
            openAddPaymentModal={openAddPaymentModal}
            openDeletePaymentModal={openDeletePaymentModal}
            openEditPaymentModal={openEditPaymentModal}
          />
        </Grid>
        <Grid item xs={4}>
          <WorkList
            openAddWorkListModal={openAddWorkListItemModal}
            openDeleteWorkListItemModal={openDeleteWorkListItemModal}
            openEditWorkListItemModal={openEditWorkListItemModal}
          />
        </Grid>
        <Grid item xs={8}>
          <TechnicianList
            openAddTechnicianModal={openAddTechnicianModal}
            openDeleteTechnicianModal={openDeleteTechnicianModal}
            openEditTechnicianModal={openEditTechnicianModal}
          />
        </Grid>
        <Grid item xs={4}>
          <TabList
            openAddTabModal={openAddTabModal}
            openDeleteTabModal={openDeleteTabModal}
            openEditTabModal={openEditTabModal}
          />
        </Grid>
        <Grid item xs={4}>
          <Version />
        </Grid>
        {isAddDispatcherModalOpen && (
          <AddNewDispatcher
            isAddDispatcherModalOpen={isAddDispatcherModalOpen}
            closeAddDispatcherModal={closeAddDispatcherModal}
            addDispatcherStart={addDispatcherStart}
          />
        )}
        {isDeleteDispatcherModalOpen && (
          <DeleteDispatcher
            isDeleteDispatcherModalOpen={isDeleteDispatcherModalOpen}
            closeDeleteDispatcherModal={closeDeleteDispatcherModal}
            removeDispatcher={removeDispatcher}
            dispatcher={dispatcher}
          />
        )}
        {isEditDispatcherModalOpen && (
          <EditDispatcher
            isEditDispatcherModalOpen={isEditDispatcherModalOpen}
            closeEditDispatcherModal={closeEditDispatcherModal}
            dispatcher={dispatcher}
            updateDispatcherStart={updateDispatcherStart}
          />
        )}
        {isAddPaymentModalOpen && (
          <AddNewPayment
            isAddPaymentModalOpen={isAddPaymentModalOpen}
            closeAddPaymentModal={closeAddPaymentModal}
            addPaymentStart={addPaymentStart}
          />
        )}
        {isDeletePaymentModalOpen && (
          <DeletePayment
            isDeletePaymentModalOpen={isDeletePaymentModalOpen}
            closeDeletePaymentModal={closeDeletePaymentModal}
            removePayment={removePayment}
            payment={payment}
          />
        )}
        {isEditPaymentModalOpen && (
          <EditPayment
            isEditPaymentModalOpen={isEditPaymentModalOpen}
            closeEditPaymentModal={closeEditPaymentModal}
            payment={payment}
            updatePaymentStart={updatePaymentStart}
          />
        )}
        {isAddWorkListItemModalOpen && (
          <AddNewWorkListItem
            isAddWorkListItemModalOpen={isAddWorkListItemModalOpen}
            closeAddWorkListItemModal={closeAddWorkListItemModal}
            addWorkListItemStart={addWorkListItemStart}
          />
        )}
        {isDeleteWorkListItemModalOpen && (
          <DeleteWorkListItem
            isDeleteWorkListItemModalOpen={isDeleteWorkListItemModalOpen}
            closeDeleteWorkListItemModal={closeDeleteWorkListItemModal}
            removeWorkListItem={removeWorkListItem}
            workListItem={workListItem}
          />
        )}
        {isEditWorkListItemModalOpen && (
          <EditWorkListItem
            isEditWorkListItemModalOpen={isEditWorkListItemModalOpen}
            closeEditWorkListItemModal={closeEditWorkListItemModal}
            workListItem={workListItem}
            updateWorkListStart={updateWorkListStart}
          />
        )}
        {isAddTechnicianModalOpen && (
          <AddNewTechnician
            isAddTechnicianModalOpen={isAddTechnicianModalOpen}
            closeAddTechnicianModal={closeAddTechnicianModal}
            addTechnicianStart={addTechnicianStart}
          />
        )}
        {isDeleteTechnicianModalOpen && (
          <DeleteTechnician
            isDeleteTechnicianModalOpen={isDeleteTechnicianModalOpen}
            closeDeleteTechnicianModal={closeDeleteTechnicianModal}
            removeTechnician={removeTechnician}
            technician={technician}
          />
        )}
        {isEditTechnicianModalOpen && (
          <EditTechnician
            isEditTechnicianModalOpen={isEditTechnicianModalOpen}
            closeEditTechnicianModal={closeEditTechnicianModal}
            technician={technician}
            updateTechnicianStart={updateTechnicianStart}
          />
        )}
        {isAddTabModalOpen && (
          <AddTab
            isAddTabModalOpen={isAddTabModalOpen}
            closeAddTabModal={closeAddTabModal}
            addTabStart={addTabStart}
          />
        )}
        {isDeleteTabModalOpen && (
          <DeleteTab
            isDeleteTabModalOpen={isDeleteTabModalOpen}
            closeDeleteTabModal={closeDeleteTabModal}
            removeTab={removeTab}
            tab={tab}
          />
        )}
        {isEditTabModalOpen && (
          <EditTab
            isEditTabModalOpen={isEditTabModalOpen}
            closeEditTabModal={closeEditTabModal}
            tab={tab}
            updateTabStart={updateTabStart}
          />
        )}
      </Grid>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  //payments
  deletePaymentStart: (payment) => dispatch(deletePaymentStart(payment)),
  addPaymentStart: (payment) => dispatch(addPaymentStart(payment)),
  updatePaymentStart: (payment) => dispatch(updatePaymentStart(payment)),

  //dispatchers
  deleteDispatcherStart: (dispatcher) =>
    dispatch(deleteDispatcherStart(dispatcher)),
  addDispatcherStart: (dispatcher) => dispatch(addDispatcherStart(dispatcher)),
  updateDispatcherStart: (dispatcher) =>
    dispatch(updateDispatcherStart(dispatcher)),

  //work list
  deleteWorkListItemStart: (workListItem) =>
    dispatch(deleteWorkListItemStart(workListItem)),
  addWorkListItemStart: (workListItem) =>
    dispatch(addWorkListItemStart(workListItem)),
  updateWorkListStart: (workListItem) =>
    dispatch(updateWorkListStart(workListItem)),

  //technicians
  deleteTechnicianStart: (technician) =>
    dispatch(deleteTechnicianStart(technician)),
  addTechnicianStart: (technician) => dispatch(addTechnicianStart(technician)),
  updateTechnicianStart: (technician) =>
    dispatch(updateTechnicianStart(technician)),

  //inventory tabs
  deleteTabStart: (tab) => dispatch(deleteTabStart(tab)),
  addTabStart: (tab) => dispatch(addTabStart(tab)),
  updateTabStart: (tab) => dispatch(updateTabStart(tab)),
});

export default connect(null, mapDispatchToProps)(Settings);
