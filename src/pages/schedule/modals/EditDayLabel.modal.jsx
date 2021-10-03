import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { updateLabelStart } from "../../../redux/labels/label.actions";

import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../../redux/technicians/technician.selectors";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  text: {
    marginLeft: theme.spacing(1),
    color: "teal",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textView: {
    margin: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

const EditDayLabel = ({
  isEditDayLabelModalOpen,
  closeEditDayLabelModal,
  dayLabel,
  updateLabelStart,
  dateSelected,
  technicians,
  isTechniciansLoaded,
  editDayLabelSuccessIndicator,
}) => {
  const classes = useStyles();

  const labelDate = dateSelected;
  const [locationName, setLocationName] = useState(
    dayLabel.locationName ? dayLabel.locationName : ""
  );
  const [tech, setTech] = useState(dayLabel.tech ? dayLabel.tech : "");

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedLabel = {
      id: dayLabel.id,
      labelDate,
      locationName,
      tech,
    };
    console.log(updatedLabel);
    updateLabelStart(updatedLabel);
    editDayLabelSuccessIndicator();
    closeEditDayLabelModal();
  };

  return (
    <Modal
      aria-labelledby="edit-day-label-modal"
      aria-describedby="edit-day-label-modal-form"
      open={isEditDayLabelModalOpen}
      onClose={closeEditDayLabelModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditDayLabelModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Edit Day Label
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {isTechniciansLoaded && (
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="tech-lead-select-label">
                      Tech Lead
                    </InputLabel>
                    <Select
                      labelId="tech-lead-select-label"
                      id="tech-lead-select"
                      value={tech}
                      onChange={(event) => setTech(event.target.value)}
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
              <Grid item xs={6}>
                <TextField
                  id="locationName"
                  label="Location Name"
                  className={classes.textView}
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
              >
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<ArrowUpwardIcon />}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<CloseIcon />}
                  onClick={() => closeEditDayLabelModal()}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isTechniciansLoaded: selectIsTechniciansLoaded,
  technicians: selectTechnicianList,
});

const mapDispatchToProps = (dispatch) => ({
  updateLabelStart: (label) => dispatch(updateLabelStart(label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDayLabel);
