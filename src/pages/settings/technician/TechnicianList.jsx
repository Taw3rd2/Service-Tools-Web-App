import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../../redux/technicians/technician.selectors";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
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
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  spacing: {
    marginTop: theme.spacing(3),
  },
}));

const TechniciansList = ({
  technicians,
  isTechniciansLoaded,
  openAddTechnicianModal,
  openDeleteTechnicianModal,
  openEditTechnicianModal,
}) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Edit Technicians
      </Typography>
      <TableContainer
        component={Paper}
        style={{ overflow: "auto", height: "380px" }}
      >
        <Table
          stickyHeader
          className={classes.table}
          sizes="large"
          aria-label="set technicians table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" align="left">
                #
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Technician
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Email
              </StyledTableCell>
              <StyledTableCell component="th" align="center">
                Color
              </StyledTableCell>
              <StyledTableCell component="th" align="center">
                Edit
              </StyledTableCell>
              <StyledTableCell component="th" align="center">
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isTechniciansLoaded &&
              technicians.technicians
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((technician, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell style={{ width: 25 }} align="left">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {technician.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {technician.email}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        backgroundColor: technician.color,
                        color: "white",
                      }}
                    >
                      {technician.color}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 100 }} align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => openEditTechnicianModal(technician)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 100 }} align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={() => openDeleteTechnicianModal(technician)}
                      >
                        Delete
                      </Button>
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
          className={classes.spacing}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => openAddTechnicianModal()}
        >
          Add New Technician
        </Button>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  isTechniciansLoaded: selectIsTechniciansLoaded,
  technicians: selectTechnicianList,
});

export default connect(mapStateToProps)(TechniciansList);
