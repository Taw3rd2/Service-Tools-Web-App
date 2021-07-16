import React from "react";

import { currencyFormat } from "../../utils/currencyUtils";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
  text: {
    textAlign: "right",
  },
  gridOdd: {
    backgroundColor: "#e6eaf0",
  },
  selectText: {
    textAlign: "right",
    marginTop: theme.spacing(1),
  },
  underSelectText: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  formControl: {
    display: "flex",
    justifyContent: "center",
    minWidth: 120,
  },
  printText: {
    textAlign: "right",
    fontSize: "16px",
  },
  printSelectText: {
    textAlign: "right",
    marginTop: theme.spacing(4),
    fontSize: "16px",
  },
  printDiscountText: {
    textAlign: "right",
    marginTop: theme.spacing(2),
    fontSize: "16px",
  },
}));

const Totals = ({
  getTotalPartsCost,
  getTotalPartsTax,
  getTotalCustomerCost,
  getTotalLabor,
  getSubtotal,
  getMaintenance,
  getRediagnostic,
  selectedShipping,
  setSelectedShipping,
  selectedDiscount,
  setSelectedDiscount,
  getShipping,
  getDiscount,
  getTotalQuote,
}) => {
  const matchesPrint = useMediaQuery("print");
  const classes = useStyles();

  return (
    <>
      {matchesPrint ? (
        <Paper elevation={0} className={classes.root}>
          <Typography variant="h5" className={classes.title}>
            Totals
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                Total Parts Cost:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getTotalPartsCost())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                Total Parts Tax:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getTotalPartsTax())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                Parts After Mark Up:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getTotalCustomerCost())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                Total Labor:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getTotalLabor())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                Handling (PPU):
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                $45.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                Maintenance:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getMaintenance())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                Rediagnostic:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getRediagnostic())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                Sub Total:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getSubtotal())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                {`Shipping: ${selectedShipping}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.printText}>
                {`${currencyFormat(getShipping())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`Discount: ${selectedDiscount}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.printText}>
                {`- ${currencyFormat(getDiscount())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.underSelectText}>
                <strong>Total Quote:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.underSelectText}>
                <strong>{`${currencyFormat(getTotalQuote())}`}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper elevation={0} className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Totals
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                Total Parts Cost:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getTotalPartsCost())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                Total Parts Tax:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getTotalPartsTax())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                Parts After Mark Up:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getTotalCustomerCost())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                Total Labor:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getTotalLabor())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                Handling (PPU):
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                $45.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                Maintenance:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getMaintenance())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                Rediagnostic:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getRediagnostic())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                Sub Total:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.text}>
                {`${currencyFormat(getSubtotal())}`}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-shipping-label">
                  Select Shipping
                </InputLabel>
                <Select
                  labelId="select-shipping-label"
                  id="select-shipping"
                  value={selectedShipping}
                  margin="none"
                  onChange={(e) => setSelectedShipping(e.target.value)}
                >
                  <MenuItem value={"regular"}>Regular</MenuItem>
                  <MenuItem value={"quick"}>Quick</MenuItem>
                  <MenuItem value={"none"}>None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.gridOdd}>
              <Typography variant="h6" className={classes.selectText}>
                {`${currencyFormat(getShipping())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-discount-label">
                  Select Discount
                </InputLabel>
                <Select
                  labelId="select-discount-label"
                  id="select-discount"
                  value={selectedDiscount}
                  margin="none"
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                >
                  <MenuItem value={"maintenance"}>10% Maintenance</MenuItem>
                  <MenuItem value={"none"}>None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.selectText}>
                {`- ${currencyFormat(getDiscount())}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.underSelectText}>
                <strong>Total Quote:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.underSelectText}>
                <strong>{`${currencyFormat(getTotalQuote())}`}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Totals;
