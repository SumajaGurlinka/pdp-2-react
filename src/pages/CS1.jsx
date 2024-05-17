import React from "react";
import Dashboard from "./Dashboard";
import CS from "./CS";
import { useContext, useEffect, useState } from "react";
import { Store } from "../StateProvider";

const CS1 = () => {
    const { state, dispatch } = useContext(Store);
  return (
    <>
      <Dashboard />
      {state?.selectedProject && (
      <CS />
      )}
    </>
  );
};

export default CS1;
