import React from "react";

import { connect } from "react-redux";
import { updateEventStart } from "../../../redux/events/event.actions";

import { finalUpdate } from "../../../utils/scheduleUtils";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
  textField: {
    paddingTop: "3px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditDispatch = ({
  isEditDispatchModalOpen,
  closeEditDispatchModal,
  selectedDispatch,
  editDispatchSuccessIndicator,
  updateEventStart,
  dispatchToUpdate,
}) => {
  const classes = useStyles();

  const updateTheSelectedDispatch = () => {
    console.log("Updating the selectedDisaptch only", dispatchToUpdate);
    const finalDispatch = finalUpdate(dispatchToUpdate);
    console.log("finalDispatch: ", finalDispatch);
    updateEventStart(finalDispatch);
    editDispatchSuccessIndicator();
    closeEditDispatchModal();
  };

  const updateBothDispatchs = () => {
    console.log("Updating both dispatches", dispatchToUpdate);

    editDispatchSuccessIndicator();
    closeEditDispatchModal();
  };

  return (
    <Modal
      aria-labelledby="delete-dispatch-modal"
      aria-describedby="delete-dispatch-modal-form"
      open={isEditDispatchModalOpen}
      onClose={closeEditDispatchModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditDispatchModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Update the assisting technicians dispatch?
          </Typography>

          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
          >
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
              onClick={() => updateTheSelectedDispatch()}
            >
              Update this dispatch only
            </Button>
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
              onClick={() => updateBothDispatchs()}
            >
              Update Both Dispatches
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeEditDispatchModal()}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateEventStart: (event) => dispatch(updateEventStart(event)),
});

export default connect(null, mapDispatchToProps)(EditDispatch);
