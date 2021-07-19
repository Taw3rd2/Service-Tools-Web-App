import React from "react";

import BasicModal from "../../components/basicComponents/BasicModal";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  redButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
}));

const DeleteInventoryContainer = ({
  isDeleteInventoryContainerModalOpen,
  closeDeleteInventoryContainerModal,
  closeEditInventoryContainerModal,
  deleteInventoryContainerStart,
  inventoryContainerSelected,
}) => {
  const classes = useStyles();

  const onDeleteInventoryContainer = () => {
    deleteInventoryContainerStart(inventoryContainerSelected);
    closeEditInventoryContainerModal();
    closeDeleteInventoryContainerModal();
  };

  const additionalButtons = (
    <Button
      size="large"
      color="primary"
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={() => onDeleteInventoryContainer()}
      className={classes.redButton}
    >
      Delete
    </Button>
  );

  return (
    <BasicModal
      isModalOpen={isDeleteInventoryContainerModalOpen}
      closeModal={closeDeleteInventoryContainerModal}
      modalTitle={`Delete ${inventoryContainerSelected.containerName} ?`}
      additionalButtons={additionalButtons}
    />
  );
};

export default DeleteInventoryContainer;
