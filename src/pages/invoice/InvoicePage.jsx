import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const InvoicePage = (props) => {
  const location = useLocation();

  const [data, setData] = useState({});

  useEffect(() => {
    setData(location.state.dataPackage);
  }, [location]);

  return <div>InvoicePage</div>;
};

export default InvoicePage;
