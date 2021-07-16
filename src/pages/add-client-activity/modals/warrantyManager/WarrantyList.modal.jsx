import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../../../utils/dateUtils";

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
  { id: "jobNumber", label: "Job Number", minwidth: 150 },
  { id: "equipmentName", label: "Equipment Name", minwidth: 350 },
  { id: "startDate", label: "Start Date", minwidth: 150 },
  { id: "equipmentWarranty", label: "Parts Expiration Date", minwidth: 150 },
  { id: "equipmentLabor", label: "Labor Expiration Date", minwidth: 150 },
  { id: "details", label: "", minwidth: 100 },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    width: "50%",
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

const WarrantyList = ({
  isWarrantyListModalOpen,
  closeWarrantyListModal,
  openAddNewWarrantyModal,
  openWarrantyDetailsModal,
  client,
}) => {
  const classes = useStyles();

  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .onSnapshot(
        (snapshot) => {
          let newWarranties = [];
          snapshot.forEach((doc) => {
            let warr = {
              key: "",
              equipment: "",
              equipmentName: "",
              equipmentBrand: "",
              equipmentModel: "",
              equipmentSerial: "",
              jobNumber: "",
              startDate: "",
              partsExpirationDate: "",
              laborExpirationDate: "",
            };
            let equipment = doc.data();
            if (typeof equipment.warranty != "undefined") {
              warr.key = equipment.warranty.key;
              warr.equipment = equipment.warranty.equipment;
              warr.equipmentBrand = equipment.warranty.equipmentBrand;
              warr.equipmentModel = equipment.warranty.equipmentModel;
              warr.equipmentSerial = equipment.warranty.equipmentSerial;
              warr.equipmentName = equipment.warranty.equipmentName;
              warr.jobNumber = equipment.warranty.jobNumber;
              warr.startDate = equipment.warranty.startDate;
              warr.partsExpirationDate = equipment.warranty.partsExpirationDate;
              warr.laborExpirationDate = equipment.warranty.laborExpirationDate;
              newWarranties.push(warr);
            }
          });
          setWarranties(newWarranties);
        },
        (error) => {
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, [client.id]);

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
      aria-labelledby="warranty-list-modal"
      aria-describedby="warranty-list-modal-form"
      open={isWarrantyListModalOpen}
      onClose={closeWarrantyListModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isWarrantyListModalOpen}>
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Warranty Manager
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="warranty list table">
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
                {warranties.map((warranty, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => openWarrantyDetailsModal(warranty)}
                  >
                    <StyledTableCell align="left">
                      {warranty.jobNumber}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {warranty.equipmentName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getFormattedDate(warranty.startDate)}
                    </StyledTableCell>
                    {getStyledTableCell(
                      getFormattedDate(warranty.partsExpirationDate)
                    )}
                    {getStyledTableCell(
                      getFormattedDate(warranty.laborExpirationDate)
                    )}
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
            <Button
              className={classes.button}
              onClick={() => openAddNewWarrantyModal()}
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Add New Warranty
            </Button>
            <Button
              className={classes.button}
              onClick={() => closeWarrantyListModal()}
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

export default WarrantyList;
