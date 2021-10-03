import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "grid",
    placeItems: "center",
    height: "486px",
  },
}));

const Version = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Service Tools
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Version 2.1 Updated Jul 09 2021
      </Typography>
      <Typography variant="caption" gutterBottom>
        Waldorf
      </Typography>
    </Paper>
  );
};

export default Version;
