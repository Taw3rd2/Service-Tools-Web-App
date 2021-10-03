import React from "react";
import firebase from "firebase/app";
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
    margin: theme.spacing(1),
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

const DeleteEquipment = ({
  isDeleteEquipmentModalOpen,
  closeDeleteEquipmentModal,
  closeEquipmentDetailsModal,
  equipmentSelected,
  deleteEquipmentSuccessIndicator,
}) => {
  const classes = useStyles();

  const onEquipmentDelete = () => {
    firebase
      .firestore()
      .collection("customers")
      .doc(`${equipmentSelected.customerId}`)
      .collection("Equipment")
      .doc(`${equipmentSelected.equipmentName}`)
      .delete()
      .then(() => {
        deleteEquipmentSuccessIndicator();
        closeDeleteEquipmentModal();
        closeEquipmentDetailsModal();
      });
  };

  return (
    <Modal
      aria-labelledby="delete-equipment-modal"
      aria-describedby="delete-equipment-modal-form"
      open={isDeleteEquipmentModalOpen}
      onClose={closeDeleteEquipmentModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteEquipmentModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {`Delete ${equipmentSelected.equipmentName}?`}
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
              onClick={() => onEquipmentDelete()}
            >
              Delete
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeDeleteEquipmentModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteEquipment;
