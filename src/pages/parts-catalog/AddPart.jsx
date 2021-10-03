import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsTabsLoaded,
  selectTabsList,
} from "../../redux/tabs/tab.selectors";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
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
    width: 600,
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
  select: {
    maxHeight: "400px",
  },
}));

const AddPart = ({
  isAddPartModalOpen,
  closeAddPartModal,
  addPartsStart,
  isTabsLoaded,
  tabs,
}) => {
  const classes = useStyles();

  const [category, setCategory] = useState("Service");
  const crossReference = [];
  const [partCost, setPartCost] = useState(0.0);
  const partDataDate = new Date().toLocaleString();
  const [partDataServicer, setPartDataServicer] = useState("");
  const [partDescription, setPartDescription] = useState("");
  const [partLabor, setPartLabor] = useState(0.0);
  const [partNotes, setPartNotes] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [partVendor, setPartVendor] = useState("Carrier");
  const url = "";

  const onSubmit = (e) => {
    e.preventDefault();
    const newPart = {
      category,
      crossReference,
      partCost,
      partDataDate,
      partDataServicer,
      partDescription,
      partLabor,
      partNotes,
      partNumber,
      partVendor,
      url,
    };
    console.log(newPart);
    addPartsStart(newPart);
    closeAddPartModal();
  };

  const onPartCostChange = (event) => {
    const cost = Number(event.target.value.replace(/[^0-9]+/g, ""));
    setPartCost(cost);
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
          <Typography variant="h5" gutterBottom className={classes.title}>
            Add New Part
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="category-select-label">Tab</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    required
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    inputProps={{ tabIndex: "1" }}
                    MenuProps={{ classes: { paper: classes.select } }}
                  >
                    {isTabsLoaded &&
                      tabs.tabs
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((tab, index) => (
                          <MenuItem key={tab.id} value={tab.name}>
                            {tab.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="part_number"
                  label="Part Number"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="part_data_servicer"
                  label="Initials"
                  value={partDataServicer}
                  onChange={(e) => setPartDataServicer(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="part_description"
                  label="Part Description"
                  value={partDescription}
                  onChange={(e) => setPartDescription(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="part_vendor"
                  label="Part Vendor"
                  value={partVendor}
                  onChange={(e) => setPartVendor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Part Cost"
                  type="number"
                  onChange={(e) => onPartCostChange(e)}
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
              <Grid item xs={4}>
                <TextField
                  id="part_labor"
                  label="Part Labor"
                  value={partLabor}
                  onChange={(e) => setPartLabor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="part_notes"
                  label="Part Notes"
                  value={partNotes}
                  onChange={(e) => setPartNotes(e.target.value)}
                  fullWidth
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
                onClick={() => closeAddPartModal()}
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

const mapStateToProps = createStructuredSelector({
  isTabsLoaded: selectIsTabsLoaded,
  tabs: selectTabsList,
});

export default connect(mapStateToProps)(AddPart);
