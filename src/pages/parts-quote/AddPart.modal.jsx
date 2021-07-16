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
}));

const AddPart = ({
  isAddPartModalOpen,
  closeAddPartModal,
  addPartToPartsList,
}) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [contact, setContact] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [inStock, setInStock] = useState("");
  const [cost, setCost] = useState(0.0);
  const [markUp, setMarkUp] = useState(1.75);

  const onSubmitNewPart = (e) => {
    e.preventDefault();
    const newPart = {
      quantity,
      description,
      partNumber,
      vendor,
      contact,
      contactPhone,
      inStock,
      cost,
      markUp,
    };
    console.log(newPart);
    addPartToPartsList(newPart);
  };

  return (
    <Modal
      aria-labelledby="add-new-part-modal"
      aria-describedby="add-new-part-modal-form"
      open={isAddPartModalOpen}
      onClose={closeAddPartModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddPartModalOpen}>
        <div className={classes.paper}>
          <form onSubmit={onSubmitNewPart}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  Add Parts and Material
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vendor Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vendor Phone Number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
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
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
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
                  value={markUp}
                  onChange={(e) => setMarkUp(e.target.value)}
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
              justify="flex-end"
              direction="row"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<ArrowUpwardIcon />}
              >
                Add
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => closeAddPartModal()}
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

export default AddPart;

// <TextField
// label="Part Cost"
// value={cost}
// onChange={(e) => setCost(e.target.value)}
// inputProps={{ tabIndex: "8" }}
// margin="normal"
// fullWidth
// startAdornment={
//   <InputAdornment position="start">$</InputAdornment>
//}
// />
