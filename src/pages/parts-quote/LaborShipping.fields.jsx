import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    color: "teal",
  },
  lowerTitle: {
    color: "teal",
    marginTop: theme.spacing(2),
  },
  textfield: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  gridPadding: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  redTextSelector: {
    color: "teal",
    marginTop: theme.spacing(3),
  },
  redText: {
    color: "red",
  },
}));

const LaborShipping = ({
  laborHours,
  setLaborHours,
  laborRate,
  setLaborRate,
  addMaintenance,
  setAddMaintenance,
  addRediagnostic,
  setAddRediagnostic,
  regularShippingTime,
  setRegularShippingTime,
  regularShippingRate,
  setRegularShippingRate,
  quickShippingTime,
  setQuickShippingTime,
  quickShippingRate,
  setQuickShippingRate,
  shippingNotes,
  setShippingNotes,
  disclaimerRed,
  setDisclaimerRed,
}) => {
  const matchesPrint = useMediaQuery("print");

  const classes = useStyles();

  const handleRegularShippingRateChange = (event) => {
    setRegularShippingRate(parseFloat(event.target.value));
  };

  const handleQuickShippingRateChange = (event) => {
    setQuickShippingRate(parseFloat(event.target.value));
  };

  return (
    <>
      {matchesPrint ? (
        <Paper className={classes.root}>
          <Typography variant="h5" className={classes.title}>
            Labor
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Labor with travel"
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(e.target.value)}
                margin="normal"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">hours</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Labor Rate"
                type="number"
                value={laborRate}
                onChange={(e) => setLaborRate(e.target.value)}
                margin="normal"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={addMaintenance}
                    onChange={(e) => setAddMaintenance(e.target.checked)}
                  />
                }
                label="Add Standard Maintenance"
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={addRediagnostic}
                    onChange={(e) => setAddRediagnostic(e.target.checked)}
                  />
                }
                label="Add Re-Diagnostic"
              />
            </Grid>
          </Grid>
          <Typography variant="h5" className={classes.lowerTitle}>
            Shipping
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Regular Shipping Time"
                value={regularShippingTime}
                onChange={(e) => setRegularShippingTime(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Regular Shipping Rate"
                type="number"
                value={regularShippingRate}
                onChange={handleRegularShippingRateChange}
                margin="normal"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Quick Shipping Time"
                value={quickShippingTime}
                onChange={(e) => setQuickShippingTime(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} className={classes.gridPadding}>
              <TextField
                label="Quick Shipping Rate"
                type="number"
                value={quickShippingRate}
                onChange={handleQuickShippingRateChange}
                margin="normal"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Shipping Notes"
            value={shippingNotes}
            onChange={(e) => setShippingNotes(e.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            rows="4"
          />
        </Paper>
      ) : (
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Labor
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Labor with travel"
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(e.target.value)}
                margin="none"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">hours</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Labor Rate"
                type="number"
                value={laborRate}
                onChange={(e) => setLaborRate(e.target.value)}
                margin="none"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.title}
                control={
                  <Checkbox
                    color="primary"
                    checked={addMaintenance}
                    onChange={(e) => setAddMaintenance(e.target.checked)}
                  />
                }
                label="Add Standard Maintenance"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.title}
                control={
                  <Checkbox
                    color="primary"
                    checked={addRediagnostic}
                    onChange={(e) => setAddRediagnostic(e.target.checked)}
                  />
                }
                label="Add Re-Diagnostic"
              />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom className={classes.lowerTitle}>
            Shipping
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Regular Shipping Time"
                value={regularShippingTime}
                onChange={(e) => setRegularShippingTime(e.target.value)}
                margin="none"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Regular Shipping Rate"
                type="number"
                value={regularShippingRate}
                onChange={handleRegularShippingRateChange}
                margin="none"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quick Shipping Time"
                value={quickShippingTime}
                onChange={(e) => setQuickShippingTime(e.target.value)}
                margin="none"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quick Shipping Rate"
                type="number"
                value={quickShippingRate}
                onChange={handleQuickShippingRateChange}
                margin="none"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            className={classes.redTextSelector}
            control={
              <Checkbox
                color="primary"
                checked={disclaimerRed}
                onChange={(e) => setDisclaimerRed(e.target.checked)}
              />
            }
            label="Red note box (Disclaimer to customer)"
          />
          {disclaimerRed ? (
            <TextField
              label="Notes/Disclaimers"
              value={shippingNotes}
              onChange={(e) => setShippingNotes(e.target.value)}
              InputProps={{
                className: classes.redText,
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows="4"
              error
            />
          ) : (
            <TextField
              label="Notes/Disclaimers"
              value={shippingNotes}
              onChange={(e) => setShippingNotes(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows="4"
            />
          )}
        </Paper>
      )}
    </>
  );
};

export default LaborShipping;
