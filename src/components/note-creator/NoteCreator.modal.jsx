import React, { useState } from "react";
import firebase from "firebase/app";
import { getFormattedDate, getFormattedTime } from "../../utils/dateUtils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsDispatcherLoaded,
  selectDispatchersList,
} from "../../redux/dispatchers/dispatcher.selectors";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
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
  title: {
    marginBottom: theme.spacing(2),
    color: "teal",
  },
  formControl: {
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const NoteCreator = ({
  id,
  noteType,
  isNoteCreatorModalOpen,
  closeNoteCreatorModal,
  dispatchers,
  isDispatchersLoaded,
}) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [details, setDetails] = useState("");
  const [operator, setOperator] = useState("");
  const [type, setType] = useState(noteType ? noteType : "");

  const onSubmit = (event) => {
    event.preventDefault();
    const newActivityDetails = {
      currentTime,
      date: getFormattedDate(date),
      details,
      operator,
      type,
    };
    firebase
      .firestore()
      .collection("customers")
      .doc(`${id}`)
      .collection("Activity")
      .add(newActivityDetails)
      .then(() => {
        //set the alert the the note was recieved
        closeNoteCreatorModal();
      });
  };

  return (
    <Modal
      aria-labelledby="note-creation-modal"
      aria-describedby="note-creation-modal-form"
      open={isNoteCreatorModalOpen}
      onClose={closeNoteCreatorModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isNoteCreatorModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {noteType === "Note" ? "New Customer Note" : "New Phone Note"}
          </Typography>
          <form onSubmit={onSubmit} autoComplete="new password">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="activity-type-select-label">
                    Activity Type
                  </InputLabel>
                  <Select
                    labelId="activity-type-select-label"
                    id="activity-type-select"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    inputProps={{ tabIndex: "1" }}
                  >
                    <MenuItem value={"Phone"}>Phone</MenuItem>
                    <MenuItem value={"Note"}>Note</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                {isDispatchersLoaded && (
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="dispatcher-select-label">
                      Dispatcher
                    </InputLabel>
                    <Select
                      labelId="activity-dispatcher-label"
                      id="activity-dispatcher-select"
                      value={operator}
                      onChange={(event) => setOperator(event.target.value)}
                      inputProps={{ tabIndex: "2" }}
                      required
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
                  label="Time"
                  value={getFormattedTime(currentTime)}
                  fullWidth
                  onChange={(event) => setCurrentTime(event.target.value)}
                  inputProps={{ tabIndex: "3" }}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  value={getFormattedDate(date)}
                  fullWidth
                  onChange={(event) => setDate(event.target.value)}
                  inputProps={{ tabIndex: "4" }}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Details"
                  variant="outlined"
                  value={details}
                  fullWidth
                  onChange={(event) => setDetails(event.target.value)}
                  inputProps={{ tabIndex: "5" }}
                  multiline={true}
                  rows="5"
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
                startIcon={<CloseIcon />}
                onClick={() => closeNoteCreatorModal()}
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
});

export default connect(mapStateToProps)(NoteCreator);
