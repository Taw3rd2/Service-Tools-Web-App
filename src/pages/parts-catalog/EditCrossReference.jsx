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
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
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
}));

const EditCrossReference = ({
  isEditCrossReferenceModalOpen,
  closeEditCrossReferenceModal,
  updatePartsStart,
  partSelected,
  editCrossReferencePartIndex,
}) => {
  const classes = useStyles();

  const onBaseCostLoad = (number) => {
    const stringifiedNumber = parseFloat(number / 100).toFixed(2);
    return stringifiedNumber;
  };

  const partReference =
    partSelected.crossReference[editCrossReferencePartIndex];

  const id = partReference.id;
  const [partNumber, setPartNumber] = useState(partReference.partNumber);
  const [partVendor, setPartVendor] = useState(partReference.partVendor);
  const [partCost, setPartCost] = useState(
    onBaseCostLoad(partReference.partCost)
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedCrossReference = {
      id,
      partNumber,
      partVendor,
      partCost: Number(partCost.replace(/[^0-9]+/g, "")),
      partDataDate: new Date().toLocaleDateString(),
    };

    partSelected.crossReference.splice(editCrossReferencePartIndex, 1);
    partSelected.crossReference.push(updatedCrossReference);
    updatePartsStart(partSelected);
    closeEditCrossReferenceModal();
  };

  return (
    <Modal
      aria-labelledby="edit-cross-reference-modal"
      aria-describedby="edit-cross-reference-modal-form"
      open={isEditCrossReferenceModalOpen}
      onClose={closeEditCrossReferenceModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditCrossReferenceModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Edit Cross Reference
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="part_number"
                  label="Part Number"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="part_vendor"
                  label="Part Vendor"
                  value={partVendor}
                  onChange={(e) => setPartVendor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Part Cost"
                  value={partCost}
                  onChange={(e) => setPartCost(e.target.value)}
                  inputProps={{
                    step: 0.01,
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
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
                onClick={() => closeEditCrossReferenceModal()}
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

export default EditCrossReference;
