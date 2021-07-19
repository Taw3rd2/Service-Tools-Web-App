import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsPartsCatalogLoaded, selectPartsCatalogList } from '../../redux/partsCatalog/partsCatalog.selectors'
import { selectIsTabsLoaded, selectTabsList } from '../../redux/tabs/tab.selectors'
import { selectIsContainerLoaded, selectInventoryContainersList } from '../../redux/inventoryContainers/inventoryContainers.selectors'

import PartsCatalogList from './PartsCatalogList'
import AddPart from './AddPart'
import BasicDeleteModal from '../../components/basicComponents/BasicDeleteModal'
import BasicSearchBar from '../../components/basicComponents/BasicSearchBar'
import EditPart from './EditPart'
import AddCrossReference from './AddCrossReference'
import EditCrossReference from './EditCrossReference';
import DeleteCrossReference from './DeleteCrossReference';
import InventoryContainerList from '../inventory/InventoryContainerList'
import AddInventoryContainer from '../inventory/AddInventoryContainer'
import EditInventoryContainer from '../inventory/EditInventoryContainer'
import DeleteInventoryContainer from '../inventory/DeleteInventoryContainer'

import {
    addPartsCatalogStart,
    deletePartsCatalogStart,
    updatePartsCatalogStart,
} from '../../redux/partsCatalog/partsCatalog.actions'

import {
  addInventoryContainerStart,
  deleteInventoryContainerStart,
  updateInventoryContainerStart,
} from '../../redux/inventoryContainers/inventoryContainers.actions'

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { makeStyles } from "@material-ui/core/styles";


const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

const a11yProps = (index) => {
    return {
      id: `inventory-tab-${index}`,
      "aria-controls": `inventory-tabpanel-${index}`
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const PartsCatalog = ({
      partsCatalog,
      isPartsCatalogLoaded,
      isContainersLoaded,
      inventoryContainers,
      addInventoryContainerStart,
      deleteInventoryContainerStart,
      updateInventoryContainerStart,
      addPartsStart,
      deletePartsStart,
      updatePartsStart,
      isTabsLoaded,
      tabs,
  }) => {
      const classes = useStyles();
  
  //search bar
  const [query, setQuery] = useState("")
  const [partsCatalogList, setPartsCatalogList] = useState(partsCatalog.partsCatalog)

  const partsCatalogSearch = async (queryInput) => {
     const filteredParts = partsCatalog.partsCatalog.filter(part => {
       return part.partNumber.toLowerCase().includes(queryInput.toLowerCase())
     })
     setQuery(queryInput)
     setPartsCatalogList(filteredParts)
  }

  //add part
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const openAddPartModal = () => {
    setAddPartModalOpen(true);
  }
  const closeAddPartModal = () => {
    setAddPartModalOpen(false);
  }

  //edit part
  const [partSelected, setPartSelected] = useState({});
  const [isEditPartModalOpen, setEditPartModalOpen] = useState(false);
  const openEditPartModal = (part) => {
      setPartSelected(part)
      setEditPartModalOpen(true);
  }
  const closeEditPartModal = () => {
      setPartSelected({})
      setEditPartModalOpen(false);
  }

  //delete part
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalTitleItemToDelete, setModalTitleItemToDelete] = useState("")
  const openDeleteModal = () => {
      setModalTitleItemToDelete(partSelected.partNumber)
      setDeleteModalOpen(true);
  }
  const closeDeleteModal = () => {
      setDeleteModalOpen(false);
  }

  //add cross reference
  const [isAddCrossReferenceModalOpen, setAddCrossReferenceModalOpen] = useState(false)
  const openAddCrossReferenceModal = () => {
    setAddCrossReferenceModalOpen(true)
  }
  const closeAddCrossReferenceModal = () => {
    setAddCrossReferenceModalOpen(false)
  }

  //edit cross reference
  const [isEditCrossReferenceModalOpen, setEditCrossReferenceModalOpen] = useState(false)
  const [editCrossReferencePartIndex, setEditCrossReferencePartIndex] = useState(undefined)
  const openEditCrossReferenceModal = (index) => {
    setEditCrossReferencePartIndex(index)
    setEditCrossReferenceModalOpen(true)
  }
  const closeEditCrossReferenceModal = () => {
    setEditCrossReferenceModalOpen(false)
  }

  //delete cross reference
  const [isDeleteCrossReferenceModalOpen, setDeleteCrossReferenceModalOpen] = useState(false);
  const [deleteCrossReferencePartIndex, setCrossReferencePartIndex] = useState(undefined)
  const openDeleteCrossReferenceModal = (index) => {
    setCrossReferencePartIndex(index)
    setDeleteCrossReferenceModalOpen(true)
  }
  const closeDeleteCrossReferenceModal = () => {
    setDeleteCrossReferenceModalOpen(false)
  }

  //tabs
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  //inventory container list
  const [isInventoryContainerModalOpen, setInventoryContainerModalOpen] = useState(false)
  const openInventoryContainerModal = () => {
    setInventoryContainerModalOpen(true)
  }
  const closeInventoryContainerModal = () => {
    setInventoryContainerModalOpen(false)
  }

  //add inventory containers
  const [isAddInventoryContainerModalOpen, setAddInventoryContainerModalOpen] = useState(false)
  const openAddInventoryContainerModal = () => {
    setAddInventoryContainerModalOpen(true)
  }
  const closeAddInventoryContainerModal = () => {
    setAddInventoryContainerModalOpen(false)
  }

  //edit inventory containers
  const [inventoryContainerSelected, setInventoryContainerSelected] = useState({})
  const [isEditInventoryContainerModalOpen, setEditInventoryContainerModalOpen] = useState(false)
  const openEditInventoryContainerModal = (container) => {
    setInventoryContainerSelected(container)
    setEditInventoryContainerModalOpen(true)
  }
  const closeEditInventoryContainerModal = () => {
    setEditInventoryContainerModalOpen(false)
  }

  //delete inventory containers
  const [isDeleteInventoryContainerModalOpen, setDeleteInventoryContainerModalOpen] = useState(false)
  // modalTitleItemToDelete, setModalTitleItemToDelete is defined above
  const openDeleteInventoryContainerModal = () => {
    setDeleteInventoryContainerModalOpen(true)
  }
  const closeDeleteInventoryContainerModal = () => {
    setDeleteInventoryContainerModalOpen(false)
  }

  return (
      <div className={classes.root}>
        <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          aria-label="inventory tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" {...a11yProps(0)} />
          {isTabsLoaded && 
            tabs.tabs
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tab, index) => (
              <Tab key={tab.id} label={tab.name} {...a11yProps(index + 1)}/>
            ))
          }
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
          <BasicSearchBar value={query} setValue={partsCatalogSearch} searchLabel="Part Numbers"/>
        <PartsCatalogList
          partsCatalog={partsCatalogList}
          category={"All"}
          openAddPartModal={openAddPartModal}
          openEditPartModal={openEditPartModal}
          openInventoryContainerModal={openInventoryContainerModal}
        />
      </TabPanel>
      {isPartsCatalogLoaded && isTabsLoaded &&
        tabs.tabs
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tab, index) => (
                <TabPanel key={tab.id} value={tabValue} index={index + 1}>
                  <BasicSearchBar value={query} setValue={partsCatalogSearch} searchLabel="Part Numbers"/>
                    <PartsCatalogList 
                        partsCatalog={partsCatalogList}
                        category={tab.name}
                        openAddPartModal={openAddPartModal}
                        openEditPartModal={openEditPartModal}
                        openStorageListModal={openInventoryContainerModal}
                    />
                </TabPanel>
            ))
      }
        {isAddPartModalOpen && (
        <AddPart 
          isAddPartModalOpen={isAddPartModalOpen}
          closeAddPartModal={closeAddPartModal}
          addPartsStart={addPartsStart}
        />
      )}
        {isEditPartModalOpen && (
        <EditPart 
          isEditPartModalOpen={isEditPartModalOpen}
          closeEditPartModal={closeEditPartModal}
          updatePartsStart={updatePartsStart}
          partSelected={partSelected}
          openDeleteModal={openDeleteModal}
          openAddCrossReferenceModal={openAddCrossReferenceModal}
          openDeleteCrossReferenceModal={openDeleteCrossReferenceModal}
          openEditCrossReferenceModal={openEditCrossReferenceModal}
          isContainersLoaded={isContainersLoaded}
          inventoryContainers={inventoryContainers}
        />
      )}
        {isDeleteModalOpen && (
        <BasicDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          closeDeleteModal={closeDeleteModal}
          closeEditModal={closeEditPartModal}
          deleteItemStart={deletePartsStart}
          modalTitleItemToDelete={modalTitleItemToDelete}
          itemToDelete={partSelected}
        />
      )}
        {isAddCrossReferenceModalOpen && (
        <AddCrossReference
        isAddCrossReferenceModalOpen={isAddCrossReferenceModalOpen}
        closeAddCrossReferenceModal={closeAddCrossReferenceModal}
        updatePartsStart={updatePartsStart}
        partSelected={partSelected}
        />
      )}
        {isEditCrossReferenceModalOpen && (
        <EditCrossReference 
          isEditCrossReferenceModalOpen={isEditCrossReferenceModalOpen}
          closeEditCrossReferenceModal={closeEditCrossReferenceModal}
          updatePartsStart={updatePartsStart}
          partSelected={partSelected}
          editCrossReferencePartIndex={editCrossReferencePartIndex}
        />
      )}
        {isDeleteCrossReferenceModalOpen && (
        <DeleteCrossReference 
          isDeleteCrossReferenceModalOpen={isDeleteCrossReferenceModalOpen}
          closeDeleteCrossReferenceModal={closeDeleteCrossReferenceModal}
          updatePartsStart={updatePartsStart}
          partSelected={partSelected}
          deleteCrossReferencePartIndex={deleteCrossReferencePartIndex}
        />
      )}
        {isInventoryContainerModalOpen && (
        <InventoryContainerList
          isInventoryContainerModalOpen={isInventoryContainerModalOpen}
          closeInventoryContainerModal={closeInventoryContainerModal}
          openAddInventoryContainerModal={openAddInventoryContainerModal}
          inventoryContainers={inventoryContainers}
          openEditInventoryContainerModal={openEditInventoryContainerModal}
        />
      )}
      {isAddInventoryContainerModalOpen && (
        <AddInventoryContainer
          isAddInventoryContainerModalOpen={isAddInventoryContainerModalOpen}
          closeAddInventoryContainerModal={closeAddInventoryContainerModal}
          addInventoryContainerStart={addInventoryContainerStart}
        />
      )}
      {isEditInventoryContainerModalOpen && (
        <EditInventoryContainer 
          isEditInventoryContainerModalOpen={isEditInventoryContainerModalOpen}
          closeEditInventoryContainerModal={closeEditInventoryContainerModal}
          inventoryContainerSelected={inventoryContainerSelected}
          updateInventoryContainerStart={updateInventoryContainerStart}
          openDeleteInventoryContainerModal={openDeleteInventoryContainerModal}
        />
      )}
      {isDeleteInventoryContainerModalOpen && (
        <DeleteInventoryContainer
          isDeleteInventoryContainerModalOpen={isDeleteInventoryContainerModalOpen}
          closeDeleteInventoryContainerModal={closeDeleteInventoryContainerModal}
          closeEditInventoryContainerModal={closeEditInventoryContainerModal}
          deleteInventoryContainerStart={deleteInventoryContainerStart}
          inventoryContainerSelected={inventoryContainerSelected}
        />
      )}
      </div>
  )
  }

  const mapStateToProps = createStructuredSelector({
    //parts catalog
    isPartsCatalogLoaded: selectIsPartsCatalogLoaded,
    partsCatalog: selectPartsCatalogList,
    //tabs
    isTabsLoaded: selectIsTabsLoaded,
    tabs: selectTabsList,
    //containers
    isContainersLoaded: selectIsContainerLoaded,
    inventoryContainers: selectInventoryContainersList,
  });

  const mapDispatchToProps = (dispatch) => ({
    //partsCatalog
    addPartsStart: (parts) => dispatch(addPartsCatalogStart(parts)),
    deletePartsStart: (parts) => dispatch(deletePartsCatalogStart(parts)),
    updatePartsStart: (parts) => dispatch(updatePartsCatalogStart(parts)),
    //inventoryContainers
    addInventoryContainerStart: (container) => dispatch(addInventoryContainerStart(container)),
    deleteInventoryContainerStart: (container) => dispatch(deleteInventoryContainerStart(container)),
    updateInventoryContainerStart: (container) => dispatch(updateInventoryContainerStart(container)),
  })

  export default connect(mapStateToProps, mapDispatchToProps)(PartsCatalog);