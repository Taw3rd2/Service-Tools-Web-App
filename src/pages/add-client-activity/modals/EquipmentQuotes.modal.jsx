import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    minWidth: 275,
    width: "50%",
    maxHeight: 440,
    backgroundColor: "#e6ebf2",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },
  blue: {
    color: "blue",
  },
  teal: {
    color: "teal",
  },
}));

const EquipmentQuotes = ({
  isEquipmentQuotesModalOpen,
  closeEquipmentQuotesModal,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="equipment-list-modal"
      aria-describedby="equipment-list-modal-form"
      open={isEquipmentQuotesModalOpen}
      onClose={closeEquipmentQuotesModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEquipmentQuotesModalOpen}>
        <Card className={classes.root}>
          <CardHeader title="Equipment Quotes" className={classes.teal} />
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Future equipment quotes previews in a card that is clickable to
              the full sheet
            </Typography>
          </CardContent>

          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              tabIndex="21"
              onClick={() => closeEquipmentQuotesModal()}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default EquipmentQuotes;
