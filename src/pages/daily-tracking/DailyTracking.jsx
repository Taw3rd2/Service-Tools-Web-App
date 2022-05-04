import React from "react";

import TaskList from "./TaskList";

import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpiringMaintenance from "./ExpiringMaintenance";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#e6ebf2",
  },
  buttons: {
    marginTop: theme.spacing(3),
  },
}));

const DailyTracking = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
        Daily (under construction)
      </Typography>
      <Container
        component={Paper}
        style={{ overflow: "auto", height: "340px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={6}>
            <ExpiringMaintenance />
          </Grid>
        </Grid>
      </Container>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        <Button variant="contained" color="primary" className={classes.buttons}>
          Add New Task
        </Button>
      </Grid>
    </Paper>
  );
};

export default DailyTracking;
