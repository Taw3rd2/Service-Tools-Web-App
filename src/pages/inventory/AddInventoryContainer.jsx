import React, { useState } from "react";

import BasicModal from "../../components/basicComponents/BasicModal";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const AddInventoryContainer = ({
  isAddInventoryContainerModalOpen,
  closeAddInventoryContainerModal,
  addInventoryContainerStart,
}) => {
  const classes = useStyles();

  const [containerName, setContainerName] = useState("");

  const onSubmit = () => {
    const partsList = [];
    const partsNeeded = [];
    const newInventoryContainer = {
      partsList,
      partsNeeded,
      containerName,
    };
    console.log("new inventory container: ", newInventoryContainer);
    addInventoryContainerStart(newInventoryContainer);
    closeAddInventoryContainerModal();
  };

  const modalBody = (
    <>
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
      </form>
    </>
  );

  const additionalButtons = (
    <Button
      size="large"
      color="primary"
      variant="contained"
      onClick={() => onSubmit()}
      className={classes.button}
      startIcon={<ArrowUpwardIcon />}
    >
      Submit
    </Button>
  );

  return (
    <BasicModal
      isModalOpen={isAddInventoryContainerModalOpen}
      closeModal={closeAddInventoryContainerModal}
      modalTitle="Add Inventory Container"
      modalBody={modalBody}
      additionalButtons={additionalButtons}
    />
  );
};

export default AddInventoryContainer;
