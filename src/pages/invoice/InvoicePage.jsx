import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

import { connect } from "react-redux";
import { addInvoiceStart } from "../../redux/invoices/invoices.actions";

import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

import Container from "@material-ui/core/Container";

import BillableItems from "./billable-items/BillableItems";
import { Grid } from "@material-ui/core";
import InvoiceBilling from "./billing/InvoiceBilling";
import CompanyInformation from "./company-information/CompanyInformation";
import InvoiceCustomerInformation from "./customer-information/InvoiceCustomerInformation";
import EquipmentList from "./equipment-list/EquipmentList";
import InvoiceNumber from "./invoice-number/InvoiceNumber";
import LaborList from "./labor/LaborList";
import InvoiceSignature from "./signature/InvoiceSignature";
import WorkDescription from "./work-description/WorkDescription";
import WarrantyTotalsFrame from "./WarrantyTotalsFrame";
import BottomButtons from "./invoice-utilities/BottomButtons";
import CreateDispatch from "../add-client-activity/modals/CreateDispatch";

const InvoicePage = ({ addInvoiceStart }) => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [data, setData] = useState({});
  const [invoiceId, setInvoiceId] = useState("");

  //Save The Invoice
  const [isInvoiceSaved, setInvoiceToSaved] = useState(false);

  const saveInvoice = () => {
    //TODO compare this invoice with any that are existing

    const docForId = firebase.firestore().collection("invoices").doc();
    const generatedInvoiceId = docForId.id;
    setInvoiceId(generatedInvoiceId);

    const newInvoice = {
      balanceDue: data.balanceDue,
      client: data.client,
      disclaimerRed: data.disclaimerRed,
      equipmentBrand: data.equipmentBrand,
      equipmentModel: data.equipmentModel,
      equipmentName: data.equipmentName,
      equipmentSerial: data.equipmentSerial,
      halfDown: data.halfDown,
      invoiceNumberPrefix: data.invoiceNumberPrefix,
      isPreDefinedQuote: data.isPreDefinedQuote,
      laborHours: data.laborHours,
      laborRate: data.laborRate,
      maintenance: data.maintenance,
      partsList: data.partsList,
      quickShippingRate: data.quickShippingRate,
      quickShippingTime: data.quickShippingTime,
      quoteDate: data.quoteDate,
      rediagnostic: data.rediagnostic,
      regularShippingRate: data.regularShippingRate,
      regularShippingTime: data.regularShippingTime,
      selectedDiscount: data.selectedDiscount,
      selectedShipping: data.selectedShipping,
      shippingNotes: data.shippingNotes,
      subTotalOfInvoice: data.subTotalOfInvoice,
      totalDiscounts: data.totalDiscounts,
      totalLabor: data.totalLabor,
      totalMaintenance: data.totalMaintenance,
      totalPartsCost: data.totalPartsCost,
      totalPartsRetailCost: data.totalPartsRetailCost,
      totalPartsTax: data.totalPartsTax,
      totalQuote: data.totalQuote,
      totalRediagnostic: data.totalRediagnostic,
      totalShipping: data.totalShipping,
      userCreatedInvoiceNumber: data.userCreatedInvoiceNumber,
      workDescription: data.workDescription,
    };
    console.log("newInvoice: ", newInvoice);
    console.log("generatedId: ", generatedInvoiceId);
    addInvoiceStart(newInvoice);
    setInvoiceToSaved(true);
    enqueueSnackbar("Invoice Saved!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  //Create Dispatch
  const [isCreateDispatchModalOpen, setCreateDispatchModalOpen] =
    useState(false);
  const openCreateDispatchModal = () => {
    setCreateDispatchModalOpen(true);
  };
  const closeCreateDispatchModal = () => {
    setCreateDispatchModalOpen(false);
  };
  const dispatchCreationSuccessIndicator = () => {
    enqueueSnackbar("Dispatch Added!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  };

  useEffect(() => {
    setData(location.state.dataPackage);
  }, [location]);

  return (
    <Container>
      <Grid container>
        {/* **Left side** */}
        <Grid item xs={6}>
          <CompanyInformation />
          {data.client && <InvoiceCustomerInformation data={data} />}
          {data.equipmentName && <EquipmentList data={data} />}
          {data.partsList && <BillableItems data={data} />}
          <LaborList data={data} />
          <InvoiceSignature data={data} />
        </Grid>

        {/* **Right Side** */}
        <Grid item xs={6}>
          {data.invoiceNumberPrefix && <InvoiceNumber data={data} />}
          <WorkDescription data={data} />
          {data.balanceDue && <InvoiceBilling data={data} />}
          <WarrantyTotalsFrame data={data} />
        </Grid>
        <BottomButtons
          openCreateDispatchModal={openCreateDispatchModal}
          isInvoiceSaved={isInvoiceSaved}
          saveInvoice={saveInvoice}
        />
        {isCreateDispatchModalOpen && (
          <CreateDispatch
            isCreateDispatchModalOpen={isCreateDispatchModalOpen}
            closeCreateDispatchModal={closeCreateDispatchModal}
            client={data.client}
            invoiceData={data}
            invoiceId={invoiceId}
            dispatchCreationSuccessIndicator={dispatchCreationSuccessIndicator}
          />
        )}
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addInvoiceStart: (data) => dispatch(addInvoiceStart(data)),
});

export default connect(null, mapDispatchToProps)(InvoicePage);
