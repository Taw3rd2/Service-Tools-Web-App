import React from "react";

import { connect } from "react-redux";
import {
  deleteEventStart,
  deleteTwoEventsStart,
  updateEventStart,
} from "../../../redux/events/event.actions";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
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
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  redButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
}));

const DeleteDispatch = ({
  isDeleteDispatchModalOpen,
  closeDeleteDispatchModal,
  closeSelectedDispatchModal,
  deleteEventStart,
  deleteTwoEventsStart,
  updateEventStart,
  selectedDispatch,
  deleteDispatchSuccessIndicator,
}) => {
  const classes = useStyles();

  const removeDispatch = () => {
    if (
      selectedDispatch.extendedProps.techHelperId === "" ||
      selectedDispatch.extendedProps.techHelperId === undefined
    ) {
      console.log("No second dispatch found to delete");
      deleteEventStart(selectedDispatch);
      deleteDispatchSuccessIndicator();
      closeDeleteDispatchModal();
      closeSelectedDispatchModal();
    } else {
      const dispatchToDelete = {
        id: selectedDispatch.id,
        techHelperId: selectedDispatch.extendedProps.techHelperId,
        lastname: selectedDispatch.extendedProps.lastname,
      };
      console.log("Found a second dispatch to delete");
      deleteTwoEventsStart(dispatchToDelete);
      deleteDispatchSuccessIndicator();
      closeDeleteDispatchModal();
      closeSelectedDispatchModal();
    }
  };

  if (
    selectedDispatch.techHelperId === "" ||
    selectedDispatch.techHelperId === undefined
  ) {
    return (
      <Modal
        aria-labelledby="delete-dispatch-modal"
        aria-describedby="delete-dispatch-modal-form"
        open={isDeleteDispatchModalOpen}
        onClose={closeDeleteDispatchModal}
        className={classes.modal}
        closeAfterTransition
        hideBackdrop={true}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteDispatchModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.text}>
              {`Delete ?`}
            </Typography>

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
                className={classes.redButton}
                startIcon={<DeleteIcon />}
                onClick={() => removeDispatch()}
              >
                Delete
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => closeDeleteDispatchModal()}
              >
                Close
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    );
  } else {
    return (
      <Modal
        aria-labelledby="delete-dispatch-modal"
        aria-describedby="delete-dispatch-modal-form"
        open={isDeleteDispatchModalOpen}
        onClose={closeDeleteDispatchModal}
        className={classes.modal}
        closeAfterTransition
        hideBackdrop={true}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteDispatchModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.text}>
              {`This dispatch has two technicians. Delete both or just this one?`}
            </Typography>

            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Button
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.redButton}
                startIcon={<DeleteIcon />}
                onClick={() => removeDispatch()}
              >
                Delete this dispatch
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => closeDeleteDispatchModal()}
              >
                Close
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  deleteEventStart: (event) => dispatch(deleteEventStart(event)),
  deleteTwoEventsStart: (event) => dispatch(deleteTwoEventsStart(event)),
  updateEventStart: (event) => dispatch(updateEventStart(event)),
});

export default connect(null, mapDispatchToProps)(DeleteDispatch);
