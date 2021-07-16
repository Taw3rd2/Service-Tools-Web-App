import React from "react";
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
  title: {
    marginBottom: theme.spacing(1),
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

const DeleteClient = ({
  isDeleteClientModalOpen,
  closeDeleteClientModal,
  removeClient,
  client,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="delete-client-modal"
      aria-describedby="delete-client-modal-form"
      open={isDeleteClientModalOpen}
      onClose={closeDeleteClientModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteClientModalOpen}>
        <div className={classes.paper}>
          {client.firstname ? (
            <Typography variant="h5" gutterBottom className={classes.title}>
              {`Delete ${client.firstname} ${client.lastname}?`}
            </Typography>
          ) : (
            <Typography variant="h5" gutterBottom className={classes.title}>
              {`Delete ${client.lastname}?`}
            </Typography>
          )}
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
              onClick={() => removeClient(client)}
            >
              Delete
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeDeleteClientModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteClient;
