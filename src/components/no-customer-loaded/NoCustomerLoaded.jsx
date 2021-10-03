import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const NoCustomerLoaded = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          variant="subtitle1"
          className={classes.paper}
          component="div"
          style={{
            height: "35vh",
          }}
        >
          No Customer Loaded
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default NoCustomerLoaded;
