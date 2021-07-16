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
    padding: theme.spacing(2, 4, 3),
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
}));

const DeleteWarranty = ({
  isDeleteWarrantyModalOpen,
  closeDeleteWarrantyModal,
  closeWarrantyDetailsModal,
  warrantySelected,
  client,
  deleteWarrantySuccessIndicator,
}) => {
  const classes = useStyles();

  const onWarrantyDelete = () => {
    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .doc(`${warrantySelected.equipmentName}`)
      .update({ equipmentWarranty: "", laborWarranty: "" })
      .then(() => {
        console.log("part one done");
      });
    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .doc(`${warrantySelected.equipmentName}`)
      .update({ warranty: firebase.firestore.FieldValue.delete() })
      .then(() => {
        console.log("part two done");
        deleteWarrantySuccessIndicator();
        closeDeleteWarrantyModal();
        closeWarrantyDetailsModal();
      });
  };

  return (
    <Modal
      aria-labelledby="delete-warranty-modal"
      aria-describedby="delete-warranty-modal-form"
      open={isDeleteWarrantyModalOpen}
      onClose={closeDeleteWarrantyModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteWarrantyModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            {`Delete ${warrantySelected.equipmentName} Warranty?`}
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
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => onWarrantyDelete()}
            >
              Delete
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeDeleteWarrantyModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteWarranty;
