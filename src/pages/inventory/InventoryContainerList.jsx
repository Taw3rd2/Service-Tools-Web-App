import React from "react";

import { toCurrency } from "../../utils/currencyUtils";
import { getFormattedDate } from "../../utils/dateUtils";

import BasicModal from "../../components/basicComponents/BasicModal";
import BasicTableList from "../../components/basicComponents/BasicTableList";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import StorageIcon from "@material-ui/icons/Storage";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

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

const InventoryContainerList = ({
  isInventoryContainerModalOpen,
  closeInventoryContainerModal,
  openAddInventoryContainerModal,
  inventoryContainers,
  openEditInventoryContainerModal,
}) => {
  const classes = useStyles();

  const getTotalItemCost = (container) => {
    //returns a array of partCosts
    const partCostArray = container.partsList.map((part, index) => {
      return part.partCost;
    });
    //returns a array of partQuantities
    const partQuantityArray = container.partsList.map((part, index) => {
      return part.quantity;
    });
    //returns a array of all partsCost * quantities
    const costTotal = partCostArray.map((cost, index) => {
      return cost * partQuantityArray[index];
    });
    //sum all array elements in costTotal
    const totals = costTotal.reduce(function (a, b) {
      return a + b;
    }, 0);

    return totals;
  };

  const getLastInventoryDate = (container) => {
    if (container.lastInventoried) {
      return getFormattedDate(container.lastInventoried);
    } else {
      return "never";
    }
  };

  const getContainerItemTotals = (containers) => {
    return containers
      .map((container) => getTotalItemCost(container))
      .reduce((sum, i) => sum + i, 0);
    //map through the containers and return the getTotalitemCost for each
    //return the sum of all containers
  };

  const tableHead = (
    <>
      <StyledTableCell component="th" align="left">
        Container
      </StyledTableCell>
      <StyledTableCell component="th" align="center">
        Count
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Total
      </StyledTableCell>
      <StyledTableCell component="th" align="left">
        Last Inventoried
      </StyledTableCell>
    </>
  );

  const tableBody = (
    <>
      {inventoryContainers &&
        inventoryContainers.inventoryContainers
          .sort((a, b) => a.containerName.localeCompare(b.containerName))
          .map((container, index) => (
            <StyledTableRow
              key={container.id}
              onClick={() => openEditInventoryContainerModal(container)}
              style={
                index % 2 ? { background: "#d9d9d9" } : { background: "white" }
              }
            >
              <StyledTableCell align="left">
                {container.containerName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {container.partsList.length}
              </StyledTableCell>
              <StyledTableCell align="left">
                {toCurrency(getTotalItemCost(container) / 100)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {getLastInventoryDate(container)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
    </>
  );

  const additionalButtons = (
    <>
      <Button
        size="large"
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<FormatListNumberedIcon />}
        onClick={() => openAddInventoryContainerModal()}
      >
        Parts Needed
      </Button>
      <Button
        size="large"
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<StorageIcon />}
        onClick={() => openAddInventoryContainerModal()}
      >
        Add Containers
      </Button>
    </>
  );

  const modalBody = (
    <>
      <BasicTableList
        tableHead={tableHead}
        tableBody={tableBody}
        height="400px"
      />
      <Typography variant="h5" gutterBottom>
        {/* style this */}
        Inventoried Total:
        {inventoryContainers &&
          toCurrency(
            getContainerItemTotals(inventoryContainers.inventoryContainers) /
              100
          )}
      </Typography>
    </>
  );

  return (
    <BasicModal
      isModalOpen={isInventoryContainerModalOpen}
      closeModal={closeInventoryContainerModal}
      additionalButtons={additionalButtons}
      modalTitle="Inventory Containers"
      modalBody={modalBody}
    />
  );
};

export default InventoryContainerList;
