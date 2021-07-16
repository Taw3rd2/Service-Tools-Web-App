import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import DailySlip from "./DailySlip";

import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const PrintDailySlips = (props) => {
  const matchesPrint = useMediaQuery("print");
  const date = props.props.history.location.state.date;
  const techLead = props.props.history.location.state.techLead;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("events")
      .where("dateScheduled", "==", date)
      .where("techLead", "==", techLead)
      .onSnapshot(
        (snapshot) => {
          let newEvents = [];
          snapshot.forEach((doc) => {
            let event = doc.data();
            event.key = doc.id;
            newEvents.push(event);
          });
          setEvents(newEvents);
        },
        (error) => {
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, [date, techLead]);

  return (
    <>
      {matchesPrint ? (
        <Grid container spacing={1} style={{ pageBreakBefore: "auto" }}>
          {events.map((event, index) => (
            <DailySlip key={index}> {event} </DailySlip>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={1}>
          {events.map((event, index) => (
            <DailySlip key={index}> {event} </DailySlip>
          ))}
        </Grid>
      )}
    </>
  );
};

export default PrintDailySlips;
