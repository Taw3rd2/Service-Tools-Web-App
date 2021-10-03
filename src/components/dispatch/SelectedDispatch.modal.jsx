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
} from "../../redux/events/event.actions";

import {
  selectIsDispatcherLoaded,
  selectDispatchersList,
} from "../../redux/dispatchers/dispatcher.selectors";
import {
  selectIsWorkListLoaded,
  selectWorkList,
} from "../../redux/workList/workList.selectors";
import {
  selectIsPaymentsLoaded,
  selectPaymentList,
} from "../../redux/payments/payment.selectors";
import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../redux/technicians/technician.selectors";

import {
  compareEvents,
  compareHelper,
  compareLead,
  finalUpdate,
} from "../../utils/scheduleUtils";

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
import Fade from "@material-ui/core/Fade";
import { setDateToZeroHours } from "../../utils/dateUtils";
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

const SelectedDispatch = ({
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

  const customerId = selectedDispatch.customerId;
  const dateCreated = selectedDispatch.dateCreated;
  const id = selectedDispatch.id;
  const techHelperId = selectedDispatch.techHelperId
    ? selectedDispatch.techHelperId
    : "";
  const status = selectedDispatch.status;
  const dateScheduled = selectedDispatch.dateScheduled;
  const dateModified = selectedDispatch.dateModified;
  const scheduledDate = selectedDispatch.scheduledDate;
  const end = selectedDispatch.end;
  const title = selectedDispatch.title;

  const [start, setStart] = useState(
    selectedDispatch.start
      ? selectedDispatch.start
      : setDateToZeroHours(new Date())
  );
  const [leadSource, setLeadSource] = useState(
    selectedDispatch.leadSource ? selectedDispatch.leadSource : "PC"
  );
  const [takenBy, setTakenBy] = useState(
    selectedDispatch.takenBy ? selectedDispatch.takenBy : ""
  );
  const [firstname, setFirstname] = useState(
    selectedDispatch.firstname ? selectedDispatch.firstname : ""
  );
  const [lastname, setLastname] = useState(
    selectedDispatch.lastname ? selectedDispatch.lastname : ""
  );
  const [street, setStreet] = useState(
    selectedDispatch.street ? selectedDispatch.street : ""
  );
  const [city, setCity] = useState(
    selectedDispatch.city ? selectedDispatch.city : ""
  );
  const [phoneName, setPhoneName] = useState(
    selectedDispatch.phoneName ? selectedDispatch.phoneName : ""
  );
  const [altPhoneName, setAltPhoneName] = useState(
    selectedDispatch.altPhoneName ? selectedDispatch.altPhoneName : ""
  );
  const [phone, setPhone] = useState(
    selectedDispatch.phone ? selectedDispatch.phone : ""
  );
  const [altphone, setAltPhone] = useState(
    selectedDispatch.altphone ? selectedDispatch.altphone : ""
  );
  const [issue, setIssue] = useState(
    selectedDispatch.issue ? selectedDispatch.issue : ""
  );
  const [timeAlotted, setTimeAlotted] = useState(
    selectedDispatch.timeAlotted ? selectedDispatch.timeAlotted : "1.5"
  );
  const [techLead, setTechLead] = useState(
    selectedDispatch.techLead ? selectedDispatch.techLead : ""
  );
  const [techHelper, setTechHelper] = useState(
    selectedDispatch.techHelper ? selectedDispatch.techHelper : "NONE"
  );
  const [payment, setPayment] = useState(
    selectedDispatch.payment ? selectedDispatch.payment : "C.O.D."
  );
  const [notes, setNotes] = useState(
    selectedDispatch.notes ? selectedDispatch.notes : ""
  );
  const [timeOfDay, setTimeOfDay] = useState(
    selectedDispatch.timeOfDay ? selectedDispatch.timeOfDay : "Anytime"
  );
  const [jobNumber, setJobNumber] = useState(
    selectedDispatch.jobNumber ? selectedDispatch.jobNumber : ""
  );
  const [shorthand, setShorthand] = useState(
    selectedDispatch.shorthand ? selectedDispatch.shorthand : ""
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

      console.log("updatedDispatch", updatedDispatch);

      const noTechChange = compareEvents(selectedDispatch, updatedDispatch);
      if (noTechChange === true) {
        console.log("no tech change");
        if (
          selectedDispatch.techHelperId === "" ||
          selectedDispatch.techHelperId === undefined
        ) {
          console.log("there is no extra dispatch to change");
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateEventStart(eventToUpdate);
          updateDispatchSuccessIndicator();
          closeSelectedDispatchModal();
        } else {
          console.log("there is a extra dispatch to update");

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
      } else {
        console.log("techs have changed");
        const helperHasChanged = compareHelper(
          selectedDispatch,
          updatedDispatch
        );
        const leadHasChanged = compareLead(selectedDispatch, updatedDispatch);

        if (helperHasChanged === false) {
          console.log("helper has not changed");
        } else {
          console.log("helper has changed");
          if (updatedDispatch.techHelper === "NONE") {
            console.log("techHelper === NONE");
            if (
              selectedDispatch.techHelperId === "" ||
              selectedDispatch.techHelperId === undefined
            ) {
              console.log(
                "techHelper changed to NONE but there is no second dispatch to delete"
              );
            } else {
              console.log(
                "techHelper changed to NONE and there is a second dispatch to delete"
              );
              const eventToDelete = {
                id: selectedDispatch.techHelperId,
              };
              deleteEventStart(eventToDelete);
              // the techHelperId in the original event has to be changed to ""
              const eventWithNoTechHelperId = { ...updatedDispatch };
              eventWithNoTechHelperId.techHelperId = "";
              const changedEvent = finalUpdate(eventWithNoTechHelperId);
              updateEventStart(changedEvent);
              updateDispatchSuccessIndicator();
              closeSelectedDispatchModal();
            }
          } else {
            if (
              selectedDispatch.techHelperId === "" ||
              selectedDispatch.techHelperId === undefined
            ) {
              console.log(
                "techHelper changed to another tech but there is no dispatch to change"
              );
              // tech helper on the original event is not getting updated
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
                selectedDispatch.techHelperId
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
            selectedDispatch.techHelperId === "" ||
            selectedDispatch.techHelperId === undefined
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
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isSelectedDispatchModalOpen}>
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
                      {dispatchers.dispatchers &&
                        dispatchers.dispatchers
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((dispatcher) => (
                            <MenuItem
                              key={dispatcher.id}
                              value={dispatcher.name}
                            >
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
                    <InputLabel id="tech-lead-select-label">
                      Tech Lead
                    </InputLabel>
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
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
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
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
                              <Checkbox
                                checked={
                                  techHelper.indexOf(technician.name) > -1
                                }
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
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
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
              justify="flex-end"
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
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="20"
                type="button"
                onClick={() => onSubmit()}
                startIcon={<ArrowUpwardIcon />}
              >
                Submit
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="21"
                onClick={() => closeSelectedDispatchModal()}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedDispatch);
