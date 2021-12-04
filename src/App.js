import "./App.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import mapboxgl from "mapbox-gl";

import Home from "./routes/Home";
import Admin from "./routes/Admin";
import AddStore from "./routes/AddStore";
import ProductMangement from "./routes/ProductManagement";

mapboxgl.prewarm();

function App() {
  const [storeID, setStoreID] = useState(0);
  const [inventoryID, setInventoryID] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="admin"
        element={<Admin storeID={storeID} inventoryID={inventoryID} />}
      >
        <Route
          path="add-store"
          element={
            <AddStore setStoreID={setStoreID} setInventoryID={setInventoryID} />
          }
        />
        <Route
          path="product-management"
          element={
            <ProductMangement storeID={storeID} inventoryID={inventoryID} />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
