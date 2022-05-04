import React, { useState, lazy } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsClientLoaded,
  selectClientList,
} from "../../redux/clients/clients.selectors";

import firebase from "firebase/app";

import { useSnackbar } from "notistack";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import AddNewClient from "../client-search/modal/AddNewClient.modal";
import EditClient from "../client-info/modals/EditClient.modal";
import EditBilling from "../client-info/modals/EditBilling.modal";
import DeleteClient from "../client-info/modals/DeleteClient.modal";
import EquipmentList from "../client-info/modals/EquipmentList.modal";
import EquipmentDetails from "../client-info/modals/EquipmentDetails.modal";
import DeleteEquipment from "../../pages/client-info/modals/DeleteEquipment.modal";
import AddNewEquipment from "../../pages/client-info/modals/AddNewEquipment.modal";
import CreateDispatch from "../add-client-activity/modals/CreateDispatch";
import ActivityDetails from "../client-activity/modals/ActivityDetails.modal";
import NoteCreator from "../../components/note-creator/NoteCreator.modal";
import Dispatches from "../../pages/add-client-activity/modals/Dispatches.modal";
import SelectedDispatch from "../../components/dispatch/SelectedDispatch.modal";
import DeleteDispatch from "../../components/dispatch/DeleteDispatch.modal";
import PartsQuotes from "../../pages/add-client-activity/modals/PartsQuotes.modal";
import EquipmentQuotes from "../../pages/add-client-activity/modals/EquipmentQuotes.modal";
import WarrantyList from "../../pages/add-client-activity/modals/warrantyManager/WarrantyList.modal";
import AddWarranty from "../../pages/add-client-activity/modals/warrantyManager/AddWarranty.modal";
import WarrantyDetails from "../../pages/add-client-activity/modals/warrantyManager/WarrantyDetails.modal";
import DeleteWarranty from "../../pages/add-client-activity/modals/warrantyManager/DeleteWarranty.modal";
import MaintenanceList from "../../pages/add-client-activity/modals/maintenanceManager/MaintenanceList.modal";
import MaintenanceDetails from "../../pages/add-client-activity/modals/maintenanceManager/MaintenanceDetails.modal";
import AddMaintenace from "../../pages/add-client-activity/modals/maintenanceManager/AddMaintenance.modal";
import DeleteMaintenance from "../../pages/add-client-activity/modals/maintenanceManager/DeleteMaintenance.modal";
import Completed from "../../components/completed/Completed.modal";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { deleteClientStart } from "../../redux/clients/clients.actions";
import DailyTracking from "../daily-tracking/DailyTracking";

const ClientSearch = lazy(() => import("../client-search/ClientSearch.page"));
const ClientInfo = lazy(() => import("../client-info/ClientInfo.page"));
const AddClientActivity = lazy(() =>
  import("../add-client-activity/AddClientActivity.page")
);
const ClientActivity = lazy(() =>
  import("../client-activity/ClientActivity.page")
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  topSpacing: {
    marginTop: theme.spacing(2),
  },
}));

const ClientSearchWithSpinner = WithSpinner(ClientSearch);
const ClientInfoWithSpinner = WithSpinner(ClientInfo);
const AddClientActivityWithSpinner = WithSpinner(AddClientActivity);
const ClientActivityWithSpinner = WithSpinner(ClientActivity);

const HomePage = ({ isClientsLoaded, clients, deleteClientStart }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  //Add new client modal
  const [isClientModalOpen, setOpenAddClientModal] = useState(false);
  const openAddClientModal = () => {
    setOpenAddClientModal(true);
  };
  const closeAddClientModal = () => {
    setOpenAddClientModal(false);
  };
  const newClientSaveSuccessIndicator = () => {
    enqueueSnackbar("New Customer Saved!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Select current client
  const [client, setClient] = useState({ id: "" });
  const handleClientSelected = (client) => {
    setClient(client);
  };
  const [currentClient, setCurrentClient] = useState({});
  const getCurrentClient = (currentClientData) => {
    setCurrentClient(currentClientData);
  };

  //Edit current client
  const [isEditClientModalOpen, setEditClientModalOpen] = useState(false);
  const openEditClientModal = () => {
    setEditClientModalOpen(true);
  };
  const closeEditClientModal = () => {
    setEditClientModalOpen(false);
  };
  const editClientSaveSuccessIndicator = () => {
    enqueueSnackbar("Customer Information Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Edit current client billing
  const [isEditBillingModalOpen, setEditBillingModalOpen] = useState(false);
  const openEditBillingModal = () => {
    setEditBillingModalOpen(true);
  };
  const closeEditBillingModal = () => {
    setEditBillingModalOpen(false);
  };
  const editClientBillingSaveSuccessIndicator = () => {
    enqueueSnackbar("Customer Billing Information Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Delete current client
  const [isDeleteClientModalOpen, setDeleteClientModalOpen] = useState(false);
  const openDeleteClientModal = () => {
    setDeleteClientModalOpen(true);
  };
  const closeDeleteClientModal = () => {
    setDeleteClientModalOpen(false);
  };
  const deleteClientSuccessIndicator = () => {
    enqueueSnackbar("Customer Deleted!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };
  const removeClient = (clientToRemove) => {
    deleteClientStart(clientToRemove);
    setClient({ id: "" });
    closeDeleteClientModal();
    closeEditClientModal();
    deleteClientSuccessIndicator();
  };

  //Equipment List
  const [isEquipmentListModalOpen, setEquipmentListModalOpen] = useState(false);
  const openEquipmentListModal = () => {
    setEquipmentListModalOpen(true);
  };
  const closeEquipmentListModal = () => {
    setEquipmentListModalOpen(false);
  };

  //Equipment Details
  const [isEquipmentDetailsModalOpen, setEquipmentDetailsModalOpen] =
    useState(false);
  const [equipmentSelected, setEquipmentSelected] = useState({});
  const openEquipmentDetailsModal = (details) => {
    setEquipmentSelected(details);
    setEquipmentDetailsModalOpen(true);
  };
  const closeEquipmentDetailsModal = () => {
    setEquipmentSelected({});
    setEquipmentDetailsModalOpen(false);
  };
  const newUpdateEquipmentSuccessIndicator = () => {
    enqueueSnackbar("Equipment Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Delete Equipment
  const [isDeleteEquipmentModalOpen, setDeleteEquipmentModalOpen] =
    useState(false);
  const openDeleteEquipmentModal = () => {
    setDeleteEquipmentModalOpen(true);
  };
  const closeDeleteEquipmentModal = () => {
    setDeleteEquipmentModalOpen(false);
  };
  const deleteEquipmentSuccessIndicator = () => {
    enqueueSnackbar("Equipment Deleted!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Add New Equipment
  const [isAddNewEquipmentModalOpen, setAddNewEquipmentModalOpen] =
    useState(false);
  const openAddNewEquipmentModal = () => {
    setAddNewEquipmentModalOpen(true);
  };
  const closeAddNewEquipmentModal = () => {
    setAddNewEquipmentModalOpen(false);
  };
  const addNewEquipmentSuccessIndicator = () => {
    enqueueSnackbar("Equipment Added!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Update Customer Data
  const updateCustomerData = (customer) => {
    firebase
      .firestore()
      .collection("customers")
      .doc(`${customer.id}`)
      .update(customer)
      .then(() => console.log("updated"))
      .catch((error) => console.error("could not update customer", error));
  };

  //Create Dispatch Modal
  const [isCreateDispatchModalOpen, setCreateDispatchModalOpen] =
    useState(false);
  const openCreateDispatchModal = () => {
    setCreateDispatchModalOpen(true);
  };
  const closeCreateDispatchModal = () => {
    setCreateDispatchModalOpen(false);
  };
  const dispatchCreationSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Added!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Note Modal
  const [isNoteCreatorModalOpen, setNoteCreatorModalOpen] = useState(false);
  const [noteType, setNoteType] = useState("Phone");
  const openNoteCreatorModal = (selectedNoteType) => {
    setNoteType(selectedNoteType);
    setNoteCreatorModalOpen(true);
  };
  const closeNoteCreatorModal = () => {
    setNoteCreatorModalOpen(false);
  };

  //Activity Details Modal
  const [isActivityDetailsModalOpen, setActivityDetailsModalOpen] =
    useState(false);
  const [activity, setActivity] = useState({});
  const openActivityDetailsModal = (activity) => {
    setActivity(activity);
    setActivityDetailsModalOpen(true);
  };
  const closeActivityDetailsModal = () => {
    setActivityDetailsModalOpen(false);
  };

  //Dispatches Modal
  const [isDispatchesModalOpen, setDispatchesModalOpen] = useState(false);
  const openDispatchesModal = () => {
    setDispatchesModalOpen(true);
  };
  const closeDispatchesModal = () => {
    setDispatchesModalOpen(false);
  };

  //Parts Quotes Modal
  const [isPartsQuotesModalOpen, setPartsQuotesModalOpen] = useState(false);
  const openPartsQuotesModal = () => {
    setPartsQuotesModalOpen(true);
  };
  const closePartsQuotesModal = () => {
    setPartsQuotesModalOpen(false);
  };
  const openPartsQuoteTemplate = () => {
    console.log("opne the parts quote page");
  };

  //Equipment Quotes Modal
  const [isEquipmentQuotesModalOpen, setEquipmentQuotesModalOpen] =
    useState(false);
  const openEquipmentQuotesModal = () => {
    setEquipmentQuotesModalOpen(true);
  };
  const closeEquipmentQuotesModal = () => {
    setEquipmentQuotesModalOpen(false);
  };

  //Warranty List
  const [isWarrantyListModalOpen, setWarrantyListModalOpen] = useState(false);
  const openWarrantyListModal = () => {
    setWarrantyListModalOpen(true);
  };
  const closeWarrantyListModal = () => {
    setWarrantyListModalOpen(false);
  };

  //Add New Warranty
  const [isAddNewWarrantyModalOpen, setAddNewWarrantyModalOpen] =
    useState(false);
  const openAddNewWarrantyModal = () => {
    setAddNewWarrantyModalOpen(true);
  };
  const closeAddNewWarrantyModal = () => {
    setAddNewWarrantyModalOpen(false);
  };
  const warrantyCreationSuccessIndicator = () => {
    enqueueSnackbar("Warranty Added!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Warranty Details
  const [isWarrantyDetailsModalOpen, setWarrantyDetailsModalOpen] =
    useState(false);
  const [warrantySelected, setWarrantySelected] = useState({});
  const openWarrantyDetailsModal = (details) => {
    setWarrantySelected(details);
    setWarrantyDetailsModalOpen(true);
  };
  const closeWarrantyDetailsModal = () => {
    setWarrantySelected({});
    setWarrantyDetailsModalOpen(false);
  };
  const warrantyUpdateSuccessIndicator = () => {
    enqueueSnackbar("Warranty Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Warranty Delete
  const [isDeleteWarrantyModalOpen, setDeleteWarrantyModalOpen] =
    useState(false);
  const openDeleteWarrantyModal = () => {
    setDeleteWarrantyModalOpen(true);
  };
  const closeDeleteWarrantyModal = () => {
    setDeleteWarrantyModalOpen(false);
  };
  const deleteWarrantySuccessIndicator = () => {
    enqueueSnackbar("Warranty Deleted!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Maintnance List
  const [isMaintnanceListModalOpen, setMaintnanceListModalOpen] =
    useState(false);
  const openMaintnanceListModal = () => {
    setMaintnanceListModalOpen(true);
  };
  const closeMaintenanceListModal = () => {
    setMaintnanceListModalOpen(false);
  };

  //Maintenance Details
  const [isMaintenanceDetailsModalOpen, setMaintenanceDetailsModalOpen] =
    useState(false);
  const [maintenanceSelected, setMaintenanceSelected] = useState({});
  const openMaintenanceDetailsModal = (details) => {
    setMaintenanceSelected(details);
    setMaintenanceDetailsModalOpen(true);
  };
  const closeMaintenanceDetailsmodal = () => {
    setMaintenanceDetailsModalOpen(false);
  };
  const maintenanceUpdateSuccessIndicator = () => {
    enqueueSnackbar("Maintenance Updated", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Add Maintenance
  const [isAddMaintenanceModalOpen, setAddMaintenanceModalOpen] =
    useState(false);
  const openAddMaintenanceModal = () => {
    setAddMaintenanceModalOpen(true);
  };
  const closeAddMaintenanceModal = () => {
    setAddMaintenanceModalOpen(false);
  };
  const maintenanceCreationSuccessIndicator = () => {
    enqueueSnackbar("New Maintenance Created", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Delete Maintenance
  const [isDeleteMaintenanceModalOpen, setDeleteMaintenanceModalOpen] =
    useState(false);
  const openDeleteMaintenanceModal = () => {
    setDeleteMaintenanceModalOpen(true);
  };
  const closeDeleteMaintenanceModal = () => {
    setDeleteMaintenanceModalOpen(false);
  };
  const deleteMaintenanceSuccessIndicator = () => {
    enqueueSnackbar("Deleted Maintenance!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //selected dispatch
  const [isSelectedDispatchModalOpen, setSelectedDispatchModalOpen] =
    useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState({});
  const openSelectedDispatchModal = (clickedDispatch) => {
    console.log("the dispatch you chose: ", clickedDispatch);
    setSelectedDispatch(clickedDispatch);
    setSelectedDispatchModalOpen(true);
  };
  const closeSelectedDispatchModal = () => {
    setSelectedDispatchModalOpen(false);
  };
  const updateDispatchSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //delete dispatch
  const [isDeleteDispatchModalOpen, setDeleteDispatchModalOpen] =
    useState(false);
  const openDeleteDispatchModal = () => {
    setDeleteDispatchModalOpen(true);
  };
  const closeDeleteDispatchModal = () => {
    setDeleteDispatchModalOpen(false);
  };
  const deleteDispatchSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Deleted!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //completed
  const [isCompletedModalOpen, setCompletedModalOpen] = useState(false);
  const openCompletedModal = () => {
    setCompletedModalOpen(true);
  };
  const closeCompletedModal = () => {
    setCompletedModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4} className={classes.topSpacing}>
          <ClientSearchWithSpinner
            isLoading={!isClientsLoaded}
            openAddClientModal={openAddClientModal}
            closeAddClientModal={closeAddClientModal}
            clients={clients}
            handleClientSelected={handleClientSelected}
          />
        </Grid>
        <Grid item xs={4} className={classes.topSpacing}>
          <ClientInfoWithSpinner
            isLoading={!isClientsLoaded}
            client={client}
            openEditClientModal={openEditClientModal}
            openEditBillingModal={openEditBillingModal}
            openEquipmentListModal={openEquipmentListModal}
            getCurrentClient={getCurrentClient}
          />
        </Grid>
        <Grid item xs={4} className={classes.topSpacing}>
          <AddClientActivityWithSpinner
            isLoading={!isClientsLoaded}
            client={client}
            openMaintnanceListModal={openMaintnanceListModal}
            openWarrantyListModal={openWarrantyListModal}
            openCreateDispatchModal={openCreateDispatchModal}
            openDispatchesModal={openDispatchesModal}
            openPartsQuotesModal={openPartsQuotesModal}
            openEquipmentQuotesModal={openEquipmentQuotesModal}
          />
        </Grid>
        <Grid item xs={6}>
          <DailyTracking />
        </Grid>
        <Grid item xs={6}>
          <ClientActivityWithSpinner
            client={client}
            isLoading={!isClientsLoaded}
            size="large"
            openActivityDetailsModal={openActivityDetailsModal}
            openNoteCreatorModal={openNoteCreatorModal}
          />
        </Grid>
      </Grid>
      {isClientModalOpen && (
        <AddNewClient
          isClientModalOpen={isClientModalOpen}
          closeAddClientModal={closeAddClientModal}
          newClientSaveSuccessIndicator={newClientSaveSuccessIndicator}
        />
      )}
      {isEditClientModalOpen && (
        <EditClient
          isEditClientModalOpen={isEditClientModalOpen}
          closeEditClientModal={closeEditClientModal}
          updateCustomerData={updateCustomerData}
          currentClient={currentClient}
          editClientSaveSuccessIndicator={editClientSaveSuccessIndicator}
          openDeleteClientModal={openDeleteClientModal}
        />
      )}
      {isEditBillingModalOpen && (
        <EditBilling
          isEditBillingModalOpen={isEditBillingModalOpen}
          closeEditBillingModal={closeEditBillingModal}
          updateCustomerData={updateCustomerData}
          currentClient={currentClient}
          editClientBillingSaveSuccessIndicator={
            editClientBillingSaveSuccessIndicator
          }
        />
      )}
      {isEquipmentListModalOpen && (
        <EquipmentList
          isEquipmentListModalOpen={isEquipmentListModalOpen}
          closeEquipmentListModal={closeEquipmentListModal}
          openEquipmentDetailsModal={openEquipmentDetailsModal}
          openAddNewEquipmentModal={openAddNewEquipmentModal}
          client={client}
        />
      )}
      {isEquipmentDetailsModalOpen && (
        <EquipmentDetails
          isEquipmentDetailsModalOpen={isEquipmentDetailsModalOpen}
          closeEquipmentDetailsModal={closeEquipmentDetailsModal}
          openDeleteEquipmentModal={openDeleteEquipmentModal}
          equipmentSelected={equipmentSelected}
          client={client}
          newUpdateEquipmentSuccessIndicator={
            newUpdateEquipmentSuccessIndicator
          }
        />
      )}
      {isDeleteEquipmentModalOpen && (
        <DeleteEquipment
          isDeleteEquipmentModalOpen={isDeleteEquipmentModalOpen}
          closeDeleteEquipmentModal={closeDeleteEquipmentModal}
          equipmentSelected={equipmentSelected}
          closeEquipmentDetailsModal={closeEquipmentDetailsModal}
          deleteEquipmentSuccessIndicator={deleteEquipmentSuccessIndicator}
        />
      )}
      {isAddNewEquipmentModalOpen && (
        <AddNewEquipment
          isAddNewEquipmentModalOpen={isAddNewEquipmentModalOpen}
          closeAddNewEquipmentModal={closeAddNewEquipmentModal}
          addNewEquipmentSuccessIndicator={addNewEquipmentSuccessIndicator}
          client={client}
        />
      )}
      {isCreateDispatchModalOpen && (
        <CreateDispatch
          isCreateDispatchModalOpen={isCreateDispatchModalOpen}
          closeCreateDispatchModal={closeCreateDispatchModal}
          client={client}
          dispatchCreationSuccessIndicator={dispatchCreationSuccessIndicator}
        />
      )}
      {isActivityDetailsModalOpen && (
        <ActivityDetails
          isActivityDetailsModalOpen={isActivityDetailsModalOpen}
          closeActivityDetailsModal={closeActivityDetailsModal}
          id={client.id}
          activity={activity}
        />
      )}
      {isNoteCreatorModalOpen && (
        <NoteCreator
          isNoteCreatorModalOpen={isNoteCreatorModalOpen}
          closeNoteCreatorModal={closeNoteCreatorModal}
          id={client.id}
          noteType={noteType}
        />
      )}
      {isDispatchesModalOpen && (
        <Dispatches
          isDispatchesModalOpen={isDispatchesModalOpen}
          closeDispatchesModal={closeDispatchesModal}
          openSelectedDispatchModal={openSelectedDispatchModal}
          client={client}
        />
      )}
      {isPartsQuotesModalOpen && (
        <PartsQuotes
          isPartsQuotesModalOpen={isPartsQuotesModalOpen}
          closePartsQuotesModal={closePartsQuotesModal}
          openPartsQuoteTemplate={openPartsQuoteTemplate}
          client={client}
        />
      )}
      {isEquipmentQuotesModalOpen && (
        <EquipmentQuotes
          isEquipmentQuotesModalOpen={isEquipmentQuotesModalOpen}
          closeEquipmentQuotesModal={closeEquipmentQuotesModal}
          client={client}
        />
      )}
      {isDeleteClientModalOpen && (
        <DeleteClient
          isDeleteClientModalOpen={isDeleteClientModalOpen}
          closeDeleteClientModal={closeDeleteClientModal}
          client={client}
          removeClient={removeClient}
        />
      )}
      {isWarrantyListModalOpen && (
        <WarrantyList
          isWarrantyListModalOpen={isWarrantyListModalOpen}
          closeWarrantyListModal={closeWarrantyListModal}
          openAddNewWarrantyModal={openAddNewWarrantyModal}
          openWarrantyDetailsModal={openWarrantyDetailsModal}
          client={client}
        />
      )}
      {isAddNewWarrantyModalOpen && (
        <AddWarranty
          isAddNewWarrantyModalOpen={isAddNewWarrantyModalOpen}
          closeAddNewWarrantyModal={closeAddNewWarrantyModal}
          client={client}
          warrantyCreationSuccessIndicator={warrantyCreationSuccessIndicator}
        />
      )}
      {isWarrantyDetailsModalOpen && (
        <WarrantyDetails
          isWarrantyDetailsModalOpen={isWarrantyDetailsModalOpen}
          closeWarrantyDetailsModal={closeWarrantyDetailsModal}
          openDeleteWarrantyModal={openDeleteWarrantyModal}
          client={client}
          warrantySelected={warrantySelected}
          warrantyUpdateSuccessIndicator={warrantyUpdateSuccessIndicator}
        />
      )}
      {isDeleteWarrantyModalOpen && (
        <DeleteWarranty
          isDeleteWarrantyModalOpen={isDeleteWarrantyModalOpen}
          closeDeleteWarrantyModal={closeDeleteWarrantyModal}
          closeWarrantyDetailsModal={closeWarrantyDetailsModal}
          warrantySelected={warrantySelected}
          client={client}
          deleteWarrantySuccessIndicator={deleteWarrantySuccessIndicator}
        />
      )}
      {isMaintnanceListModalOpen && (
        <MaintenanceList
          isMaintenanceListModalOpen={isMaintnanceListModalOpen}
          closeMaintenanceListModal={closeMaintenanceListModal}
          openMaintenanceDetailsModal={openMaintenanceDetailsModal}
          openAddMaintenanceModal={openAddMaintenanceModal}
          client={client}
        />
      )}
      {isMaintenanceDetailsModalOpen && (
        <MaintenanceDetails
          isMaintenanceDetailsModalOpen={isMaintenanceDetailsModalOpen}
          closeMaintenanceDetailsModal={closeMaintenanceDetailsmodal}
          client={client}
          maintenanceSelected={maintenanceSelected}
          openDeleteMaintenanceModal={openDeleteMaintenanceModal}
          maintenanceUpdateSuccessIndicator={maintenanceUpdateSuccessIndicator}
        />
      )}
      {isAddMaintenanceModalOpen && (
        <AddMaintenace
          isAddMaintenanceModalOpen={isAddMaintenanceModalOpen}
          closeAddMaintenanceModal={closeAddMaintenanceModal}
          client={client}
          maintenanceCreationSuccessIndicator={
            maintenanceCreationSuccessIndicator
          }
        />
      )}
      {isDeleteMaintenanceModalOpen && (
        <DeleteMaintenance
          isDeleteMaintenanceModalOpen={isDeleteMaintenanceModalOpen}
          closeDeleteMaintenanceModal={closeDeleteMaintenanceModal}
          closeMaintenanceDetailsModal={closeMaintenanceDetailsmodal}
          maintenanceSelected={maintenanceSelected}
          client={client}
          deleteMaintenanceSuccessIndicator={deleteMaintenanceSuccessIndicator}
        />
      )}
      {isSelectedDispatchModalOpen && (
        <SelectedDispatch
          selectedDispatch={selectedDispatch}
          isSelectedDispatchModalOpen={isSelectedDispatchModalOpen}
          closeSelectedDispatchModal={closeSelectedDispatchModal}
          updateDispatchSuccessIndicator={updateDispatchSuccessIndicator}
          openDeleteDispatchModal={openDeleteDispatchModal}
          openCompletedModal={openCompletedModal}
        />
      )}
      {isDeleteDispatchModalOpen && (
        <DeleteDispatch
          isDeleteDispatchModalOpen={isDeleteDispatchModalOpen}
          closeDeleteDispatchModal={closeDeleteDispatchModal}
          closeSelectedDispatchModal={closeSelectedDispatchModal}
          selectedDispatch={selectedDispatch}
          deleteDispatchSuccessIndicator={deleteDispatchSuccessIndicator}
        />
      )}
      {isCompletedModalOpen && (
        <Completed
          isCompletedModalOpen={isCompletedModalOpen}
          closeCompletedModal={closeCompletedModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isClientsLoaded: selectIsClientLoaded,
  clients: selectClientList,
});

const mapDispatchToProps = (dispatch) => ({
  deleteClientStart: (client) => dispatch(deleteClientStart(client)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
