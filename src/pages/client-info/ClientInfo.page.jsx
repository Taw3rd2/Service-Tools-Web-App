import React, { useState, useEffect, lazy, Suspense } from "react";
import firebase from "firebase/app";

const ServiceCustomer = lazy(() => import("./view/ServiceCustomer"));
const NoServiceCustomer = lazy(() => import("./view/NoServiceCustomer"));
const NoCustomerLoaded = lazy(() =>
  import("../../components/no-customer-loaded/NoCustomerLoaded")
);

const ClientInfo = ({
  client,
  openEditClientModal,
  openEditBillingModal,
  openEquipmentListModal,
  getCurrentClient,
}) => {
  const [customer, setCustomer] = useState({ id: "" });

  useEffect(() => {
    if (client.id === "") {
      setDefaultCustomerInfo();
    } else {
      let unsubscribe = firebase
        .firestore()
        .collection("customers")
        .doc(client.id)
        .onSnapshot((client) => {
          let newClient = client.data();
          newClient.id = client.id;
          setCustomer(newClient);
        });
      return () => unsubscribe();
    }
  }, [client]);

  const setDefaultCustomerInfo = () => {
    console.log("No customer loaded");
  };

  if (customer.id === "" || client.id === "") {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <NoCustomerLoaded />
      </Suspense>
    );
  } else if (customer.noService) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <NoServiceCustomer
          customer={customer}
          openEditClientModal={openEditClientModal}
          openEditBillingModal={openEditBillingModal}
          openEquipmentListModal={openEquipmentListModal}
          getCurrentClient={getCurrentClient}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <ServiceCustomer
          customer={customer}
          openEditClientModal={openEditClientModal}
          openEditBillingModal={openEditBillingModal}
          openEquipmentListModal={openEquipmentListModal}
          getCurrentClient={getCurrentClient}
        />
      </Suspense>
    );
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   deleteClient: (client) => dispatch(deleteClient(client)),
// });

export default ClientInfo;
