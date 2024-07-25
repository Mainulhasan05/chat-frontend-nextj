"use client";
import React, { useEffect } from "react";

const BootstrapJSLoad = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  return <div></div>;
};

export default BootstrapJSLoad;
