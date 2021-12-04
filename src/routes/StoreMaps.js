import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Stores from "../components/Stores";

export default function StoreMaps() {
  useEffect(() => {
    let inventoryID = localStorage.getItem("inventoryID");
    let storeID = localStorage.getItem("storeID");
  }, []);

  return (
    <div className="container mt-5">
      <div className="row g-3">
        <Stores />
      </div>
      {/* <a href="https://www.freepik.com/vectors/business">
        Business vector created by freepik - www.freepik.com
      </a> */}
    </div>
  );
}
