import React from "react";

import { Grid, Button } from "@material-ui/core";

import { Close, DateRange, SaveAlt } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  saveButton: {
    background: "green",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const BottomButtons = ({
  cancelInvoice,
  openCreateDispatchModal,
  saveInvoice,
  isInvoiceSaved,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="flex-end"
      direction="row"
    >
      {isInvoiceSaved ? (
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.button}
          startIcon={<DateRange />}
          onClick={() => openCreateDispatchModal()}
        >
          Schedule
        </Button>
      ) : (
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.button}
          startIcon={<DateRange />}
          disabled
        >
          Schedule
        </Button>
      )}
      {isInvoiceSaved ? (
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.button}
          startIcon={<DateRange />}
        >
          Order Material
        </Button>
      ) : (
        <Button
          type="button"
          color="primary"
          variant="contained"
          className={classes.button}
          startIcon={<DateRange />}
          disabled
        >
          Order Material
        </Button>
      )}

      <Button
        type="button"
        color="primary"
        variant="contained"
        className={classes.saveButton}
        startIcon={<SaveAlt />}
        onClick={() => saveInvoice()}
      >
        Save
      </Button>
      <Button
        type="button"
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<Close />}
        onClick={() => cancelInvoice()}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default BottomButtons;
