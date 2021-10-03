import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
  title: {
    marginBottom: theme.spacing(1),
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

export const BasicModal = ({
  isModalOpen,
  closeModal,
  modalTitle,
  modalBody,
  additionalButtons,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="basic-modal"
      aria-describedby="basic-modal-form"
      open={isModalOpen}
      onClose={closeModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {modalTitle}
          </Typography>
          {modalBody}
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
          >
            {additionalButtons}
            <Button
              size="large"
              color="primary"
              variant="contained"
              startIcon={<CloseIcon />}
              onClick={() => closeModal()}
              className={classes.button}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default BasicModal;
