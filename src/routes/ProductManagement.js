import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductManagement({ storeID, inventoryID }) {
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let inventoryID = localStorage.getItem("inventoryID");
    fetchProducts(inventoryID);
  }, []);

  async function fetchProducts(inventoryID) {
    await axios
      .get(
        `https://localmart-api.herokuapp.com/api/inventory/products/${inventoryID}`
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  function handleAddProduct(e) {
    e.preventDefault();
    let inventoryID = localStorage.getItem("inventoryID");
    let prodDetails = {
      product_name: prodName,
      product_price: price,
      inventory_id: inventoryID,
    };

    console.log(prodDetails);

    axios
      .post("https://localmart-api.herokuapp.com/api/product", prodDetails)
      .then((res) => {
        console.log(res.data);
      });

    setProdName("");
    setPrice(0);
  }

  return (
    <div className="container">
      <h1>Product Management</h1>

      <div class="row g-3 mt-5">
        <div class="col-md-8">Product Name</div>
        <div class="col-md-2">Price</div>
      </div>

      <form
        class="row g-3 mt-2"
        onSubmit={(e) => {
          handleAddProduct(e);
        }}
      >
        {/* <label for="addproduct" class="form-label">
          Add Product
        </label> */}
        <div class="col-md-8">
          <input
            type="text"
            class="form-control"
            id="addproduct"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
          />
        </div>
        <div class="col-md-2">
          <input
            type="number"
            class="form-control"
            id="quanity"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
