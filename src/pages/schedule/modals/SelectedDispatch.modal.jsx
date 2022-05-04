import "date-fns";
import firebase from "firebase/app";
import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";

import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addEventStart,
  updateEventStart,
  deleteEventStart,
} from "../../../redux/events/event.actions";

import {
  selectIsDispatcherLoaded,
  selectDispatchersList,
} from "../../../redux/dispatchers/dispatcher.selectors";
import {
  selectIsWorkListLoaded,
  selectWorkList,
} from "../../../redux/workList/workList.selectors";
import {
  selectIsPaymentsLoaded,
  selectPaymentList,
} from "../../../redux/payments/payment.selectors";
import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../../redux/technicians/technician.selectors";

import {
  compareEvents,
  compareHelper,
  compareLead,
  finalUpdate,
} from "../../../utils/scheduleUtils";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";
import { setDateToZeroHours } from "../../../utils/dateUtils";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: "teal",
  },
  formControl: {
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  redButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
    color: "white",
  },
  orangeButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "orange",
    color: "white",
  },
  greenButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "green",
    color: "white",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectDispatch = ({
  selectedDispatch,
  isSelectedDispatchModalOpen,
  closeSelectedDispatchModal,
  dispatchers,
  isDispatchersLoaded,
  workList,
  isWorkListLoaded,
  payments,
  isPaymentsLoaded,
  technicians,
  isTechniciansLoaded,
  addEventStart,
  deleteEventStart,
  updateEventStart,
  openDeleteDispatchModal,
  updateDispatchSuccessIndicator,
  openCompletedModal,
  openEditDispatchModal,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const customerId = selectedDispatch.extendedProps.customerId;
  const dateCreated = selectedDispatch.extendedProps.dateCreated;
  const dateScheduled = selectedDispatch.extendedProps.dateScheduled;
  const dateModified = selectedDispatch.extendedProps.dateModified;
  const id = selectedDispatch.id;
  const techHelperId = selectedDispatch.extendedProps.techHelperId
    ? selectedDispatch.extendedProps.techHelperId
    : "";
  const status = selectedDispatch.extendedProps.status;
  const scheduledDate = selectedDispatch.extendedProps.scheduledDate;
  const end = selectedDispatch.end;
  const title = selectedDispatch.title;
  const localInvoiceId =
    selectedDispatch.extendedProps.invoiceId !== undefined
      ? selectedDispatch.extendedProps.invoiceId
      : "";

  const [start, setStart] = useState(
    selectedDispatch.start
      ? selectedDispatch.start
      : setDateToZeroHours(new Date())
  );
  const [leadSource, setLeadSource] = useState(
    selectedDispatch.extendedProps.leadSource
      ? selectedDispatch.extendedProps.leadSource
      : "PC"
  );
  const [takenBy, setTakenBy] = useState(
    selectedDispatch.extendedProps.takenBy
      ? selectedDispatch.extendedProps.takenBy
      : ""
  );
  const [firstname, setFirstname] = useState(
    selectedDispatch.extendedProps.firstname
      ? selectedDispatch.extendedProps.firstname
      : ""
  );
  const [lastname, setLastname] = useState(
    selectedDispatch.extendedProps.lastname
      ? selectedDispatch.extendedProps.lastname
      : ""
  );
  const [street, setStreet] = useState(
    selectedDispatch.extendedProps.street
      ? selectedDispatch.extendedProps.street
      : ""
  );
  const [city, setCity] = useState(
    selectedDispatch.extendedProps.city
      ? selectedDispatch.extendedProps.city
      : ""
  );
  const [phoneName, setPhoneName] = useState(
    selectedDispatch.extendedProps.phoneName
      ? selectedDispatch.extendedProps.phoneName
      : ""
  );
  const [altPhoneName, setAltPhoneName] = useState(
    selectedDispatch.extendedProps.altPhoneName
      ? selectedDispatch.extendedProps.altPhoneName
      : ""
  );
  const [phone, setPhone] = useState(
    selectedDispatch.extendedProps.phone
      ? selectedDispatch.extendedProps.phone
      : ""
  );
  const [altphone, setAltPhone] = useState(
    selectedDispatch.extendedProps.altphone
      ? selectedDispatch.extendedProps.altphone
      : ""
  );
  const [issue, setIssue] = useState(
    selectedDispatch.extendedProps.issue
      ? selectedDispatch.extendedProps.issue
      : ""
  );
  const [timeAlotted, setTimeAlotted] = useState(
    selectedDispatch.extendedProps.timeAlotted
      ? selectedDispatch.extendedProps.timeAlotted
      : "1.5"
  );
  const [techLead, setTechLead] = useState(
    selectedDispatch.extendedProps.techLead
      ? selectedDispatch.extendedProps.techLead
      : ""
  );
  const [techHelper, setTechHelper] = useState(
    selectedDispatch.extendedProps.techHelper
      ? selectedDispatch.extendedProps.techHelper
      : "NONE"
  );
  const [payment, setPayment] = useState(
    selectedDispatch.extendedProps.payment
      ? selectedDispatch.extendedProps.payment
      : "C.O.D."
  );
  const [notes, setNotes] = useState(
    selectedDispatch.extendedProps.notes
      ? selectedDispatch.extendedProps.notes
      : ""
  );
  const [timeOfDay, setTimeOfDay] = useState(
    selectedDispatch.extendedProps.timeOfDay
      ? selectedDispatch.extendedProps.timeOfDay
      : "Anytime"
  );
  const [jobNumber, setJobNumber] = useState(
    selectedDispatch.extendedProps.jobNumber
      ? selectedDispatch.extendedProps.jobNumber
      : ""
  );
  const [shorthand, setShorthand] = useState(
    selectedDispatch.extendedProps.shorthand
      ? selectedDispatch.extendedProps.shorthand
      : ""
  );

  const onSubmit = () => {
    if (status === "done" || status === "parts") {
      console.log("status: ", status);
      openCompletedModal();
    } else {
      const updatedDispatch = {
        altphone,
        altPhoneName,
        city,
        customerId,
        dateCreated,
        dateModified,
        dateScheduled,
        end,
        firstname,
        id,
        invoiceId: localInvoiceId,
        issue,
        jobNumber,
        lastname,
        leadSource,
        notes,
        payment,
        phone,
        phoneName,
        scheduledDate,
        shorthand,
        start,
        status,
        street,
        takenBy,
        techHelper,
        techHelperId,
        techLead,
        timeAlotted,
        timeOfDay,
        title,
      };
      console.log("updated dispatch object 1", updatedDispatch);
      //compare old dispatch with changes to see if techs changed
      const noTechChange = compareEvents(
        selectedDispatch.extendedProps,
        updatedDispatch
      );
      if (noTechChange === true) {
        console.log("no tech change");
        if (
          selectedDispatch.extendedProps.techHelperId === "" ||
          selectedDispatch.extendedProps.techHelperId === undefined
        ) {
          console.log("there is no extra dispatch to change");
          // update the original dispatch only
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateEventStart(eventToUpdate);
          updateDispatchSuccessIndicator();
          closeSelectedDispatchModal();
        } else {
          console.log("there is a extra dispatch to update");
          //update the first dispatch
          const firstEventToUpdate = finalUpdate(updatedDispatch);
          updateEventStart(firstEventToUpdate);
          //update the second dispatch
          let newEvent = { ...updatedDispatch };
          newEvent.id = updatedDispatch.techHelperId;
          newEvent.techLead = updatedDispatch.techHelper;
          newEvent.techHelper = updatedDispatch.techLead;
          newEvent.techHelperId = updatedDispatch.id;
          const secondEventToUpdate = finalUpdate(newEvent);
          updateEventStart(secondEventToUpdate);
          updateDispatchSuccessIndicator();
          closeSelectedDispatchModal();
        }
      } else {
        console.log("techs have changed");
        //decide if techLead or techHelper has changed (boolean)
        const helperHasChanged = compareHelper(
          selectedDispatch.extendedProps,
          updatedDispatch
        );
        const leadHasChanged = compareLead(
          selectedDispatch.extendedProps,
          updatedDispatch
        );

        if (helperHasChanged === false) {
          console.log("helper has not changed");
        } else {
          console.log("helper has changed");
          //what has the techHelper changed to?
          if (updatedDispatch.techHelper === "NONE") {
            console.log("techHelper === NONE");
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              //TODO: is the original dispatch getting updated here? or maybe its not possible to have this situation?
              console.log(
                "techHelper changed to NONE but there is no second dispatch to delete"
              );
            } else {
              console.log(
                "techHelper changed to NONE and there is a second dispatch to delete"
              );
              const eventToDelete = {
                id: selectedDispatch.extendedProps.techHelperId,
              };
              deleteEventStart(eventToDelete);
              const eventWithNoTechHelperId = { ...updatedDispatch };
              eventWithNoTechHelperId.techHelperId = "";
              const changedEvent = finalUpdate(eventWithNoTechHelperId);
              updateEventStart(changedEvent);
              updateDispatchSuccessIndicator();
              closeSelectedDispatchModal();
            }
          } else {
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              console.log(
                "techHelper changed to another tech but there is no second dispatch to change"
              );
              let newEvent = { ...updatedDispatch };
              const docForId = firebase.firestore().collection("events").doc();
              const generatedId = docForId.id;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.id = generatedId;
              newEvent.techHelperId = selectedDispatch.id;
              const eventToUpdate = finalUpdate(newEvent);
              addEventStart(eventToUpdate);

              const originalEvent = { ...updatedDispatch };
              originalEvent.techHelperId = generatedId;
              const originalEventToUpdate = finalUpdate(originalEvent);
              updateEventStart(originalEventToUpdate);
              updateDispatchSuccessIndicator();
              closeSelectedDispatchModal();
            } else {
              console.log(
                "techHelper changed to another tech and there is a second dispatch",
                selectedDispatch.extendedProps.techHelperId
              );
              const firstEventToUpdate = finalUpdate(updatedDispatch);
              updateEventStart(firstEventToUpdate);
              let newEvent = { ...updatedDispatch };
              newEvent.id = updatedDispatch.techHelperId;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techHelperId = updatedDispatch.id;
              const secondEventToUpdate = finalUpdate(newEvent);
              updateEventStart(secondEventToUpdate);
              updateDispatchSuccessIndicator();
              closeSelectedDispatchModal();
            }
          }
        }

        if (leadHasChanged === false) {
          console.log("lead has not changed");
        } else {
          console.log("lead has changed");
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateEventStart(eventToUpdate);
          updateDispatchSuccessIndicator();
          closeSelectedDispatchModal();
          if (
            selectedDispatch.extendedProps.techHelperId === "" ||
            selectedDispatch.extendedProps.techHelperId === undefined
          ) {
            console.log(
              "techLead has changed but there is no techHelper event to update"
            );
          } else {
            console.log(
              "techLead has changed and there is a techHelper event to change"
            );

            let newEvent = { ...updatedDispatch };
            newEvent.id = updatedDispatch.techHelperId;
            newEvent.techLead = updatedDispatch.techHelper;
            newEvent.techHelper = updatedDispatch.techLead;
            newEvent.techHelperId = updatedDispatch.id;
            const eventToUpdate = finalUpdate(newEvent);
            console.log("eventToUpdate: ", eventToUpdate);
            updateEventStart(eventToUpdate);
            updateDispatchSuccessIndicator();
            closeSelectedDispatchModal();
          }
        }
      }
    }
  };

  const routeToPrintOne = () => {
    const dispatchToPush = {
      altphone,
      altPhoneName,
      city,
      customerId,
      dateCreated,
      dateModified,
      dateScheduled,
      end,
      firstname,
      id,
      issue,
      jobNumber,
      lastname,
      leadSource,
      notes,
      payment,
      phone,
      phoneName,
      scheduledDate,
      shorthand,
      start,
      status,
      street,
      takenBy,
      techHelper,
      techHelperId,
      techLead,
      timeAlotted,
      timeOfDay,
      title,
    };
    history.push({
      pathname: "/PrintOneSlip",
      state: { dispatch: dispatchToPush },
    });
  };

  // const handleMultiTechHelperSelect = (event) => {
  //   const { value } = event.target;
  //   let techsAssisting = [];
  //   value.forEach((item) => {
  //     if (item === "NONE") {
  //       techsAssisting = ["NONE"];
  //     } else {
  //       if (value.includes("NONE")) {
  //         const removeIndex = value.forEach((none) => {
  //           none.indexOf("NONE");
  //         });
  //         ~removeIndex && techsAssisting.splice(removeIndex, 1);
  //       }
  //       techsAssisting.push(item);
  //     }
  //   });
  //   setDispatch({ ...dispatch, techHelper: techsAssisting });
  // };

  const handleIssueChange = (event) => {
    const { value } = event.target;
    setIssue(value);
    const option = workList.workList.filter((i) => value.includes(i.item));
    option.map((work) => work.item === value && setShorthand(work.shorthand));
  };

  return (
    <Modal
      aria-labelledby="selected-dispatch-modal"
      aria-describedby="selected-dispatch-modal-form"
      open={isSelectedDispatchModalOpen}
      onClose={closeSelectedDispatchModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 350 }}
    >
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom className={classes.title}>
          {`${lastname}`} Dispatch
          {
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => routeToPrintOne()}
              color="inherit"
            >
              <PrintIcon fontSize="large" />
            </IconButton>
          }
        </Typography>
        <form onSubmit={onSubmit} autoComplete="new password">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="MM/dd/yyyy"
                  id="start"
                  label="Scheduled Date"
                  value={start}
                  onChange={(date) => setStart(date)}
                  inputProps={{ tabIndex: "1" }}
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Lead Source"
                value={leadSource}
                fullWidth
                onChange={(event) => setLeadSource(event.target.value)}
                inputProps={{ tabIndex: "2" }}
              />
            </Grid>
            <Grid item xs={4}>
              {isDispatchersLoaded && (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="dispatcher-select-label">
                    Dispatcher
                  </InputLabel>
                  <Select
                    labelId="dispatcher-select-label"
                    id="dispatcher-select"
                    value={takenBy}
                    onChange={(event) => setTakenBy(event.target.value)}
                    inputProps={{ tabIndex: "3" }}
                  >
                    <MenuItem value="Carol">Carol</MenuItem>
                    <MenuItem value="Sophia">Sophia</MenuItem>
                    {dispatchers.dispatchers &&
                      dispatchers.dispatchers
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((dispatcher) => (
                          <MenuItem key={dispatcher.id} value={dispatcher.name}>
                            {dispatcher.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                inputProps={{ tabIndex: "4" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                inputProps={{ tabIndex: "5" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Job Address"
                fullWidth
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                inputProps={{ tabIndex: "6" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City, State, Zip Code"
                fullWidth
                value={city}
                onChange={(event) => setCity(event.target.value)}
                inputProps={{ tabIndex: "7" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Primary Contact"
                fullWidth
                value={phoneName}
                onChange={(event) => setPhoneName(event.target.value)}
                inputProps={{ tabIndex: "8" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Alternate Contact"
                fullWidth
                value={altPhoneName}
                onChange={(event) => setAltPhoneName(event.target.value)}
                inputProps={{ tabIndex: "10" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Primary Phone Number"
                fullWidth
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                inputProps={{ tabIndex: "9" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Alternate Phone Number"
                fullWidth
                value={altphone}
                onChange={(event) => setAltPhone(event.target.value)}
                inputProps={{ tabIndex: "11" }}
              />
            </Grid>
            <Grid item xs={6}>
              {isWorkListLoaded && (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="work_ordered-select-label">
                    Work Ordered
                  </InputLabel>
                  <Select
                    labelId="work-ordered-select-label"
                    id="work-ordered-select"
                    value={issue}
                    onChange={handleIssueChange}
                    inputProps={{ tabIndex: "12" }}
                    required
                  >
                    {workList.workList &&
                      workList.workList
                        .sort((a, b) => a.item.localeCompare(b.item))
                        .map((issue) => (
                          <MenuItem key={issue.id} value={issue.item}>
                            {issue.item}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Slotted Time"
                fullWidth
                value={timeAlotted}
                onChange={(event) => setTimeAlotted(event.target.value)}
                inputProps={{ tabIndex: "13" }}
              />
            </Grid>
            <Grid item xs={4}>
              {isTechniciansLoaded && (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tech-lead-select-label">Tech Lead</InputLabel>
                  <Select
                    labelId="tech-lead-select-label"
                    id="tech-lead-select"
                    value={techLead}
                    onChange={(event) => setTechLead(event.target.value)}
                    inputProps={{ tabIndex: "14" }}
                    required
                  >
                    {technicians.technicians &&
                      technicians.technicians
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((technician) => (
                          <MenuItem key={technician.id} value={technician.name}>
                            {technician.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={4}>
              {isTechniciansLoaded && Array.isArray(techHelper) ? (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tech-helper-select-label">
                    Tech Helper
                  </InputLabel>
                  <Select
                    labelId="tech-helper-select-label"
                    id="tech-helper-select"
                    multiple
                    value={techHelper}
                    onChange={(event) => setTechHelper(event.target.value)}
                    input={<Input />}
                    renderValue={(techHelper) => techHelper.join(", ")}
                    inputProps={{ tabIndex: "15" }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={"NONE"}>
                      <Checkbox checked={techHelper.indexOf("NONE") > -1} />
                      <ListItemText primary={"NONE"} />
                    </MenuItem>
                    {technicians.technicians &&
                      technicians.technicians
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((technician) => (
                          <MenuItem key={technician.id} value={technician.name}>
                            <Checkbox
                              checked={techHelper.indexOf(technician.name) > -1}
                            />
                            <ListItemText primary={technician.name} />
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tech-helper-select-label">
                    Tech Helper
                  </InputLabel>
                  <Select
                    labelId="tech-helper-select-label"
                    id="tech-helper-select"
                    value={techHelper}
                    onChange={(event) => setTechHelper(event.target.value)}
                    inputProps={{ tabIndex: "15" }}
                  >
                    <MenuItem value={"NONE"}>NONE</MenuItem>
                    {technicians.technicians &&
                      technicians.technicians
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((technician) => (
                          <MenuItem key={technician.id} value={technician.name}>
                            {technician.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={4}>
              {isPaymentsLoaded && (
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="payment-select-label">Payment</InputLabel>
                  <Select
                    labelId="payment-select-label"
                    id="payment-select"
                    value={payment}
                    onChange={(event) => setPayment(event.target.value)}
                    inputProps={{ tabIndex: "16" }}
                    required
                  >
                    {payments.payments &&
                      payments.payments
                        .sort((a, b) => a.item.localeCompare(b.item))
                        .map((payment) => (
                          <MenuItem key={payment.id} value={payment.item}>
                            {payment.item}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                inputProps={{ tabIndex: "17" }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="time-of-day-select-label">
                  Time Of Day
                </InputLabel>
                <Select
                  labelId="time-of-day-select-label"
                  id="time-of-day-select"
                  value={timeOfDay}
                  onChange={(event) => setTimeOfDay(event.target.value)}
                  inputProps={{ tabIndex: "18" }}
                  required
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="Anytime">Anytime</MenuItem>
                  <MenuItem value="First Call">First Call</MenuItem>
                  <MenuItem value="Last Call">Last Call</MenuItem>
                  <MenuItem value="overtime">Overtime</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Job Number"
                fullWidth
                value={jobNumber}
                onChange={(event) => setJobNumber(event.target.value)}
                inputProps={{ tabIndex: "19" }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
          >
            <Button
              className={classes.redButton}
              variant="contained"
              tabIndex="20"
              type="button"
              onClick={() => openDeleteDispatchModal()}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              className={classes.orangeButton}
              variant="contained"
              tabIndex="21"
              type="button"
              onClick={() => onSubmit()}
              startIcon={<ArrowUpwardIcon />}
            >
              Submit Changes
            </Button>
            <Button
              className={classes.greenButton}
              variant="contained"
              tabIndex="22"
              onClick={() => closeSelectedDispatchModal()}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isDispatchersLoaded: selectIsDispatcherLoaded,
  dispatchers: selectDispatchersList,
  isWorkListLoaded: selectIsWorkListLoaded,
  workList: selectWorkList,
  isPaymentsLoaded: selectIsPaymentsLoaded,
  payments: selectPaymentList,
  isTechniciansLoaded: selectIsTechniciansLoaded,
  technicians: selectTechnicianList,
});

const mapDispatchToProps = (dispatch) => ({
  updateEventStart: (event) => dispatch(updateEventStart(event)),
  addEventStart: (event) => dispatch(addEventStart(event)),
  deleteEventStart: (event) => dispatch(deleteEventStart(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDispatch);
