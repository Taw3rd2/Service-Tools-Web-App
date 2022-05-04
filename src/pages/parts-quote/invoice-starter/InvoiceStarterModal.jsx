import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import InvoiceNumber from "./InvoiceNumber";
import BillingSection from "./BillingSection";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  title: {
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  buttonTopMargin: {
    marginTop: theme.spacing(3),
  },
}));

const InvoiceStarterModal = ({
  isInvoiceStarterModalOpen,
  closeInvoiceStarterModal,
  navigateToInvoiceCreation,

  userCreatedInvoiceNumber,
  setUserCreatedInvoiceNumber,
  invoiceNumberPrefix,
  setInvoiceNumberPrefix,

  getTotalQuote,
  halfDown,
  handleHalfDownUpdates,
  paymentSelector,
  handlePaymentSelectorChange,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="invoice-starter-modal"
      aria-describedby="invoice-starter-modal-form"
      open={isInvoiceStarterModalOpen}
      onClose={closeInvoiceStarterModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isInvoiceStarterModalOpen}>
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item>
              <InvoiceNumber
                userCreatedInvoiceNumber={userCreatedInvoiceNumber}
                setUserCreatedInvoiceNumber={setUserCreatedInvoiceNumber}
                invoiceNumberPrefix={invoiceNumberPrefix}
                setInvoiceNumberPrefix={setInvoiceNumberPrefix}
              />
            </Grid>
            <Grid item>
              <BillingSection
                getTotalQuote={getTotalQuote}
                halfDown={halfDown}
                handleHalfDownUpdates={handleHalfDownUpdates}
                paymentSelector={paymentSelector}
                handlePaymentSelectorChange={handlePaymentSelectorChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
            className={classes.buttonTopMargin}
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
              onClick={() => navigateToInvoiceCreation()}
            >
              Create
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => closeInvoiceStarterModal()}
              className={classes.button}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default InvoiceStarterModal;
