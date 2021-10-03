import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
    padding: theme.spacing(2, 4, 3),
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
  activity,
}) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(
    activity.currentTime ? activity.currentTime : new Date()
  );
  const [date, setDate] = useState(activity.date ? activity.date : new Date());
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
      currentTime: activity.currentTime,
      date: activity.date,
      details,
      operator,
      type,
      id: activity.activityId,
    };
    console.dir(newActivityDetails);
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
          <h2>Activity Details</h2>
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
                    <MenuItem value={"Dispatch"}>Dispatch</MenuItem>
                    <MenuItem value={"Parts Quote"}>Parts Quote</MenuItem>
                    <MenuItem value={"Equipment Quote"}>
                      Equipment Quote
                    </MenuItem>
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
                  value={currentTime}
                  fullWidth
                  onChange={(event) => setCurrentTime(event.target.value)}
                  inputProps={{ tabIndex: "3" }}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  value={date}
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
                Update
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="21"
                startIcon={<CloseIcon />}
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
