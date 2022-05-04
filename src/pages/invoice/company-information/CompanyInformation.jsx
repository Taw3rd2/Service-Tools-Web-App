import React from "react";

import { Grid, Typography } from "@material-ui/core";
import logoPicture from "../../../utils/images/logo.png";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  imageStyles: {
    width: "50%",
    objectFit: "contain",
    maxHeight: "185px",
    paddingTop: "20px",
  },
  logoText: {
    fontStyle: "italic",
  },
  phoneNumber: {
    color: "red",
  },
}));

const CompanyInformation = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center">
        <img
          src={logoPicture}
          alt="company_logo"
          className={classes.imageStyles}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h5" className={classes.logoText}>
          *Refrigeration*
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h6" className={classes.phoneNumber}>
          989-723-8070
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="body1" className={classes.logoText}>
          2500 Eash M21 * Suite C * Corunna, MI 48817
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CompanyInformation;
