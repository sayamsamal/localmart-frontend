import { Link, Outlet } from "react-router-dom";

// import AddStore from "./AddStore";
// import ProductMangement from "./ProductManagement";

export default function Admin({ storeID, inventoryID }) {
  return (
    <div>
      <nav>
        <Link to="add-store">Add Store</Link>
        <Link to="product-management">Inventory</Link>
      </nav>
      <div>
        <Outlet />
      </div>
      <button
        onClick={(e) => {
          alert(storeID);
          alert(inventoryID);
        }}
      >
        Click me!
      </button>
    </div>
  );
}
