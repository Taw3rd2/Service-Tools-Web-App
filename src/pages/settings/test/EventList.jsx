import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsEventLoaded,
  selectEventsList,
} from "../../../redux/events/event.selectors";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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

const EventList = ({ events, isEventsLoaded }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Event List
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
                Last Name
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Tech Helper
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isEventsLoaded &&
              events.events
                .sort((a, b) => a.lastname.localeCompare(b.lastname))
                .map((event, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell style={{ width: 25 }} align="left">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {event.lastname}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {Array.isArray(event.techHelper) && "THIS IS IT!"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  isEventsLoaded: selectIsEventLoaded,
  events: selectEventsList,
});

export default connect(mapStateToProps)(EventList);
