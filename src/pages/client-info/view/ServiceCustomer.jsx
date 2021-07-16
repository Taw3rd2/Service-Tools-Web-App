import React from "react";

import Spinner from "../../../components/with-spinner/Spinner";

import MainField from "./fields/MainField";
import ContactField from "./fields/ContactField";
import BusinessContactField from "./fields/BusinessContactField";
import EmailField from "./fields/EmailField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid black",
    backgroundColor: "#e6ebf2",
  },

  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },

  hrNoMargin: {
    margin: 0,
  },

  headers: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },

  fieldEntries: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 10,
  },

  icon: {
    textAlign: "center",
  },

  blackIcon: {
    color: "black",
    textAlign: "center",
  },

  redIcon: {
    color: "red",
    textAlign: "center",
  },
}));

const CustomerIsLoaded = ({
  customer,
  openEditClientModal,
  openEditBillingModal,
  openEquipmentListModal,
  getCurrentClient,
}) => {
  const classes = useStyles();

  const handleOpeningEditClientModal = () => {
    openEditClientModal();
    getCurrentClient(customer);
  };

  const handleOpeningEditBillingModal = () => {
    openEditBillingModal();
    getCurrentClient(customer);
  };

  if (customer.lastname === "") {
    return <Spinner />;
  } else {
    return (
      <Grid container spacing={1} className={classes.root}>
        {customer.billingiscommercial && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.redIcon}>
              Commercial
            </Typography>
          </Grid>
        )}
        <Grid item xs={6}>
          <MainField
            title={"Customer Information"}
            name={`${customer.firstname} ${customer.lastname}`}
            address={customer.street}
            address2={`${customer.city},${customer.state} ${customer.zip}`}
            business={false}
          />
        </Grid>

        <Grid item xs={6}>
          {customer.billingorg && (
            <MainField
              title={"Billing Information"}
              name={customer.billingorg}
              address={customer.billingstreet}
              address2={`${customer.billingcity},${customer.billingstate} ${customer.billingzip}`}
              business={true}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          {customer.phoneName || customer.phone ? (
            <ContactField
              title={"Primary Contact"}
              name={customer.phoneName}
              phone={customer.phone}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.billingPrimaryName || customer.billingPrimaryPhone ? (
            <BusinessContactField
              title={"Primary Billing Contact"}
              name={customer.billingPrimaryName}
              phone={customer.billingPrimaryPhone}
              email={customer.billingPrimaryEmail}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.altphone || customer.altPhoneName ? (
            <ContactField
              title={"Alternate Contact"}
              name={customer.altPhoneName}
              phone={customer.altphone}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.billingAlternateName || customer.billingAlternatePhone ? (
            <BusinessContactField
              title={"Alternate Billing Contact"}
              name={customer.billingAlternateName}
              phone={customer.billingAlternatePhone}
              email={customer.billingAlternateEmail}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.otherPhone || customer.otherPhoneName ? (
            <ContactField
              title={"Other Contact"}
              name={customer.otherPhoneName}
              phone={customer.otherPhone}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.billingOtherPhone || customer.billingOtherName ? (
            <BusinessContactField
              title={"Other Billing Contact"}
              name={customer.billingOtherName}
              phone={customer.billingOtherPhone}
              email={customer.billingOtherEmail}
            />
          ) : null}
        </Grid>

        <Grid item xs={6}>
          {customer.email ? (
            <EmailField title={"Customers Email"} email={customer.email} />
          ) : null}
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleOpeningEditClientModal()}
            startIcon={<EditIcon />}
            fullWidth
          >
            Edit Client
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => openEquipmentListModal()}
            startIcon={<ListIcon />}
            fullWidth
          >
            Equipment
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleOpeningEditBillingModal()}
            startIcon={<EditIcon />}
            fullWidth
          >
            Edit Billing
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default CustomerIsLoaded;
