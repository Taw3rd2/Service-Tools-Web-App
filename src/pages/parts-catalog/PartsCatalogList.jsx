import React from "react";

import { toMarkUp, toCurrency } from "../../utils/currencyUtils";

import BasicTableList from "../../components/basicComponents/BasicTableList";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import StorageIcon from "@material-ui/icons/Storage";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const PartsCatalogList = ({
  partsCatalog,
  category,
  openAddPartModal,
  openEditPartModal,
  openInventoryContainerModal,
}) => {
  const classes = useStyles();

  const getFilteredParts = () => {
    let filteredParts = [];
    if (category === "All") {
      filteredParts = partsCatalog;
    } else {
      filteredParts = partsCatalog.filter(function (e) {
        return e.category === category;
      });
    }
    return filteredParts;
  };

  const tableHead = (
    <>
      <StyledTableCell component="th" align="left">
        #
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Part Number
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Description
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Hi Temp Cost
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Customer Cost
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Vendor
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Init
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Date
      </StyledTableCell>
    </>
  );

  const tableBody = (
    <>
      {partsCatalog &&
        getFilteredParts()
          .sort((a, b) => a.partNumber.localeCompare(b.partNumber))
          .map((part, index) => (
            <StyledTableRow
              key={index}
              onClick={() => openEditPartModal(part)}
              style={
                index % 2 ? { background: "#d9d9d9" } : { background: "white" }
              }
            >
              <StyledTableCell style={{ width: 25 }} align="left">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{part.partNumber}</StyledTableCell>
              <StyledTableCell align="left">
                {part.partDescription}
              </StyledTableCell>
              <StyledTableCell align="left">
                {toCurrency(part.partCost / 100)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {toMarkUp(part.partCost / 100)}
              </StyledTableCell>
              <StyledTableCell align="left">{part.partVendor}</StyledTableCell>
              <StyledTableCell align="left">
                {part.partDataServicer}
              </StyledTableCell>
              <StyledTableCell align="left">
                {part.partDataDate}
              </StyledTableCell>
            </StyledTableRow>
          ))}
    </>
  );

  const additionalButtons = (
    <>
      <Button
        onClick={() => openInventoryContainerModal()}
        type="button"
        size="large"
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<StorageIcon />}
      >
        Inventory Containers
      </Button>
      <Button
        onClick={() => openAddPartModal()}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
      >
        Add New Part
      </Button>
    </>
  );

  return (
    <BasicTableList
      tableHead={tableHead}
      tableBody={tableBody}
      height={"715px"}
      additionalButtons={additionalButtons}
    />
  );
};

export default PartsCatalogList;
