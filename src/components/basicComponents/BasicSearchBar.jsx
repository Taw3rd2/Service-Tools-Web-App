import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  label: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const BasicSearchBar = ({ value, setValue, searchLabel, clearSearchQuery }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="baseline" className={classes.root}>
      <Grid item xs={6} className={classes.label}>
        <Typography variant="body1">Search {searchLabel}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="parts-catalog-search"
          label="Search"
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          size="large"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => clearSearchQuery()}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default BasicSearchBar;
