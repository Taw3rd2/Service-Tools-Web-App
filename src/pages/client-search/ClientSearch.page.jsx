import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectClientList } from "../../redux/clients/clients.selectors";
import CustomerExport from "../../components/exportToExcel/CustomerExport";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
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

    const [selectedSearchValue, setSelectedSearchvalue] = useState("lastname");
    const handleSearchChange = (event) => {
      setSelectedSearchvalue(event.target.value);
    };

    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2 className={classes.button}>{clients.clients.length} Customers</h2>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              araia-label="position"
              name="position"
              defaultValue="lastname"
              onChange={handleSearchChange}
            >
              <FormControlLabel
                value="lastname"
                control={<Radio color="primary" />}
                label="Last Name"
                labelPlacement="top"
              />
              <FormControlLabel
                value="street"
                control={<Radio color="primary" />}
                label="Address"
                labelPlacement="top"
              />
              <FormControlLabel
                value="city"
                control={<Radio color="primary" />}
                label="City"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
          {selectedSearchValue === "lastname" && (
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
                  label="Search Last Names"
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
          )}
          {selectedSearchValue === "street" && (
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
              getOptionLabel={(option) => option.street}
              autoSelect
              onChange={(event, value) => handleClientSelected(value)}
              getOptionSelected={(option, value) =>
                option.lastname === value.lastname
              }
              disableClearable={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Street Address"
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
          )}
          {selectedSearchValue === "city" && (
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
              getOptionLabel={(option) => option.city}
              autoSelect
              onChange={(event, value) => handleClientSelected(value)}
              getOptionSelected={(option, value) =>
                option.lastname === value.lastname
              }
              disableClearable={true}
              renderInput={(params) => (
                <TextField {...params} label="Search City" variant="outlined" />
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
          )}
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
