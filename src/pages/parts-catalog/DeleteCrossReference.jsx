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

const DeleteCrossReference = ({
  isDeleteCrossReferenceModalOpen,
  closeDeleteCrossReferenceModal,
  updatePartsStart,
  partSelected,
  deleteCrossReferencePartIndex,
}) => {
  const classes = useStyles();

  const onCrossReferenceDelete = () => {
    partSelected.crossReference.splice(deleteCrossReferencePartIndex, 1);
    updatePartsStart(partSelected);
    closeDeleteCrossReferenceModal();
  };

  const additionalButtons = (
    <Button
      size="large"
      color="primary"
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={() => onCrossReferenceDelete()}
      className={classes.redButton}
    >
      Delete
    </Button>
  );

  return (
    <BasicModal
      isModalOpen={isDeleteCrossReferenceModalOpen}
      closeModal={closeDeleteCrossReferenceModal}
      modalTitle={`Delete Part Number: ${partSelected.crossReference[deleteCrossReferencePartIndex].partNumber} ?`}
      additionalButtons={additionalButtons}
    />
  );
};

export default DeleteCrossReference;
