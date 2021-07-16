import React from "react";

import DailySlip from "./DailySlip";

import Grid from "@material-ui/core/Grid";

const PrintOneSlip = (props) => {
  const dispatches = [];
  const { dispatch } = props.props.history.location.state;
  dispatches.push(dispatch);

  return (
    <Grid container spacing={2}>
      {dispatches.map((dispatch, index) => (
        <DailySlip key={index}> {dispatch} </DailySlip>
      ))}
    </Grid>
  );
};

export default PrintOneSlip;
