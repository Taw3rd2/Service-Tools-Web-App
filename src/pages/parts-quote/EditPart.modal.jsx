import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  title: {
    color: "teal",
  },
  formControl: {
    minWidth: 120,
  },
  margin: {
    marginTop: theme.spacing(2),
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

const EditPart = ({
  isEditPartModalOpen,
  closeEditPartModal,
  openDeletePartModal,
  updatePartInTheList,
  part,
}) => {
  const classes = useStyles();

  const index = part.index;
  const [quantity, setQuantity] = useState(part.quantity ? part.quantity : 0);
  const [partDescription, setPartDescription] = useState(
    part.partDescription ? part.partDescription : ""
  );
  const [partNumber, setPartNumber] = useState(
    part.partNumber ? part.partNumber : ""
  );
  const [partVendor, setPartVendor] = useState(
    part.partVendor ? part.partVendor : ""
  );
  const [vendorContact, setVendorContact] = useState(
    part.vendorContact ? part.vendorContact : ""
  );
  const [vendorContactPhone, setVendorContactPhone] = useState(
    part.vendorContactPhone ? part.vendorContactPhone : ""
  );
  const [inStock, setInStock] = useState(part.inStock ? part.inStock : "");
  const [partCost, setPartCost] = useState(part.partCost ? part.partCost : 0.0);
  const [partMarkUp, setPartMarkUp] = useState(
    part.partMarkUp ? part.partMarkUp : 1.75
  );

  const onSubmitEditPart = (e) => {
    e.preventDefault();
    const updatedPart = {
      quantity,
      partDescription,
      partNumber,
      partVendor,
      vendorContact,
      vendorContactPhone,
      inStock,
      partCost,
      partMarkUp,
      index,
    };
    updatePartInTheList(updatedPart);
    closeEditPartModal();
  };

  return (
    <Modal
      aria-labelledby="edit-part-modal"
      aria-describedby="edit-part-modal-form"
      open={isEditPartModalOpen}
      onClose={closeEditPartModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditPartModalOpen}>
        <div className={classes.paper}>
          <form onSubmit={onSubmitEditPart}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  Edit Part or Material
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description"
                  value={partDescription}
                  onChange={(e) => setPartDescription(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Part Number"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vendor"
                  value={partVendor}
                  onChange={(e) => setPartVendor(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vendor Contact"
                  value={vendorContact}
                  onChange={(e) => setVendorContact(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vendor Phone Number"
                  value={vendorContactPhone}
                  onChange={(e) => setVendorContactPhone(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="In Stock?"
                  value={inStock}
                  type="tel"
                  onChange={(e) => setInStock(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth className={classes.margin}>
                  <InputLabel htmlFor="part-cost-input">Part Cost</InputLabel>
                  <Input
                    id="part-cost-input"
                    value={partCost}
                    onChange={(e) => setPartCost(e.target.value)}
                    fullWidth
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mark Up"
                  value={partMarkUp}
                  onChange={(e) => setPartMarkUp(e.target.value)}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
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
                type="button"
                color="primary"
                variant="contained"
                onClick={() => openDeletePartModal()}
                className={classes.redButton}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<ArrowUpwardIcon />}
              >
                Update
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => closeEditPartModal()}
                className={classes.button}
                startIcon={<CloseIcon />}
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

export default EditPart;
