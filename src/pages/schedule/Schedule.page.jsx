import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../redux/technicians/technician.selectors";

import { useSnackbar } from "notistack";

import CalendarView from "./calendar/CalendarView";
import DailyOptions from "./modals/DailyOptions.modal";
import SelectDispatch from "./modals/SelectedDispatch.modal";
import DayLabelEditor from "./modals/DayLabelEditor.modal";
import AddDayLabel from "./modals/AddDayLabel.modal";
import EditDayLabel from "./modals/EditDayLabel.modal";
import DeleteDayLabel from "./modals/DeleteDayLabel.modal";
import DeleteDispatch from "./modals/DeleteDispatch.modal";
import EditDispatch from "./modals/EditDispatch.modal";
import Completed from "../../components/completed/Completed.modal";
import { makeStyles } from "@material-ui/core/styles";

//tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calendar-tabpanel-${index}`}
      aria-labelledby={`calendar-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `calendar-tab-${index}`,
    "aria-controls": `calendar-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Schedule = ({ technicians, isTechniciansLoaded }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  //daily options
  const [isDailyOptionsModalOpen, setDailyOptionsModalOpen] = useState(false);
  const [dateOfDailyOptionsSelected, setDateOfDailyOptionsSelected] = useState(
    {}
  );
  const openDailyOptionsModal = (date) => {
    setDateOfDailyOptionsSelected(date);
    setDailyOptionsModalOpen(true);
  };
  const closeDailyOptionsModal = () => {
    setDailyOptionsModalOpen(false);
  };

  //select dispatch
  const [isSelectedDispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedDispatch, setDispatch] = useState({});
  const openSelectedDispatchModal = (info) => {
    setDispatch(info);
    setDispatchModalOpen(true);
  };
  const closeSelectedDispatchModal = () => {
    setDispatchModalOpen(false);
  };
  const updateDispatchSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //delete dispatch
  const [isDeleteDispatchModalOpen, setDeleteDispatchModalOpen] = useState(
    false
  );
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

  //edit dispatch
  const [dispatchToUpdate, setDispatchToUpdate] = useState({});
  const [isEditDispatchModalOpen, setEditDispatchModalOpen] = useState(false);
  const openEditDispatchModal = (dispatch) => {
    setEditDispatchModalOpen(true);
    setDispatchToUpdate(dispatch);
  };
  const closeEditDispatchModal = () => {
    setEditDispatchModalOpen(false);
  };
  const editDispatchSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Updated!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //day label editor
  const [dayLabel, setDayLabel] = useState({});
  const [isDayLabelEditorModalOpen, setDayLabelEditorModalOpen] = useState(
    false
  );
  const openDayLabelEditorModal = () => {
    setDayLabelEditorModalOpen(true);
  };
  const closeDayLabelEditorModal = () => {
    setDayLabelEditorModalOpen(false);
  };

  //add day label
  const [isAddDayLabelModalOpen, setAddDayLabelModalOpen] = useState(false);
  const openAddDayLabelModal = () => {
    setAddDayLabelModalOpen(true);
  };
  const closeAddDayLabelModal = () => {
    setAddDayLabelModalOpen(false);
  };
  const newDayLabelSaveSuccessIndicator = () => {
    enqueueSnackbar("Label Added!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //edit day label
  const [isEditDayLabelModalOpen, setEditDayLabelModalOpen] = useState(false);
  const openEditDayLabelModal = (labelToEdit) => {
    setEditDayLabelModalOpen(true);
    setDayLabel(labelToEdit);
  };
  const closeEditDayLabelModal = () => {
    setEditDayLabelModalOpen(false);
  };
  const editDayLabelSuccessIndicator = () => {
    enqueueSnackbar("Label Changed!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //delete day label
  const [isDeleteDayLabelModalOpen, setDeleteDayLabelModalOpen] = useState(
    false
  );
  const openDeleteDayLabelModal = (labelToDelete) => {
    setDeleteDayLabelModalOpen(true);
    setDayLabel(labelToDelete);
  };
  const closeDeleteDayLabelModal = () => {
    setDeleteDayLabelModalOpen(false);
  };
  const deleteDayLabelSuccessIndicator = () => {
    enqueueSnackbar("Label Removed!", {
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
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          aria-label="calendar tabs"
        >
          <Tab label="ALL" {...a11yProps(0)} />
          {isTechniciansLoaded &&
            technicians.technicians.map((technician, index) => (
              <Tab
                key={technician.id}
                label={technician.name}
                style={{ backgroundColor: `${technician.color}` }}
                {...a11yProps(index + 1)}
              />
            ))}
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CalendarView
          technician={"ALL"}
          technicians={technicians}
          openDailyOptionsModal={openDailyOptionsModal}
          openSelectedDispatchModal={openSelectedDispatchModal}
        />
      </TabPanel>
      {isTechniciansLoaded &&
        technicians.technicians.map((technician, index) => (
          <TabPanel key={technician.id} value={tabValue} index={index + 1}>
            <CalendarView
              technician={technician.name}
              technicians={technicians}
              openDailyOptionsModal={openDailyOptionsModal}
              openSelectedDispatchModal={openSelectedDispatchModal}
            />
          </TabPanel>
        ))}
      {isDailyOptionsModalOpen && (
        <DailyOptions
          isDailyOptionsModalOpen={isDailyOptionsModalOpen}
          closeDailyOptionsModal={closeDailyOptionsModal}
          dateSelected={dateOfDailyOptionsSelected}
          openDayLabelEditorModal={openDayLabelEditorModal}
        />
      )}
      {isSelectedDispatchModalOpen && (
        <SelectDispatch
          isSelectedDispatchModalOpen={isSelectedDispatchModalOpen}
          closeSelectedDispatchModal={closeSelectedDispatchModal}
          selectedDispatch={selectedDispatch}
          openDeleteDispatchModal={openDeleteDispatchModal}
          updateDispatchSuccessIndicator={updateDispatchSuccessIndicator}
          openEditDispatchModal={openEditDispatchModal}
          openCompletedModal={openCompletedModal}
        />
      )}
      {isDayLabelEditorModalOpen && (
        <DayLabelEditor
          isDayLabelEditorModalOpen={isDayLabelEditorModalOpen}
          closeDayLabelEditor={closeDayLabelEditorModal}
          dateSelected={dateOfDailyOptionsSelected}
          openAddDayLabelModal={openAddDayLabelModal}
          openEditDayLabelModal={openEditDayLabelModal}
          openDeleteDayLabelModal={openDeleteDayLabelModal}
        />
      )}
      {isAddDayLabelModalOpen && (
        <AddDayLabel
          isAddDayLabelModalOpen={isAddDayLabelModalOpen}
          closeAddDayLabelModal={closeAddDayLabelModal}
          dateSelected={dateOfDailyOptionsSelected}
          newDayLabelSaveSuccessIndicator={newDayLabelSaveSuccessIndicator}
        />
      )}
      {isEditDayLabelModalOpen && (
        <EditDayLabel
          isEditDayLabelModalOpen={isEditDayLabelModalOpen}
          closeEditDayLabelModal={closeEditDayLabelModal}
          dateSelected={dateOfDailyOptionsSelected}
          dayLabel={dayLabel}
          editDayLabelSuccessIndicator={editDayLabelSuccessIndicator}
        />
      )}
      {isDeleteDayLabelModalOpen && (
        <DeleteDayLabel
          isDeleteDayLabelModalOpen={isDeleteDayLabelModalOpen}
          closeDeleteDayLabelModal={closeDeleteDayLabelModal}
          dayLabel={dayLabel}
          deleteDayLabelSuccessIndicator={deleteDayLabelSuccessIndicator}
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
      {isEditDispatchModalOpen && (
        <EditDispatch
          isEditDispatchModalOpen={isEditDispatchModalOpen}
          closeEditDispatchModal={closeEditDispatchModal}
          selectedDispatch={selectedDispatch}
          dispatchToUpdate={dispatchToUpdate}
          editDispatchSuccessIndicator={editDispatchSuccessIndicator}
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
  isTechniciansLoaded: selectIsTechniciansLoaded,
  technicians: selectTechnicianList,
});

export default connect(mapStateToProps)(Schedule);
