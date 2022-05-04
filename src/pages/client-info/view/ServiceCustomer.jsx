import React from "react";

import Spinner from "../../../components/with-spinner/Spinner";

import MainField from "./fields/MainField";
import ContactField from "./fields/ContactField";
import BusinessContactField from "./fields/BusinessContactField";
import EmailField from "./fields/EmailField";

import { Button, Grid, Typography } from "@material-ui/core";
import { Edit, List } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid black",
    backgroundColor: "#e6ebf2",
  },
  card: {
    padding: theme.spacing(1),
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
      <div className={classes.root}>
        <Grid container>
          {customer.billingiscommercial && (
            <Grid item xs={12}>
              <div className={classes.card}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ textAlign: "center", color: "red" }}
                >
                  Commercial
                </Typography>
              </div>
            </Grid>
          )}
          <Grid item xs={6}>
            <div className={classes.card}>
              <MainField
                title={"Customer Information"}
                name={`${customer.firstname} ${customer.lastname}`}
                address={customer.street}
                address2={`${customer.city},${customer.state} ${customer.zip}`}
                business={false}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            {customer.billingorg && (
              <div className={classes.card}>
                <MainField
                  title={"Billing Information"}
                  name={customer.billingorg}
                  address={customer.billingstreet}
                  address2={`${customer.billingcity},${customer.billingstate} ${customer.billingzip}`}
                  business={true}
                />
              </div>
            )}
          </Grid>

          <Grid item xs={6}>
            {customer.phoneName || customer.phone ? (
              <div className={classes.card}>
                <ContactField
                  title={"Primary Contact"}
                  name={customer.phoneName}
                  phone={customer.phone}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.billingPrimaryName || customer.billingPrimaryPhone ? (
              <div className={classes.card}>
                <BusinessContactField
                  title={"Primary Billing Contact"}
                  name={customer.billingPrimaryName}
                  phone={customer.billingPrimaryPhone}
                  email={customer.billingPrimaryEmail}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.altphone || customer.altPhoneName ? (
              <div className={classes.card}>
                <ContactField
                  title={"Alternate Contact"}
                  name={customer.altPhoneName}
                  phone={customer.altphone}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.billingAlternateName || customer.billingAlternatePhone ? (
              <div className={classes.card}>
                <BusinessContactField
                  title={"Alternate Billing Contact"}
                  name={customer.billingAlternateName}
                  phone={customer.billingAlternatePhone}
                  email={customer.billingAlternateEmail}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.otherPhone || customer.otherPhoneName ? (
              <div className={classes.card}>
                <ContactField
                  title={"Other Contact"}
                  name={customer.otherPhoneName}
                  phone={customer.otherPhone}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.billingOtherPhone || customer.billingOtherName ? (
              <div className={classes.card}>
                <BusinessContactField
                  title={"Other Billing Contact"}
                  name={customer.billingOtherName}
                  phone={customer.billingOtherPhone}
                  email={customer.billingOtherEmail}
                />
              </div>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {customer.email ? (
              <div className={classes.card}>
                <EmailField title={"Customers Email"} email={customer.email} />
              </div>
            ) : null}
          </Grid>
          <Grid item xs={6} />

          <Grid item xs={4}>
            <div className={classes.card}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpeningEditClientModal()}
                startIcon={<Edit />}
                fullWidth
              >
                Edit Client
              </Button>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.card}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => openEquipmentListModal()}
                startIcon={<List />}
                fullWidth
              >
                Equipment
              </Button>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.card}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpeningEditBillingModal()}
                startIcon={<Edit />}
                fullWidth
              >
                Edit Billing
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default CustomerIsLoaded;
