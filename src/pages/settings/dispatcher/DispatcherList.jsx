import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsDispatcherLoaded,
  selectDispatchersList,
} from "../../../redux/dispatchers/dispatcher.selectors";

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

const DispatcherList = ({
  dispatchers,
  isDispatchersLoaded,
  openAddDispatcherModal,
  openDeleteDispatcherModal,
  openEditDispatcherModal,
}) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Edit Dispatchers
      </Typography>
      <TableContainer
        component={Paper}
        style={{ overflow: "auto", height: "380px" }}
      >
        <Table
          stickyHeader
          className={classes.table}
          sizes="large"
          aria-label="set dispatchers table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" align="left">
                #
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Dispatcher
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
            {isDispatchersLoaded &&
              dispatchers.dispatchers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((dispatcher, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell style={{ width: 25 }} align="left">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {dispatcher.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 100 }} align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => openEditDispatcherModal(dispatcher)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 100 }} align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={() => openDeleteDispatcherModal(dispatcher)}
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
          onClick={() => openAddDispatcherModal()}
        >
          Add New Dispatcher
        </Button>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  isDispatchersLoaded: selectIsDispatcherLoaded,
  dispatchers: selectDispatchersList,
});

export default connect(mapStateToProps)(DispatcherList);
