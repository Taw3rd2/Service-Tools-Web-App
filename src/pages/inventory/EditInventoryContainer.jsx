import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  title: {
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  buttonRed: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
}));

const EditInventoryContainer = ({
  isEditInventoryContainerModalOpen,
  closeEditInventoryContainerModal,
  updateInventoryContainerStart,
  inventoryContainerSelected,
  openDeleteInventoryContainerModal,
}) => {
  const classes = useStyles();

  const [containerName, setContainerName] = useState(
    inventoryContainerSelected.containerName
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedInventoryContainer = {
      ...inventoryContainerSelected,
      containerName,
    };
    updateInventoryContainerStart(updatedInventoryContainer);
    closeEditInventoryContainerModal();
  };

  return (
    <Modal
      aria-labelledby="edit-inventory-container-modal"
      aria-describedby="edit-inventory-container-form"
      open={isEditInventoryContainerModalOpen}
      onClose={closeEditInventoryContainerModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditInventoryContainerModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Edit Inventory Container
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="container_name"
                  label="Container Name"
                  value={containerName}
                  onChange={(e) => setContainerName(e.target.value)}
                  fullWidth
                  required
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
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.buttonRed}
                startIcon={<DeleteIcon />}
                onClick={() => openDeleteInventoryContainerModal()}
              >
                Delete
              </Button>
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
                onClick={() => closeEditInventoryContainerModal()}
              >
                Close
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditInventoryContainer;
