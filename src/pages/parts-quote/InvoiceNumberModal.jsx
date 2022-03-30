import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";

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
}));

const InvoiceNumberModal = ({
  isInvoiceNumberModalOpen,
  closeInvoiceNumberModal,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="invoice-number-modal"
      aria-describedby="invoice-number-modal-form"
      open={isInvoiceNumberModalOpen}
      onClose={closeInvoiceNumberModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isInvoiceNumberModalOpen}>
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.title}>
                Invoice Number
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
            >
              Add
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => closeInvoiceNumberModal()}
              className={classes.button}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default InvoiceNumberModal;
