import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectClientList } from "../../redux/clients/clients.selectors";
import CustomerExport from "../../components/exportToExcel/CustomerExport";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
//import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listbox: {
    height: 380,
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
    border: "1px solid black",
  },

  option: {
    color: "black",
    fontSize: 18,
  },

  optionItemThree: {
    color: "red",
  },

  icon: {
    color: "red",
    marginRight: theme.spacing(2),
  },

  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const ClientSearch = React.memo(
  ({ clients, openAddClientModal, handleClientSelected }) => {
    const classes = useStyles();

    const groupedCustomers = clients.clients.map((client) => {
      const firstLetter = client.lastname[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...client,
      };
    });

    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2 className={classes.button}>{clients.clients.length} Customers</h2>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Autocomplete
            id="combo-box-demo"
            style={{ margin: "8px" }}
            classes={{
              listbox: classes.listbox,
              option: classes.option,
            }}
            options={groupedCustomers.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(clients) => clients.firstLetter}
            getOptionLabel={(option) => option.lastname}
            autoSelect
            onChange={(event, value) => handleClientSelected(value)}
            getOptionSelected={(option, value) =>
              option.lastname === value.lastname
            }
            disableClearable={true}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search last Names"
                variant="outlined"
              />
            )}
            renderOption={(option) => (
              <div className={classes.option}>
                <Typography noWrap>
                  {option.lastname} {option.firstname}
                </Typography>
                <Typography noWrap className={classes.optionItemThree}>
                  {option.city}
                </Typography>
              </div>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => openAddClientModal()}
            startIcon={<AddIcon />}
            fullWidth
            size="large"
          >
            Add New Customer
          </Button>
          <CustomerExport clients={clients} />
        </Grid>
      </Grid>
    );
  }
);

const mapStateToProps = createStructuredSelector({
  clients: selectClientList,
});

export default connect(mapStateToProps)(ClientSearch);
