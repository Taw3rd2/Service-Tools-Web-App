import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import { ChromePicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    paddingTop: "3px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  colorPicker: {
    marginTop: theme.spacing(1),
  },
}));

const EditTechnician = ({
  isEditTechnicianModalOpen,
  closeEditTechnicianModal,
  technician,
  updateTechnicianStart,
}) => {
  const classes = useStyles();

  const [name, setName] = useState(technician.name ? technician.name : "");
  const [email, setEmail] = useState(technician.email ? technician.email : "");
  const [color, setColor] = useState(technician.color ? technician.color : "");

  const [showPicker, setShowPicker] = useState(false);
  const toggleColorPicker = () => setShowPicker(!showPicker);

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedTechnician = {
      color,
      email,
      name,
      id: technician.id,
    };
    updateTechnicianStart(updatedTechnician);
    closeEditTechnicianModal();
  };

  return (
    <Modal
      aria-labelledby="edit-technician-modal"
      aria-describedby="edit-technician-modal-form"
      open={isEditTechnicianModalOpen}
      onClose={closeEditTechnicianModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditTechnicianModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Edit
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="technician_name"
                  label="Technician Name"
                  className={classes.textField}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                />
                <TextField
                  id="technician_email"
                  label="Technician Email"
                  className={classes.textField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                />
                <TextField
                  id="technician_color"
                  label="Technician Color"
                  className={classes.textField}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                />
                <Button
                  size="large"
                  variant="contained"
                  onClick={toggleColorPicker}
                  style={{ backgroundColor: `${color}`, color: "white" }}
                >
                  Set New Color
                </Button>

                {showPicker && (
                  <ChromePicker
                    className={classes.colorPicker}
                    onChangeComplete={(color) => {
                      setColor(color.hex);
                    }}
                    color={color}
                  />
                )}
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
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<ArrowUpwardIcon />}
              >
                Submit
              </Button>
              <Button
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => closeEditTechnicianModal()}
              >
                Close
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditTechnician;
