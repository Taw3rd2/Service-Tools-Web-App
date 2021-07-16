import React from "react";

import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import BuildIcon from "@material-ui/icons/Build";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "2px solid black",
    backgroundColor: "#e6ebf2",
    padding: 0,
  },

  topButton: {
    marginTop: theme.spacing(1),
  },

  bottomButton: {
    marginBottom: theme.spacing(1),
  },

  successButton: {
    backgroundColor: "green",
  },

  reportButton: {
    border: "1px solid black",
    marginTop: theme.spacing(3),
    textAlign: "center",
    cursor: "pointer",
  },

  reportButtonLabel: {
    textAlign: "center",
    padding: theme.spacing(0),
  },
}));

const AddClientActivity = ({
  openCreateDispatchModal,
  openNoteCreatorModal,
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
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.topButton}
            startIcon={<NoteAddIcon />}
            onClick={() => openNoteCreatorModal("Phone")}
            fullWidth
          >
            Add New Phone Note
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.topButton}
            fullWidth
            startIcon={<NoteAddIcon />}
            disabled
          >
            Add New Phone Note
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<NoteAddIcon />}
            onClick={() => openNoteCreatorModal("Note")}
            fullWidth
          >
            Add New Customer Note
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<NoteAddIcon />}
            fullWidth
            disabled
          >
            Add New Customer Note
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            onClick={() => openMaintnanceListModal()}
            fullWidth
          >
            Maintenance Manager
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            fullWidth
            disabled
          >
            Maintenance Manager
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            fullWidth
            onClick={() => openWarrantyListModal()}
          >
            Warranty Manager
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuildIcon />}
            fullWidth
            disabled
          >
            Warranty Manager
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.successButton}
            onClick={() => openCreateDispatchModal()}
            startIcon={<AddCircleIcon />}
            fullWidth
          >
            Create Service Dispatch
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.successButton}
            onClick={() => openCreateDispatchModal()}
            startIcon={<AddCircleIcon />}
            fullWidth
            disabled
          >
            Create Service Dispatch
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => routeToPartsQuoteCreator()}
            startIcon={<AddCircleIcon />}
            fullWidth
          >
            Create A Parts Quote
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            fullWidth
            disabled
          >
            Create A Parts Quote
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={1} />
      <Grid item xs={10}>
        {client.id ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.bottomButton}
            startIcon={<AddCircleIcon />}
            fullWidth
          >
            Create A Equipment Quote
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.bottomButton}
            fullWidth
            startIcon={<AddCircleIcon />}
            disabled
          >
            Create A Equipment Quote
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />
      {client.id ? (
        <Grid
          item
          xs={4}
          className={classes.reportButton}
          onClick={() => openDispatchesModal()}
        >
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Dispatches</Typography>
        </Grid>
      ) : (
        <Grid item xs={4} className={classes.reportButton}>
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Dispatches</Typography>
        </Grid>
      )}
      {client.id ? (
        <Grid
          item
          xs={4}
          className={classes.reportButton}
          onClick={() => openPartsQuotesModal()}
        >
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Parts Quotes</Typography>
        </Grid>
      ) : (
        <Grid item xs={4} className={classes.reportButton}>
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Parts Quotes</Typography>
        </Grid>
      )}
      {client.id ? (
        <Grid
          item
          xs={4}
          className={classes.reportButton}
          onClick={() => openEquipmentQuotesModal()}
        >
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Equipment Quotes</Typography>
        </Grid>
      ) : (
        <Grid item xs={4} className={classes.reportButton}>
          <AssignmentIcon style={{ fontSize: 80 }} />
          <Typography variant="subtitle1">All Customer</Typography>
          <Typography variant="subtitle1">Equipment Quotes</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default AddClientActivity;
