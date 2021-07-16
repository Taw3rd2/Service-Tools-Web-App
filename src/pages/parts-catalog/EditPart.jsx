import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsTabsLoaded,
  selectTabsList,
} from "../../redux/tabs/tab.selectors";

import {
  currencyFormat,
  toMarkUp,
  toTax,
  toResFlatRate,
  toComFlatRate,
  toRetail,
} from "../../utils/currencyUtils";

import uploadPicture from "../../utils/images/upload_cloud.jpg";
import ProgressBar from "../../components/progressBar/ProgressBar";
import InventoryControl from "../inventory/InventoryControl";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import "./uploadPicture.css";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 16,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ededed", //theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

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
  formControl: {
    minWidth: 120,
  },
  margin: {
    marginTop: theme.spacing(3),
  },
  textFieldMargin: {
    marginTop: theme.spacing(1),
  },
  title: {
    color: "teal",
  },
  centerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  buttonRed: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
  crossReferenceRed: {
    backgroundColor: "red",
  },
  pictureFrame: {
    border: "2px solid #000",
    boxShadow: theme.shadows[2],
  },
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  spacing: {
    marginTop: theme.spacing(3),
  },
  responsiveImage: {
    width: "100%",
    objectFit: "contain",
    maxHeight: "240px",
    margin: theme.spacing(1),
  },
  select: {
    maxHeight: "400px",
  },
  rightMargin: {
    paddingRight: theme.spacing(1),
  },
}));

const EditPart = ({
  isEditPartModalOpen,
  closeEditPartModal,
  updatePartsStart,
  partSelected,
  openDeleteModal,
  openAddCrossReferenceModal,
  openDeleteCrossReferenceModal,
  openEditCrossReferenceModal,
  isContainersLoaded,
  inventoryContainers,
  isTabsLoaded,

  tabs,
}) => {
  const classes = useStyles();

  const onBaseCostLoad = (number) => {
    const stringifiedNumber = parseFloat(number / 100).toFixed(2);
    return stringifiedNumber;
  };

  const id = partSelected.id;
  const [category, setCategory] = useState(partSelected.category);
  const crossReference = partSelected.crossReference
    ? partSelected.crossReference
    : [];
  const [installVanQuantity, setInstallVanQuantity] = useState(
    partSelected.installVanQuantity
  );
  const [isInstallInventory, setIsInstallInventory] = useState(
    partSelected.isInstallInventory
  );
  const [isMaintenanceInventory, setIsMaintenanceInventory] = useState(
    partSelected.isMaintenanceInventory
  );
  const [isServiceInventory, setIsServiceInventory] = useState(
    partSelected.isServiceInventory
  );
  const [isStockRoomInventory, setIsStockRoomInventory] = useState(
    partSelected.isStockRoomInventory
  );
  const [maintenanceVanQuantity, setMaintenanceVanQuantity] = useState(
    partSelected.maintenanceVanQuantity
  );
  const [partCost, setPartCost] = useState(
    onBaseCostLoad(partSelected.partCost)
  );
  const partDataDate = partSelected.partDataDate;
  const [partDataServicer, setPartDataServicer] = useState(
    partSelected.partDataServicer
  );
  const [partDescription, setPartDescription] = useState(
    partSelected.partDescription
  );
  const [partLabor, setPartLabor] = useState(partSelected.partLabor);
  const [partNotes, setPartNotes] = useState(partSelected.partNotes);
  const [partNumber, setPartNumber] = useState(partSelected.partNumber);
  const [partVendor, setPartVendor] = useState(partSelected.partVendor);
  const [serviceVanQuantity, setServiceVanQuantity] = useState(
    partSelected.serviceVanQuantity
  );
  const [stockRoomQuantity, setStockRoomQuantity] = useState(
    partSelected.stockRoomQuantity
  );
  const [url, setUrl] = useState(partSelected.url ? partSelected.url : "");

  const stringToNumber = (string) => {
    return Number(string.replace(/[^\d]/g, ""));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const serviceInventoryQuantity = parseFloat(serviceVanQuantity);
    const maintenanceInventoryQuantity = parseFloat(maintenanceVanQuantity);
    const installInventoryQuantity = parseFloat(installVanQuantity);
    const stockRoomInventoryQuantity = parseFloat(stockRoomQuantity);

    serviceInventoryQuantity > 0
      ? setIsServiceInventory(true)
      : setIsServiceInventory(false);
    maintenanceInventoryQuantity > 0
      ? setIsMaintenanceInventory(true)
      : setIsMaintenanceInventory(false);
    installInventoryQuantity > 0
      ? setIsInstallInventory(true)
      : setIsInstallInventory(false);
    stockRoomInventoryQuantity > 0
      ? setIsStockRoomInventory(true)
      : setIsInstallInventory(false);

    const updatedPart = {
      id,
      category,
      crossReference,
      installVanQuantity: installInventoryQuantity,
      isInstallInventory,
      isMaintenanceInventory,
      isServiceInventory,
      isStockRoomInventory,
      maintenanceVanQuantity: maintenanceInventoryQuantity,
      partCost: stringToNumber(partCost),
      partDataDate: new Date().toLocaleString(),
      partDataServicer,
      partDescription,
      partLabor,
      partNotes,
      partNumber,
      partVendor,
      serviceVanQuantity: serviceInventoryQuantity,
      stockRoomQuantity: stockRoomInventoryQuantity,
      url,
    };
    console.log(updatedPart);
    updatePartsStart(updatedPart);
    closeEditPartModal();
  };

  //picture handler
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];
  const pictureChangeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (.png or .jpeg)");
    }
  };

  return (
    <Modal
      aria-labelledby="edit-partLabor: - + partLabormodal"
      aria-describedby="edit-partLabor: - + partLabormodal-form"
      open={isEditPartModalOpen}
      onClose={closeEditPartModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditPartModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Part Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Part Updated:</strong> {partDataDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Suggested On Hand Part Quantities</strong>
              </Typography>
            </Grid>
          </Grid>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel id="category-select-label">Tab</InputLabel>
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        required
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        MenuProps={{ classes: { paper: classes.select } }}
                      >
                        {isTabsLoaded &&
                          tabs.tabs
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((tab, index) => (
                              <MenuItem key={tab.id} value={tab.name}>
                                {tab.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="part_number"
                      label="Part Number"
                      value={partNumber}
                      onChange={(e) => setPartNumber(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="part_data_servicer"
                      label="Initials"
                      value={partDataServicer}
                      onChange={(e) => setPartDataServicer(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="part_description"
                      label="Part Description"
                      value={partDescription}
                      onChange={(e) => setPartDescription(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="part_vendor"
                      label="Part Vendor"
                      value={partVendor}
                      onChange={(e) => setPartVendor(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="part-cost-input">
                        Part Cost
                      </InputLabel>
                      <Input
                        id="part-cost-input"
                        value={partCost}
                        onChange={(e) => setPartCost(e.target.value)}
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="part_labor"
                      label="Part Labor"
                      value={partLabor}
                      onChange={(e) => setPartLabor(e.target.value)}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Hrs</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="part_notes"
                      label="Part Notes"
                      value={partNotes}
                      onChange={(e) => setPartNotes(e.target.value)}
                      multiline
                      maxRows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <InventoryControl
                  partSelected={partSelected}
                  isContainersLoaded={isContainersLoaded}
                  inventoryContainers={inventoryContainers}
                />
              </Grid>
            </Grid>

            <hr />

            <Grid container className={classes.margin}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label htmlFor="base" className={classes.centerInfo}>
                      Base Cost
                    </label>
                    <Typography
                      id="base"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {currencyFormat(partCost)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.rightMargin}>
                    <label htmlFor="resflat" className={classes.centerInfo}>
                      Res Flat Rate
                    </label>
                    <Typography
                      id="resflat"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {toResFlatRate(partCost, partLabor)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <label htmlFor="markup" className={classes.centerInfo}>
                      Mark Up
                    </label>
                    <Typography
                      id="markup"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {toMarkUp(partCost)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.rightMargin}>
                    <label htmlFor="comflat" className={classes.centerInfo}>
                      Com Flat Rate
                    </label>
                    <Typography
                      id="comflat"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {toComFlatRate(partCost, partLabor)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <label htmlFor="tax" className={classes.centerInfo}>
                      Tax
                    </label>
                    <Typography
                      id="tax"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {toTax(partCost)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.rightMargin}>
                    <label htmlFor="retail" className={classes.centerInfo}>
                      Cash And Carry
                    </label>
                    <Typography
                      id="retail"
                      variant="h6"
                      align="center"
                      gutterBottom
                    >
                      {toRetail(partCost)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} className={classes.pictureFrame}>
                {url === "" || url === undefined ? (
                  <div>
                    <label>
                      <img
                        src={uploadPicture}
                        alt="upload"
                        style={{
                          width: "100%",
                          objectFit: "contain",
                          maxHeight: "185px",
                        }}
                      />
                      <input
                        type="file"
                        onChange={pictureChangeHandler}
                        style={{ display: "none" }}
                      />
                    </label>
                    <div className="output">
                      {error && <div className="error">{error}</div>}
                      {file && <div>{file.name}</div>}
                      {file && (
                        <ProgressBar
                          file={file}
                          setFile={setFile}
                          setUrl={setUrl}
                          partSelected={partSelected}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <img
                    src={url}
                    alt="uploaded pic"
                    className={classes.responsiveImage}
                  />
                )}
              </Grid>
            </Grid>

            <hr />

            <div className={classes.margin}>
              <label htmlFor="other_parts_table">
                <strong>
                  Part Numbers From Other Vendors (Cross Reference)
                </strong>
              </label>
              <TableContainer
                component={Paper}
                style={{ overflow: "auto", height: "175px" }}
                id="other_parts_table"
              >
                <Table
                  stickyHeader
                  className={classes.table}
                  size="small"
                  aria-label="part cross reference list"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell component="th" align="left">
                        Part Number
                      </StyledTableCell>
                      <StyledTableCell component="th" align="left">
                        Vendor
                      </StyledTableCell>
                      <StyledTableCell component="th" align="left">
                        Cost
                      </StyledTableCell>
                      <StyledTableCell component="th" align="left">
                        Date
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        align="center"
                      ></StyledTableCell>
                      <StyledTableCell component="th" align="center">
                        <Button
                          type="button"
                          size="small"
                          color="primary"
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={() => openAddCrossReferenceModal()}
                        >
                          Add
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {partSelected.crossReference &&
                      partSelected.crossReference.map((part, index) => (
                        <StyledTableRow
                          key={part.id}
                          style={
                            index % 2
                              ? { background: "#d9d9d9" }
                              : { background: "white" }
                          }
                        >
                          <StyledTableCell>{part.partNumber}</StyledTableCell>
                          <StyledTableCell>{part.partVendor}</StyledTableCell>
                          <StyledTableCell>
                            {currencyFormat(part.partCost / 100)}
                          </StyledTableCell>
                          <StyledTableCell>{part.partDataDate}</StyledTableCell>
                          <StyledTableCell>
                            {
                              <Button
                                type="button"
                                size="small"
                                color="primary"
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                className={classes.crossReferenceRed}
                                onClick={() =>
                                  openDeleteCrossReferenceModal(index)
                                }
                              >
                                Delete
                              </Button>
                            }
                          </StyledTableCell>
                          <StyledTableCell>
                            {
                              <Button
                                type="button"
                                size="small"
                                color="primary"
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={() =>
                                  openEditCrossReferenceModal(index)
                                }
                              >
                                Edit
                              </Button>
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
            >
              <Button
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.buttonRed}
                startIcon={<DeleteIcon />}
                onClick={() => openDeleteModal()}
              >
                Delete
              </Button>
              <Button
                type="submit"
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<ArrowUpwardIcon />}
              >
                Save
              </Button>
              <Button
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => closeEditPartModal()}
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

const mapStateToProps = createStructuredSelector({
  isTabsLoaded: selectIsTabsLoaded,
  tabs: selectTabsList,
});

export default connect(mapStateToProps)(EditPart);
