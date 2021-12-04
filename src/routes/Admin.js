import { Link, Outlet } from "react-router-dom";

// import AddStore from "./AddStore";
// import ProductMangement from "./ProductManagement";

export default function Admin({ storeID, inventoryID }) {
  return (
    <div className="container">
      <nav className="text-center">
        <div className="row">
          <div className="col">
            <Link to="add-store" className="btn btn-primary w-100">
              Add Store
            </Link>
          </div>

          <div className="col">
            <Link to="product-management" className="btn btn-primary w-100">
              Inventory
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
