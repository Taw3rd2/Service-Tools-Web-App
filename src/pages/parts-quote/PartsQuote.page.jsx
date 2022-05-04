import React, { useState } from "react";

import firebase from "firebase/app";

import { useHistory } from "react-router-dom";

import { useSnackbar } from "notistack";

import AddPart from "./AddPart.modal";
import CustomerInfo from "./CustomerInfo.fields";
import DeletePart from "./DeletePart.modal";
import EditPart from "./EditPart.modal";
import InvoiceStarterModal from "./invoice-starter/InvoiceStarterModal";
import PartsList from "./PartsList.table";
import LaborShipping from "./LaborShipping.fields";
import Totals from "./Totals.fields";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import "./partsQuote.styles.css";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1),
    color: "teal",
  },
  greenTitle: {
    margin: theme.spacing(1),
    color: "green",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  printRoot: {
    width: "100%",
  },
  root: {
    width: "60%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    border: "1px solid black",
  },
  laborAndShipping: {
    marginTop: theme.spacing(3),
    border: "1px solid black",
    borderRadius: "5px",
  },
}));

const PartsQuote = (props) => {
  const matchesPrint = useMediaQuery("print");

  const { client } = props.location.state;
  const { selectedEquipment } = props.location.state;
  const { quoteData } = props.location.state;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();

  const [accepted, setAccepted] = useState(
    quoteData.accepted ? quoteData.accepted : false
  );

  const [id, setId] = useState(quoteData.id ? quoteData.id : "");
  const isPreDefinedQuote = true;

  //customer/equipment info
  const [customerName, setCustomerName] = useState(
    client.lastname ? `${client.firstname} ${client.lastname}` : ""
  );
  const [customerAddress, setCustomerAddress] = useState(
    client.street
      ? `${client.street} ${client.city}, ${client.state} ${client.zip}`
      : ""
  );
  const [quoteDate, setQuoteDate] = useState(
    quoteData.quoteDate ? quoteData.quoteDate : new Date()
  );
  const [equipmentName, setEquipmentName] = useState(
    selectedEquipment.equipmentName ? selectedEquipment.equipmentName : ""
  );
  const [equipmentBrand, setEquipmentBrand] = useState(
    selectedEquipment.equipmentBrand ? selectedEquipment.equipmentBrand : ""
  );
  const [equipmentModel, setEquipmentModel] = useState(
    selectedEquipment.equipmentModel ? selectedEquipment.equipmentModel : ""
  );
  const [equipmentSerial, setEquipmentSerial] = useState(
    selectedEquipment.equipmentSerial ? selectedEquipment.equipmentSerial : ""
  );

  // Add Part Modal
  const [parts, setParts] = useState(
    quoteData.partsList ? quoteData.partsList : []
  );
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const openAddPartModal = () => {
    setAddPartModalOpen(true);
  };
  const closeAddPartModal = () => {
    setAddPartModalOpen(false);
  };
  const addPartToPartsList = (part) => {
    const partQuantity = part.quantity;
    const partCost = part.partCost;
    part.totalCost = partQuantity * partCost;
    part.customerCost = part.totalCost * part.partMarkUp;
    setParts((prevState) => [...prevState, part]);
    closeAddPartModal();
  };

  // Invoice Number Modal
  const [userCreatedInvoiceNumber, setUserCreatedInvoiceNumber] = useState("");
  const [invoiceNumberPrefix, setInvoiceNumberPrefix] = useState("H");
  const [isInvoiceStarterModalOpen, setInvoiceStarterModalOpen] =
    useState(false);
  const openInvoiceStarterModal = () => {
    setInvoiceStarterModalOpen(true);
  };
  const closeInvoiceStarterModal = () => {
    setInvoiceStarterModalOpen(false);
  };
  const [halfDown, setHalfDown] = useState({
    type: "",
    amount: 0,
    checkNumber: 0,
    driversLicenseNumber: "",
    creditCardNumber: "",
    expirationDate: "",
    vCode: "",
  });
  const handleHalfDownUpdates = (prop) => (event) => {
    setHalfDown({ ...halfDown, [prop]: event.target.value });
  };

  const [paymentSelector, setPaymentSelector] = useState("b");
  const handlePaymentSelectorChange = (event) => {
    if (event.target.value === "a") {
      setHalfDown({ ...halfDown, type: "" });
    }
    if (event.target.value === "d") {
      setHalfDown({ ...halfDown, type: "netThirty" });
    }
    setPaymentSelector(event.target.value);
  };

  //Labor and Shipping
  const [laborHours, setLaborHours] = useState(
    quoteData.laborHours ? quoteData.laborHours : 1
  );
  const [laborRate, setLaborRate] = useState(
    quoteData.laborRate ? quoteData.laborRate : 79
  );
  const [addMaintenance, setAddMaintenance] = useState(
    quoteData.maintenance ? quoteData.maintenance : false
  );
  const [addRediagnostic, setAddRediagnostic] = useState(
    quoteData.rediagnostic ? quoteData.rediagnostic : false
  );
  const [regularShippingTime, setRegularShippingTime] = useState(
    quoteData.regularShippingTime ? quoteData.regularShippingTime : "5-7 days"
  );
  const [quickShippingTime, setQuickShippingTime] = useState(
    quoteData.quickShippingTime ? quoteData.quickShippingTime : "1-3 days"
  );
  const [regularShippingRate, setRegularShippingRate] = useState(
    quoteData.regularShippingRate ? quoteData.regularShippingRate : 25
  );
  const [quickShippingRate, setQuickShippingRate] = useState(
    quoteData.quickShippingRate ? quoteData.quickShippingRate : 75
  );
  const [shippingNotes, setShippingNotes] = useState(
    quoteData.shippingNotes ? quoteData.shippingNotes : ""
  );

  const [disclaimerRed, setDisclaimerRed] = useState(
    quoteData.disclaimerRed ? quoteData.disclaimerRed : false
  );

  //Totals
  const TAX_RATE = 0.06;

  const [selectedShipping, setSelectedShipping] = useState(
    quoteData.selectedShipping ? quoteData.selectedShipping : "none"
  );
  const [selectedDiscount, setSelectedDiscount] = useState(
    quoteData.selectedDiscount ? quoteData.selectedDiscount : "none"
  );

  const getTotalPartsCost = () => {
    return parts
      .map(({ totalCost }) => totalCost)
      .reduce((sum, i) => sum + i, 0);
  };
  const getTotalPartsTax = () => {
    if (getTotalPartsCost() === 0) {
      return 0;
    } else {
      return getTotalPartsCost() * TAX_RATE;
    }
  };
  const getTotalCustomerCost = () => {
    return parts
      .map(({ customerCost }) => customerCost)
      .reduce((sum, i) => sum + i, 0);
  };
  const getTotalLabor = () => {
    return laborHours * laborRate;
  };
  const getSubtotal = () => {
    return (
      getTotalPartsTax() +
      getTotalCustomerCost() +
      getTotalLabor() +
      getMaintenance() +
      getRediagnostic() +
      45
    );
  };
  const getMaintenance = () => {
    if (addMaintenance) {
      return 99.95;
    } else {
      return 0;
    }
  };
  const getRediagnostic = () => {
    if (addRediagnostic) {
      if (laborRate === "" || laborRate === undefined || laborRate === null) {
        return 79;
      } else {
        return parseInt(laborRate);
      }
    } else {
      return 0;
    }
  };
  const getShipping = () => {
    if (selectedShipping === "regular") {
      return regularShippingRate;
    } else if (selectedShipping === "quick") {
      return quickShippingRate;
    } else {
      return 0;
    }
  };
  const getDiscount = () => {
    if (selectedDiscount === "maintenance") {
      const subTotal = getSubtotal() + getShipping();
      return subTotal * 0.1;
    } else {
      return 0;
    }
  };
  const getTotalQuote = () => {
    return getSubtotal() + getShipping() - getDiscount();
  };

  //edit part
  const [isEditPartModalOpen, setEditPartModalOpen] = useState(false);
  const [part, setPart] = useState({});
  const openEditPartModal = (partToChange) => {
    setPart(partToChange);
    setEditPartModalOpen(true);
  };
  const closeEditPartModal = () => {
    setEditPartModalOpen(false);
  };
  const updatePartInTheList = (part) => {
    const partQuantity = part.quantity;
    const partCost = part.cost;
    part.totalCost = partQuantity * partCost;
    part.customerCost = part.totalCost * part.markUp;
    let partsList = [...parts];
    partsList[part.index] = part;
    setParts(partsList);
  };

  //delete part
  const [isDeletePartModalOpen, setDeletePartModalOpen] = useState(false);
  const openDeletePartModal = () => {
    setDeletePartModalOpen(true);
  };
  const closeDeletePartModal = () => {
    setDeletePartModalOpen(false);
  };
  const deletePartInTheList = (part) => {
    const partIndex = part.index;
    const partsList = [...parts];
    partsList.splice(partIndex, 1);
    setParts(partsList);
  };

  const quoteSaveSuccessIndicator = () => {
    enqueueSnackbar("Quote Saved!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  const quoteSaveFailureIndicator = () => {
    enqueueSnackbar("There was a problem!", {
      variant: "error",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  const onSave = () => {
    const partsQuote = {
      accepted,
      isPreDefinedQuote,
      quoteDate,
      equipmentName,
      equipmentBrand,
      equipmentModel,
      equipmentSerial,
      partsList: parts,
      laborHours,
      laborRate,
      maintenance: addMaintenance,
      rediagnostic: addRediagnostic,
      selectedShipping,
      regularShippingTime,
      regularShippingRate,
      quickShippingTime,
      quickShippingRate,
      shippingNotes,
      selectedDiscount,
      disclaimerRed,
    };
    if (id === "") {
      const docForId = firebase.firestore().collection("customers").doc();
      const generatedId = docForId.id;
      partsQuote.id = generatedId;
      setId(generatedId);

      firebase
        .firestore()
        .collection("customers")
        .doc(`${client.id}`)
        .collection("partsQuotes")
        .doc(`${generatedId}`)
        .set(partsQuote)
        .then(() => quoteSaveSuccessIndicator())
        .catch((error) => {
          console.log(error);
          quoteSaveFailureIndicator();
        });
    } else {
      firebase
        .firestore()
        .collection("customers")
        .doc(`${client.id}`)
        .collection("partsQuotes")
        .doc(`${id}`)
        .update(partsQuote)
        .then(() => quoteSaveSuccessIndicator())
        .catch((error) => {
          console.log(error);
          quoteSaveFailureIndicator();
        });
    }
  };

  const navigateToInvoiceCreation = () => {
    setAccepted(true);
    const totalPartsCost = getTotalPartsCost();
    const totalPartsTax = getTotalPartsTax();
    const totalLabor = getTotalLabor();
    const totalPartsRetailCost = getTotalCustomerCost();
    const subTotalOfInvoice = getSubtotal();
    const totalMaintenance = getMaintenance();
    const totalRediagnostic = getRediagnostic();
    const totalShipping = getShipping();
    const totalDiscounts = getDiscount();
    const totalQuote = getTotalQuote();
    const invoiceDataPackage = {
      client,
      isPreDefinedQuote,
      quoteDate,
      equipmentName,
      equipmentBrand,
      equipmentModel,
      equipmentSerial,
      partsList: parts,
      laborHours,
      laborRate,
      maintenance: addMaintenance,
      rediagnostic: addRediagnostic,
      selectedShipping,
      regularShippingTime,
      regularShippingRate,
      quickShippingTime,
      quickShippingRate,
      shippingNotes,
      selectedDiscount,
      disclaimerRed,
      invoiceNumberPrefix,
      userCreatedInvoiceNumber,
      totalPartsCost,
      totalPartsTax,
      totalLabor,
      totalPartsRetailCost,
      subTotalOfInvoice,
      totalMaintenance,
      totalRediagnostic,
      totalShipping,
      totalDiscounts,
      totalQuote,
      halfDown,
      balanceDue: {
        type: "",
        amount: getTotalQuote() - halfDown.amount,
        checkNumber: 0,
        driversLicenceNumber: "",
        creditCardNumber: "",
        expirationDate: "",
        vCode: "",
      },
      workDescription: "",
    };
    history.push({
      pathname: "/invoice",
      state: { dataPackage: invoiceDataPackage },
    });
    closeInvoiceStarterModal();
  };

  return (
    <>
      {matchesPrint ? (
        <div className={classes.printRoot}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Parts Quote
          </Typography>
          {accepted ? (
            <Typography
              variant="h5"
              gutterBottom
              className={classes.greenTitle}
            >
              Accepted
            </Typography>
          ) : null}
          <Paper className={classes.paper}>
            <CustomerInfo
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              quoteDate={quoteDate}
              setQuoteDate={setQuoteDate}
              equipmentName={equipmentName}
              setEquipmentName={setEquipmentName}
              equipmentBrand={equipmentBrand}
              setEquipmentBrand={setEquipmentBrand}
              equipmentModel={equipmentModel}
              setEquipmentModel={setEquipmentModel}
              equipmentSerial={equipmentSerial}
              setEquipmentSerial={setEquipmentSerial}
            />
            <Grid container>
              <Grid item xs={6} className={classes.laborAndShipping}>
                <LaborShipping
                  laborHours={laborHours}
                  setLaborHours={setLaborHours}
                  laborRate={laborRate}
                  setLaborRate={setLaborRate}
                  addMaintenance={addMaintenance}
                  setAddMaintenance={setAddMaintenance}
                  addRediagnostic={addRediagnostic}
                  setAddRediagnostic={setAddRediagnostic}
                  regularShippingTime={regularShippingTime}
                  setRegularShippingTime={setRegularShippingTime}
                  quickShippingTime={quickShippingTime}
                  setQuickShippingTime={setQuickShippingTime}
                  regularShippingRate={regularShippingRate}
                  setRegularShippingRate={setRegularShippingRate}
                  quickShippingRate={quickShippingRate}
                  setQuickShippingRate={setQuickShippingRate}
                  shippingNotes={shippingNotes}
                  setShippingNotes={setShippingNotes}
                  disclaimerRed={disclaimerRed}
                  setDisclaimerRed={setDisclaimerRed}
                />
              </Grid>
              <Grid item xs={6} className={classes.laborAndShipping}>
                <Totals
                  getTotalPartsCost={getTotalPartsCost}
                  getTotalPartsTax={getTotalPartsTax}
                  getTotalCustomerCost={getTotalCustomerCost}
                  getTotalLabor={getTotalLabor}
                  getSubtotal={getSubtotal}
                  getMaintenance={getMaintenance}
                  getRediagnostic={getRediagnostic}
                  selectedShipping={selectedShipping}
                  setSelectedShipping={setSelectedShipping}
                  selectedDiscount={selectedDiscount}
                  setSelectedDiscount={setSelectedDiscount}
                  getShipping={getShipping}
                  getDiscount={getDiscount}
                  getTotalQuote={getTotalQuote}
                />
              </Grid>
            </Grid>
            <PartsList
              openAddPartModal={openAddPartModal}
              openEditPartModal={openEditPartModal}
              parts={parts}
            />
          </Paper>
        </div>
      ) : (
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Parts Quote
          </Typography>
          <Paper className={classes.paper}>
            <CustomerInfo
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              quoteDate={quoteDate}
              setQuoteDate={setQuoteDate}
              equipmentName={equipmentName}
              setEquipmentName={setEquipmentName}
              equipmentBrand={equipmentBrand}
              setEquipmentBrand={setEquipmentBrand}
              equipmentModel={equipmentModel}
              setEquipmentModel={setEquipmentModel}
              equipmentSerial={equipmentSerial}
              setEquipmentSerial={setEquipmentSerial}
            />
            <Grid container>
              <Grid item xs={6} className={classes.laborAndShipping}>
                <LaborShipping
                  laborHours={laborHours}
                  setLaborHours={setLaborHours}
                  laborRate={laborRate}
                  setLaborRate={setLaborRate}
                  addMaintenance={addMaintenance}
                  setAddMaintenance={setAddMaintenance}
                  addRediagnostic={addRediagnostic}
                  setAddRediagnostic={setAddRediagnostic}
                  regularShippingTime={regularShippingTime}
                  setRegularShippingTime={setRegularShippingTime}
                  quickShippingTime={quickShippingTime}
                  setQuickShippingTime={setQuickShippingTime}
                  regularShippingRate={regularShippingRate}
                  setRegularShippingRate={setRegularShippingRate}
                  quickShippingRate={quickShippingRate}
                  setQuickShippingRate={setQuickShippingRate}
                  shippingNotes={shippingNotes}
                  setShippingNotes={setShippingNotes}
                  disclaimerRed={disclaimerRed}
                  setDisclaimerRed={setDisclaimerRed}
                />
              </Grid>
              <Grid item xs={6} className={classes.laborAndShipping}>
                <Totals
                  getTotalPartsCost={getTotalPartsCost}
                  getTotalPartsTax={getTotalPartsTax}
                  getTotalCustomerCost={getTotalCustomerCost}
                  getTotalLabor={getTotalLabor}
                  getSubtotal={getSubtotal}
                  getMaintenance={getMaintenance}
                  getRediagnostic={getRediagnostic}
                  selectedShipping={selectedShipping}
                  setSelectedShipping={setSelectedShipping}
                  selectedDiscount={selectedDiscount}
                  setSelectedDiscount={setSelectedDiscount}
                  getShipping={getShipping}
                  getDiscount={getDiscount}
                  getTotalQuote={getTotalQuote}
                />
              </Grid>
            </Grid>
            <PartsList
              openAddPartModal={openAddPartModal}
              openEditPartModal={openEditPartModal}
              parts={parts}
            />
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
            >
              {id === "" ? (
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() => onSave()}
                >
                  Save New Quote
                </Button>
              ) : (
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() => onSave()}
                >
                  Update Quote Info
                </Button>
              )}
              <Button
                type="button"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<AttachMoneyIcon />}
                onClick={() => openInvoiceStarterModal()}
              >
                Start A New Invoice From This Quote
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => history.goBack()}
              >
                Close
              </Button>
            </Grid>
          </Paper>
          {isAddPartModalOpen && (
            <AddPart
              isAddPartModalOpen={isAddPartModalOpen}
              closeAddPartModal={closeAddPartModal}
              addPartToPartsList={addPartToPartsList}
            />
          )}
          {isEditPartModalOpen && (
            <EditPart
              isEditPartModalOpen={isEditPartModalOpen}
              closeEditPartModal={closeEditPartModal}
              openDeletePartModal={openDeletePartModal}
              updatePartInTheList={updatePartInTheList}
              part={part}
            />
          )}
          {isDeletePartModalOpen && (
            <DeletePart
              isDeletePartModalOpen={isDeletePartModalOpen}
              closeEditPartModal={closeEditPartModal}
              closeDeletePartModal={closeDeletePartModal}
              deletePartInTheList={deletePartInTheList}
              part={part}
            />
          )}
          {isInvoiceStarterModalOpen && (
            <InvoiceStarterModal
              isInvoiceStarterModalOpen={isInvoiceStarterModalOpen}
              closeInvoiceStarterModal={closeInvoiceStarterModal}
              userCreatedInvoiceNumber={userCreatedInvoiceNumber}
              setUserCreatedInvoiceNumber={setUserCreatedInvoiceNumber}
              invoiceNumberPrefix={invoiceNumberPrefix}
              setInvoiceNumberPrefix={setInvoiceNumberPrefix}
              navigateToInvoiceCreation={navigateToInvoiceCreation}
              getTotalQuote={getTotalQuote}
              halfDown={halfDown}
              handleHalfDownUpdates={handleHalfDownUpdates}
              paymentSelector={paymentSelector}
              handlePaymentSelectorChange={handlePaymentSelectorChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PartsQuote;
