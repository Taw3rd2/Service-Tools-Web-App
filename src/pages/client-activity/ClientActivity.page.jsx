import React, { useState, useEffect } from "react";

import NoCustomerLoaded from "../../components/no-customer-loaded/NoCustomerLoaded";

import firebase from "firebase/app";
import {
  getFormattedTime,
  getFormattedDateAndTime,
  getFormattedDate,
} from "../../utils/dateUtils";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { NoteAdd } from "@material-ui/icons";

import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#e6ebf2",
  },
  table: {
    minWidth: 500,
  },
  buttons: {
    marginTop: theme.spacing(3),
  },
}));

const ClientActivity = ({
  client,
  openActivityDetailsModal,
  openNoteCreatorModal,
}) => {
  const classes = useStyles();
  const [activities, setActivity] = useState([]);

  useEffect(() => {
    if (client.id === "") {
      setDefaultCustomerInfo();
    } else {
      setActivity([]);
      let unsubscribe = firebase
        .firestore()
        .collection("customers")
        .doc(`${client.id}`)
        .collection("Activity")
        .onSnapshot(
          (snapshot) => {
            let newActivities = [];
            snapshot.forEach((doc) => {
              let activity = doc.data();
              activity.sortingDate = getFormattedDateAndTime(
                doc.data().currentTime
              );
              activity.activityId = doc.id;
              newActivities.push(activity);
              newActivities.sort((a, b) =>
                b.sortingDate.localeCompare(a.sortingDate)
              );
            });
            setActivity(newActivities);
          },
          (error) => {
            console.log(error);
          }
        );
      return () => unsubscribe();
    }
  }, [client]);

  const setDefaultCustomerInfo = () => {
    console.log("no customer activity loaded");
  };

  if (client.id === "") {
    return <NoCustomerLoaded />;
  } else {
    return (
      <Paper variant="outlined" className={classes.root}>
        {client.firstname ? (
          <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
            {client.firstname} {client.lastname} Notes
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
            {client.lastname} Notes
          </Typography>
        )}
        <TableContainer
          component={Paper}
          style={{ overflow: "auto", height: "340px" }}
        >
          <Table
            stickyHeader
            className={classes.table}
            size="small"
            aria-label="customer activity table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  component="th"
                  align="left"
                  style={{ background: "darkblue" }}
                >
                  Operator
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  align="left"
                  style={{ background: "darkblue" }}
                >
                  Activity
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  align="left"
                  style={{ background: "darkblue" }}
                >
                  Date
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  align="left"
                  style={{ background: "darkblue" }}
                >
                  Time
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  align="left"
                  style={{ background: "darkblue" }}
                >
                  Details
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => openActivityDetailsModal(activity)}
                  >
                    <StyledTableCell style={{ width: 160 }} align="left">
                      {activity.operator}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="left">
                      {activity.type}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="left">
                      {getFormattedDate(activity.currentTime)}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="left">
                      {getFormattedTime(activity.currentTime)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {activity.details}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    None
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    {""}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    {""}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    {""}
                  </StyledTableCell>
                  <StyledTableCell align="left">{""}</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          {client.id ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.buttons}
              startIcon={<NoteAdd />}
              onClick={() => openNoteCreatorModal("Note")}
            >
              Add New Note
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.buttons}
              startIcon={<NoteAdd />}
              disabled
            >
              Add New Note
            </Button>
          )}
        </Grid>
      </Paper>
    );
  }
};

export default ClientActivity;
