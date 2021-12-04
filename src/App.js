import "./App.css";

import { Routes, Route } from "react-router-dom";
import mapboxgl from "mapbox-gl";

import Home from "./routes/Home";
import Admin from "./routes/Admin";
import AddStore from "./routes/AddStore";
import ProductMangement from "./routes/ProductManagement";
import User from "./routes/User";
import BuyStore from "./routes/BuyStore";
import CheckOut from "./routes/CheckOut";
import NavBar from "./components/NavBar";

mapboxgl.prewarm();

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="add-store" element={<AddStore />} />
          <Route path="product-management" element={<ProductMangement />} />
        </Route>
        <Route path="user" element={<User />} />
        <Route path="store/:id" element={<BuyStore />} />
        <Route path="checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;
