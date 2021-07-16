import React, { useState, useEffect } from "react";

import NoCustomerLoaded from "../../components/no-customer-loaded/NoCustomerLoaded";

import firebase from "firebase/app";
import {
  getFormattedTime,
  getFormattedDateAndTime,
} from "../../utils/dateUtils";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
});

const ClientActivity = ({ client, openActivityDetailsModal }) => {
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
              activity.currentTime = getFormattedTime(activity.currentTime);
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
      <TableContainer
        component={Paper}
        style={{ overflow: "auto", height: "380px" }}
      >
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="customer activity table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" align="left">
                Operator
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Activity
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Date
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
                Time
              </StyledTableCell>
              <StyledTableCell component="th" align="left">
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
                    {activity.date}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    {activity.currentTime}
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
    );
  }
};

export default ClientActivity;
