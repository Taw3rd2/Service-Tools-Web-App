import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  bodyText: {
    marginLeft: theme.spacing(2),
    color: "black",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const Completed = ({ isCompletedModalOpen, closeCompletedModal }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="completed-modal"
      aria-describedby="completed-modal-form"
      open={isCompletedModalOpen}
      onClose={closeCompletedModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isCompletedModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            This job has been marked Done, or Parts Needed.
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.bodyText}>
            This job is <strong>complete</strong> and can not be changed.
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.bodyText}>
            Maybe you should start a new job?
          </Typography>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeCompletedModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default Completed;
