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
  { id: "mNumber", label: "Contract Number", minwidth: 150 },
  { id: "equipmentName", label: "Equipment Name", minwidth: 350 },
  { id: "saleDate", label: "Start Date", minwidth: 150 },
  { id: "salePrice", label: "Sale Price", minwidth: 150 },
  { id: "expirationDate", label: "Expiration Date", minwidth: 150 },
  { id: "completedDate", label: "Maintenance Completed", minwidth: 150 },
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

const MaintenanceList = ({
  isMaintenanceListModalOpen,
  closeMaintenanceListModal,
  openAddMaintenanceModal,
  openMaintenanceDetailsModal,
  client,
}) => {
  const classes = useStyles();

  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Maintenance")
      .onSnapshot(
        (snapshot) => {
          let maintnenanceList = [];
          snapshot.forEach((doc) => {
            let agreements = doc.data();
            maintnenanceList.push(agreements);
          });
          setMaintenance(maintnenanceList);
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

  const getCompletedStyleTableCell = (stringValue) => {
    if (stringValue === "Not done yet") {
      return (
        <StyledRedTableCell align="left">
          <strong>{stringValue}</strong>
        </StyledRedTableCell>
      );
    } else {
      return (
        <StyledGreenTableCell align="left">
          <strong>{stringValue}</strong>
        </StyledGreenTableCell>
      );
    }
  };

  return (
    <Modal
      aria-labelledby="maintenance-list-modal"
      aria-describedby="maintenance-list-modal-form"
      open={isMaintenanceListModalOpen}
      onClose={closeMaintenanceListModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isMaintenanceListModalOpen}>
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Maintenance Manager
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="maintenance list table">
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
                {maintenance.map((maint, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => openMaintenanceDetailsModal(maint)}
                  >
                    <StyledTableCell>{maint.mNumber}</StyledTableCell>
                    <StyledTableCell>{maint.equipmentName}</StyledTableCell>
                    <StyledTableCell>
                      {getFormattedDate(maint.saleDate)}
                    </StyledTableCell>
                    <StyledTableCell>{maint.salePrice}</StyledTableCell>
                    {getStyledTableCell(getFormattedDate(maint.expirationDate))}
                    {getCompletedStyleTableCell(
                      getFormattedDate(maint.completedDate)
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
              onClick={() => openAddMaintenanceModal()}
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Add New Maintnenance
            </Button>
            <Button
              className={classes.button}
              onClick={() => closeMaintenanceListModal()}
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

export default MaintenanceList;
