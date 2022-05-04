import React from "react";

import { useHistory } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

import { Assignment, AddCircle, Build } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "2px solid black",
    backgroundColor: "#e6ebf2",
    padding: "4px",
  },
  reportButton: {
    border: "1px solid black",
    textAlign: "center",
    cursor: "pointer",
    background: "#FFF",
    padding: theme.spacing(1),
  },
}));

const AddClientActivity = ({
  openCreateDispatchModal,
  openDispatchesModal,
  openPartsQuotesModal,
  openEquipmentQuotesModal,
  openWarrantyListModal,
  openMaintnanceListModal,
  client,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const routeToPartsQuoteCreator = () => {
    const selectedEquipment = {
      equipmentName: "",
      equipmentBrand: "",
      equipmentModel: "",
      equipmentSerial: "",
    };
    const quoteData = {
      id: "",
      jobNumber: "",
      quoteDate: new Date(),
      parts: [],
      laborHours: 1,
      laborRate: 79,
      maintenance: false,
      rediagnostic: false,
      regularShippingTime: "5-7 days",
      quickShippingTime: "1-3 days",
      regularShippingRate: 25,
      quickShippingRate: 75,
      shippingNotes: "",
      selectedShipping: "none",
      selectedDiscount: "none",
      disclaimerRed: false,
    };
    history.push({
      pathname: "PartsQuote",
      state: {
        client: client,
        selectedEquipment: selectedEquipment,
        quoteData: quoteData,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {client.id ? (
          <Grid item xs={3} onClick={() => openCreateDispatchModal()}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60, color: "green" }} />
              <Typography variant="subtitle1">Create New</Typography>
              <Typography variant="subtitle1">Dispatch</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">Create New</Typography>
              <Typography variant="subtitle1">Dispatch</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => openDispatchesModal()}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Dispatches</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Dispatches</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => openPartsQuotesModal()}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Parts Quotes</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Parts Quotes</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => openEquipmentQuotesModal()}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Equipment Quotes</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <Assignment style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Equipment Quotes</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => openMaintnanceListModal()}>
            <div className={classes.reportButton}>
              <Build style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">Maintenance</Typography>
              <Typography variant="subtitle1">Manager</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">Maintenance</Typography>
              <Typography variant="subtitle1">Manager</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => openWarrantyListModal()}>
            <div className={classes.reportButton}>
              <Build style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">Warranty</Typography>
              <Typography variant="subtitle1">Manager</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">Warranty</Typography>
              <Typography variant="subtitle1">Manager</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3} onClick={() => routeToPartsQuoteCreator()}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">Create Blank</Typography>
              <Typography variant="subtitle1">Parts Quote</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">Create Blank</Typography>
              <Typography variant="subtitle1">Parts Quote</Typography>
            </div>
          </Grid>
        )}
        {client.id ? (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60, color: "darkblue" }} />
              <Typography variant="subtitle1">Create Blank</Typography>
              <Typography variant="subtitle1">Equipment Quote</Typography>
            </div>
          </Grid>
        ) : (
          <Grid item xs={3}>
            <div className={classes.reportButton}>
              <AddCircle style={{ fontSize: 60 }} />
              <Typography variant="subtitle1">Create Blank</Typography>
              <Typography variant="subtitle1">Equipment Quote</Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AddClientActivity;
