import "date-fns";
import React, { useState } from "react";
import firebase from "firebase/app";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addEventStart } from "../../../redux/events/event.actions";

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

import { toCurrency } from "../../../utils/currencyUtils";

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
import { getUnixTime, addHours } from "date-fns";
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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const CreateDispatch = ({
  client,
  invoiceData,
  invoiceId,
  isCreateDispatchModalOpen,
  closeCreateDispatchModal,
  dispatchers,
  isDispatchersLoaded,
  workList,
  isWorkListLoaded,
  payments,
  isPaymentsLoaded,
  technicians,
  isTechniciansLoaded,
  addEventStart,
  dispatchCreationSuccessIndicator,
}) => {
  const classes = useStyles();

  const localInvoiceId = invoiceId !== undefined ? invoiceId : "";

  const [start, setStart] = useState(setDateToZeroHours(new Date()));
  const [leadSource, setLeadSource] = useState("PC");
  const [takenBy, setTakenBy] = useState("");
  const [firstname, setFirstName] = useState(
    client.firstname ? client.firstname : ""
  );
  const [lastname, setLastName] = useState(
    client.lastname ? client.lastname : ""
  );
  const [street, setStreet] = useState(client.street ? client.street : "");
  const [city, setCity] = useState(
    client.city ? `${client.city}, ${client.state} ${client.zip}` : ""
  );
  const [phoneName, setPhoneName] = useState(
    client.phoneName ? client.phoneName : ""
  );
  const [altPhoneName, setAltPhoneName] = useState(
    client.altPhoneName ? client.altPhoneName : ""
  );
  const [phone, setPhone] = useState(client.phone ? client.phone : "");
  const [altphone, setAltPhone] = useState(
    client.altphone ? client.altphone : ""
  );
  const [issue, setIssue] = useState("");
  const [shorthand, setShorthand] = useState("");
  const [timeAlotted, setTimeAlotted] = useState("1.5");
  const [techLead, setTechLead] = useState("");
  const [techHelper, setTechHelper] = useState("NONE");
  const [payment, setPayment] = useState("C.O.D.");
  const [notes, setNotes] = useState(
    invoiceData
      ? `Collect Balance Due: ${toCurrency(invoiceData.balanceDue.amount)}`
      : ""
  );
  const [timeOfDay, setTimeOfDay] = useState("Anytime");
  const [jobNumber, setJobNumber] = useState(
    invoiceData
      ? `${invoiceData.invoiceNumberPrefix}${invoiceData.userCreatedInvoiceNumber}`
      : ""
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const docForId = firebase.firestore().collection("events").doc();
    const techLeadGeneratedId = docForId.id;

    if (techHelper === "NONE") {
      const newDispatch = {
        id: techLeadGeneratedId,
        techHelperId: "",
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead,
        techHelper,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: client.id,
        invoiceId: localInvoiceId,
      };
      addEventStart(newDispatch);
      dispatchCreationSuccessIndicator();
      closeCreateDispatchModal();
    } else {
      const docForHelperId = firebase.firestore().collection("events").doc();
      const techHelperGeneratedId = docForHelperId.id;

      const newLeadDispatch = {
        id: techLeadGeneratedId,
        techHelperId: techHelperGeneratedId,
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead,
        techHelper,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: client.id,
        invoiceId: localInvoiceId,
      };

      const newHelperDispatch = {
        id: techHelperGeneratedId,
        techHelperId: techLeadGeneratedId,
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead: techHelper,
        techHelper: techLead,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: client.id,
        invoiceId: localInvoiceId,
      };

      addEventStart(newLeadDispatch);
      addEventStart(newHelperDispatch);
      console.log(newLeadDispatch);
      console.log(newHelperDispatch);
      dispatchCreationSuccessIndicator();
      closeCreateDispatchModal();
    }
  };

  // const handleMultiTechHelperSelect = (event) => {
  //   const { value } = event.target;
  //   let techsAssisting = [];
  //   value.forEach((item) => {
  //     if (item === "NONE") {
  //       techsAssisting = ["NONE"];
  //     } else {
  //       if (value.includes("NONE")) {
  //         const removeIndex = value.map((none) => {
  //           return none.indexOf("NONE");
  //         });
  //         ~removeIndex && techsAssisting.splice(removeIndex, 1);
  //       }
  //       techsAssisting.push(item);
  //     }
  //   });
  //   setTechHelper(techsAssisting);
  // };

  const handleIssueChange = (event) => {
    const { value } = event.target;
    setIssue(value);
    const option = workList.workList.filter((i) => value.includes(i.item));
    setShorthand(option[0].shorthand);
  };

  return (
    <Modal
      aria-labelledby="add-new-dispatch-modal"
      aria-describedby="add-new-dispatch-modal-form"
      open={isCreateDispatchModalOpen}
      onClose={closeCreateDispatchModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isCreateDispatchModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Create New Dispatch
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
                    required
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Lead Source"
                  value={leadSource}
                  fullWidth
                  required
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
                      required
                      value={takenBy}
                      onChange={(event) => setTakenBy(event.target.value)}
                      inputProps={{ tabIndex: "3" }}
                    >
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
                  onChange={(event) => setFirstName(event.target.value)}
                  inputProps={{ tabIndex: "4" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  value={lastname}
                  onChange={(event) => setLastName(event.target.value)}
                  inputProps={{ tabIndex: "5" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Job Address"
                  fullWidth
                  required
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
                      required
                      value={issue}
                      onChange={handleIssueChange}
                      inputProps={{ tabIndex: "12" }}
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
                      required
                      onChange={(event) => setTechLead(event.target.value)}
                      inputProps={{ tabIndex: "14" }}
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
                {isTechniciansLoaded && (
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="tech-helper-select-label">
                      Tech Helper
                    </InputLabel>
                    <Select
                      labelId="tech-helper-select-label"
                      id="tech-helper-select"
                      value={techHelper}
                      required
                      onChange={(event) => setTechHelper(event.target.value)}
                      inputProps={{ tabIndex: "15" }}
                    >
                      <MenuItem value={"NONE"}>None</MenuItem>
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
                      required
                      onChange={(event) => setPayment(event.target.value)}
                      inputProps={{ tabIndex: "16" }}
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
                  required
                  value={jobNumber}
                  onChange={(event) => setJobNumber(event.target.value)}
                  inputProps={{ tabIndex: "19" }}
                />
              </Grid>
              {invoiceId && (
                <Grid container item xs={4} justifyContent="center">
                  <Button color="secondary" variant="contained" type="button">
                    Invoice Attached
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="20"
                type="submit"
                startIcon={<ArrowUpwardIcon />}
              >
                Submit
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="21"
                onClick={() => closeCreateDispatchModal()}
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
  addEventStart: (event) => dispatch(addEventStart(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDispatch);
