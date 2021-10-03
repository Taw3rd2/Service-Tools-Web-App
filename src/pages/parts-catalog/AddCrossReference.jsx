import React, { useState } from "react";
import { firestore } from "../../firebase/firebase.utils";

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

export const AddCrossReference = ({
  isAddCrossReferenceModalOpen,
  closeAddCrossReferenceModal,
  updatePartsStart,
  partSelected,
}) => {
  const classes = useStyles();

  const [partNumber, setPartNumber] = useState("");
  const [partVendor, setPartVendor] = useState("");
  const [partCost, setPartCost] = useState(0.0);
  const partDataDate = new Date().toLocaleDateString();

  const onSubmit = (e) => {
    e.preventDefault();

    if (partSelected.crossReference === undefined) {
      partSelected.crossReference = [];
    }

    const docForId = firestore.collection("parts").doc();
    const generatedId = docForId.id;

    const newCrossReference = {
      id: generatedId,
      partNumber,
      partVendor,
      partCost,
      partDataDate,
    };
    partSelected.crossReference.push(newCrossReference);
    updatePartsStart(partSelected);
    closeAddCrossReferenceModal();
  };

  const onCostChange = (event) => {
    const cost = Number(event.target.value.replace(/[^0-9]+/g, ""));
    setPartCost(cost);
  };

  return (
    <Modal
      aria-labelledby="add-new-cross-reference-modal"
      aria-describedby="add-new-cross-reference-modal-form"
      open={isAddCrossReferenceModalOpen}
      onClose={closeAddCrossReferenceModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddCrossReferenceModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Add New Cross Reference
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
                  type="number"
                  onChange={(e) => onCostChange(e)}
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
              justify="flex-end"
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
                onClick={() => closeAddCrossReferenceModal()}
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

export default AddCrossReference;
