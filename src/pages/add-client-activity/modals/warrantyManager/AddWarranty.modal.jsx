import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

import { getFormattedDate } from "../../../../utils/dateUtils";

import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 18,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

const columns = [
  { id: "number", label: "#", minWidth: 50, align: "left" },
  { id: "equipmentName", label: "Name", minWidth: 170, align: "left" },
  { id: "equipmentBrand", label: "Brand", minWidth: 170, align: "left" },
  { id: "equipmentModel", label: "Model", minWidth: 170, align: "left" },
  { id: "equipmentSerial", label: "Serial", minWidth: 170, align: "left" },
  { id: "add", label: "Add?", minWidth: 50, align: "left" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  requiredDisclaimer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
  },
}));

const AddNewWarranty = ({
  isAddNewWarrantyModalOpen,
  closeAddNewWarrantyModal,
  client,
  warrantyCreationSuccessIndicator,
}) => {
  const classes = useStyles();

  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const todaysDate = new Date();
  const defaultLaborWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const defaultPartsWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  );

  const [jobNumber, setJobNumber] = useState("");
  const [startDate, setStartDate] = useState(todaysDate);
  const [partsExpirationDate, setPartsExpirationDate] = useState(
    defaultPartsWarrantyExpiration
  );
  const [laborExpirationDate, setLaborExpirationDate] = useState(
    defaultLaborWarrantyExpiration
  );

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .onSnapshot((snapshot) => {
        let newEquipment = [];
        snapshot.forEach((doc) => {
          let equip = doc.data();
          newEquipment.push(equip);
        });
        setEquipment(newEquipment);
      });
    return () => unsubscribe();
  }, [client.id]);

  const submitNewWarranty = (e) => {
    e.preventDefault();
    if (selectedEquipment === undefined || selectedEquipment.length === 0) {
      console.log("No equipment selected");
    } else {
      Object.keys(selectedEquipment).forEach((item) => {
        let newWarr = {
          key: equipment[item].equipmentName,
          equipmentWarranty: getFormattedDate(partsExpirationDate),
          laborWarranty: getFormattedDate(laborExpirationDate),
          warranty: {
            key: equipment[item].equipmentName,
            jobNumber,
            startDate,
            partsExpirationDate,
            laborExpirationDate,
            equipment: equipment[item].equipmentName,
            equipmentName: equipment[item].equipmentName,
            equipmentBrand: equipment[item].equipmentBrand,
            equipmentModel: equipment[item].equipmentModel,
            equipmentSerial: equipment[item].equipmentSerial,
          },
        };
        firebase
          .firestore()
          .collection("customers")
          .doc(`${client.id}`)
          .collection("Equipment")
          .doc(`${equipment[item].equipmentName}`)
          .update(newWarr)
          .then(() => {
            closeAddNewWarrantyModal();
            warrantyCreationSuccessIndicator();
          });
      });
    }
  };

  const handleCheckChange = (name) => (event) => {
    setSelectedEquipment({
      ...selectedEquipment,
      [name]: event.target.checked,
    });
  };

  return (
    <Modal
      aria-labelledby="add-new-warranty-modal"
      aria-describedby="add-new-warranty-modal-form"
      open={isAddNewWarrantyModalOpen}
      onClose={closeAddNewWarrantyModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddNewWarrantyModalOpen} disableStrictModeCompat>
        <div className={classes.paper}>
          <form onSubmit={submitNewWarranty}>
            <Grid container spacing={2}>
              {equipment.length === 0 ? (
                <Grid item xs={12}>
                  <h3>There is no equipment to apply a warranty to.</h3>
                  <h3>Please add equipment, then attach the warranty.</h3>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Paper className={classes.root}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      className={classes.title}
                    >
                      Add New Warranty
                    </Typography>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="warranty starter table">
                        <TableHead>
                          <StyledTableRow>
                            {columns.map((column) => (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  backgroundColor: "white",
                                  color: "teal",
                                }}
                              >
                                {column.label}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {equipment.map((item, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="left">
                                {`${index + 1}.`}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.equipmentName}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.equipmentBrand}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.equipmentModel}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.equipmentSerial}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Checkbox
                                  checked={selectedEquipment.index}
                                  value={index}
                                  onChange={handleCheckChange(index)}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              )}
              <Grid item xs={6}>
                <TextField
                  label="Job Number"
                  value={jobNumber}
                  onChange={(e) => setJobNumber(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.calendar}
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="startDate"
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    inputProps={{ tabIndex: "2" }}
                    fullWidth
                    required
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="partsExpirationDate"
                    label="Parts Expiration Date"
                    value={partsExpirationDate}
                    onChange={(date) => setPartsExpirationDate(date)}
                    inputProps={{ tabIndex: "4" }}
                    fullWidth
                    required
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="laborExpirationDate"
                    label="Labor Expiration Date"
                    value={laborExpirationDate}
                    onChange={(date) => setLaborExpirationDate(date)}
                    inputProps={{ tabIndex: "5" }}
                    fullWidth
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
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
                Submit
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => closeAddNewWarrantyModal()}
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

export default AddNewWarranty;
