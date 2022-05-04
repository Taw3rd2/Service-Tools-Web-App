import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../../utils/dateUtils";

import EquipmentExport from "../../../components/exportToExcel/EquipmentExport";

import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

const StyledRedTableCell = withStyles((theme) => ({
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
    color: "red",
  },
}))(TableCell);

const StyledGreenTableCell = withStyles((theme) => ({
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
    color: "green",
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
  { id: "name", label: "Equipment Name", minwidth: 170 },
  { id: "brand", label: "Brand", minwidth: 170 },
  { id: "model", label: "Model", minwidth: 170 },
  { id: "serial", label: "Serial", minwidth: 170 },
  { id: "mexpire", label: "Maintenance Expiration", minwidth: 100 },
  { id: "pexpire", label: "Parts Expiration", minwidth: 100 },
  { id: "lexpire", label: "Labor Expiration", minwidth: 100 },
  { id: "details", label: "", minwidth: 100 },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    border: "1px solid black",
    width: "60%",
    padding: theme.spacing(1),
  },
  container: {
    maxHeight: 440,
  },
  title: {
    margin: theme.spacing(1),
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const EquipmentList = ({
  isEquipmentListModalOpen,
  closeEquipmentListModal,
  openEquipmentDetailsModal,
  openAddNewEquipmentModal,
  client,
}) => {
  const classes = useStyles();

  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("customers")
      .doc(client.id)
      .collection("Equipment")
      .onSnapshot(
        (snapshot) => {
          let newEquipment = [];
          snapshot.forEach((doc) => {
            let unit = doc.data();
            //maintenance ?
            if (unit.maintenance) {
              if (
                unit.maintenance.expirationDate === "" ||
                unit.maintenance.expirationDate === undefined
              ) {
                unit.maintenance.expirationDate = "n/a";
              } else {
                unit.maintenance.expirationDate = getFormattedDate(
                  unit.maintenance.expirationDate
                );
              }
              if (
                unit.maintenance.saleDate === "" ||
                unit.maintenance.saleDate === undefined
              ) {
                unit.maintenance.saleDate = "n/a";
              } else {
                unit.maintenance.saleDate = getFormattedDate(
                  unit.maintenance.saleDate
                );
              }
            }
            //warranty ?
            if (unit.warranty) {
              if (
                unit.warranty.startDate === "" ||
                unit.warranty.startDate === undefined
              ) {
                unit.warranty.startDate = "n/a";
              } else {
                unit.warranty.startDate = getFormattedDate(
                  unit.warranty.startDate
                );
              }
              if (
                unit.warranty.partsExpirationDate === "" ||
                unit.warranty.partsExpirationDate === undefined
              ) {
                unit.warranty.partsExpirationDate = "n/a";
              } else {
                unit.warranty.partsExpirationDate = getFormattedDate(
                  unit.warranty.partsExpirationDate
                );
              }
              if (
                unit.warranty.laborExpirationDate === "" ||
                unit.warranty.laborExpirationDate === undefined ||
                unit.warranty.laborExpirationDate === null
              ) {
                unit.warranty.laborExpirationDate = "n/a";
              } else {
                unit.warranty.laborExpirationDate = getFormattedDate(
                  unit.warranty.laborExpirationDate
                );
              }
            }
            newEquipment.push(unit);
          });
          setEquipment(newEquipment);
        },
        (error) => {
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, [client]);

  const getStyledTableCell = (stringValue) => {
    const dateValue = getDateFromString(stringValue);
    if (getUnixFromDate(dateValue) < getUnixFromDate(new Date())) {
      return (
        <StyledRedTableCell align="left">{stringValue}</StyledRedTableCell>
      );
    } else {
      return (
        <StyledGreenTableCell align="left">{stringValue}</StyledGreenTableCell>
      );
    }
  };

  return (
    <Modal
      aria-labelledby="equipment-list-modal"
      aria-describedby="equipment-list-modal-form"
      open={isEquipmentListModalOpen}
      onClose={closeEquipmentListModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEquipmentListModalOpen}>
        <Paper className={classes.root} variant="outlined">
          <Typography variant="h5" gutterBottom className={classes.title}>
            Equipment List
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="equipment list table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ backgroundColor: "white", color: "teal" }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {equipment.map((unit, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => openEquipmentDetailsModal(unit)}
                  >
                    <StyledTableCell align="left">
                      {unit.equipmentName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {unit.equipmentBrand}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {unit.equipmentModel}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {unit.equipmentSerial}
                    </StyledTableCell>
                    {getStyledTableCell(unit.equipmentContract)}
                    {getStyledTableCell(unit.equipmentWarranty)}
                    {getStyledTableCell(unit.laborWarranty)}
                    <StyledTableCell>
                      <Button variant="contained">Details</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <EquipmentExport client={client} equipment={equipment} />
            <Button
              className={classes.button}
              onClick={() => openAddNewEquipmentModal()}
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Add New Equipment
            </Button>
            <Button
              className={classes.button}
              onClick={() => closeEquipmentListModal()}
              variant="contained"
              color="primary"
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EquipmentList;
