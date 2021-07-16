import React from "react";

import BasicModal from "../basicComponents/BasicModal";

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

const BasicDeleteModal = ({
  isDeleteModalOpen,
  closeDeleteModal,
  closeEditModal,
  deleteItemStart,
  modalTitleItemToDelete,
  itemToDelete,
}) => {
  const classes = useStyles();

  const onDelete = () => {
    deleteItemStart(itemToDelete);
    closeEditModal();
    closeDeleteModal();
  };

  const additionalButtons = (
    <Button
      size="large"
      color="primary"
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={() => onDelete()}
      className={classes.redButton}
    >
      Delete
    </Button>
  );

  return (
    <BasicModal
      isModalOpen={isDeleteModalOpen}
      closeModal={closeDeleteModal}
      modalTitle={`Delete ${modalTitleItemToDelete} ?`}
      additionalButtons={additionalButtons}
    />
  );
};

export default BasicDeleteModal;
