import React, { useState } from "react";
import firebase from "firebase/app";

import {
  Backdrop,
  Button,
  Fade,
  InputLabel,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { ArrowUpward, Close } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { getFormattedDate, getFormattedTime } from "../../../utils/dateUtils";

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
    padding: theme.spacing(2, 4, 3),
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

const ActivityDetails = ({
  isActivityDetailsModalOpen,
  closeActivityDetailsModal,
  id,
  activity,
}) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(
    activity.currentTime ? activity.currentTime : new Date()
  );
  const [details, setDetails] = useState(
    activity.details ? activity.details : ""
  );
  const [operator, setOperator] = useState(
    activity.operator ? activity.operator : ""
  );
  const [type, setType] = useState(activity.type ? activity.type : "");

  const onSubmit = (e) => {
    e.preventDefault();
    const newActivityDetails = {
      currentTime: currentTime,
      details,
      operator,
      type,
      id: activity.activityId,
    };
    console.log("activity", activity);
    console.log("newActvity: ", newActivityDetails);
    firebase
      .firestore()
      .collection("customers")
      .doc(`${id}`)
      .collection("Activity")
      .doc(`${activity.activityId}`)
      .update(newActivityDetails)
      .then(() => {
        console.log(" the deed is done..");
        closeActivityDetailsModal();
      });
  };

  return (
    <Modal
      aria-labelledby="activity-details-modal"
      aria-describedby="activity-details-modal-form"
      open={isActivityDetailsModalOpen}
      onClose={closeActivityDetailsModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isActivityDetailsModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Edit Note
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
                <TextField
                  label="Dispatcher Name"
                  value={operator}
                  fullWidth
                  onChange={(event) => setOperator(event.target.value)}
                  inputProps={{ tabIndex: "2" }}
                />
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
                  value={getFormattedDate(currentTime)}
                  fullWidth
                  onChange={(event) => setCurrentTime(event.target.value)}
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
              justifyContent="flex-end"
              direction="row"
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="20"
                type="submit"
                startIcon={<ArrowUpward />}
              >
                Update
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="21"
                startIcon={<Close />}
                onClick={() => closeActivityDetailsModal()}
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

export default ActivityDetails;
