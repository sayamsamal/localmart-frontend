import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductManagement() {
  const [prodName, setProdName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState();

  useEffect(() => {
    let inventoryID = localStorage.getItem("inventoryID");
    let storeID = localStorage.getItem("storeID");
    fetchStoreDetils(storeID);
    fetchProducts(inventoryID);
  }, []);

  function fetchStoreDetils(storeID) {
    axios
      .get(`https://localmart-api.herokuapp.com/api/prop/${storeID}`)
      .then((res) => {
        console.log(res.data[0]);
        setStoreName(res.data[0].store_name);
      });
  }

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
    let productPriceinPaisa = Math.trunc(price * 100);
    let inventoryID = localStorage.getItem("inventoryID");
    let prodDetails = {
      product_name: prodName,
      product_price: productPriceinPaisa,
      inventory_id: JSON.parse(inventoryID),
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
      <h1 className="text-center">{storeName}</h1>
      <h2 className="display-6">Product Management</h2>

      <div class="row g-3 mt-5">
        <div class="col-md-8">Product Name</div>
        <div class="col-md-2">Price</div>
      </div>

      <div
        className="fixed-bottom p-4 primary"
        style={{ backgroundColor: "#2D2D2D" }}
      >
        <form
          class="row g-3"
          onSubmit={(e) => {
            handleAddProduct(e);
          }}
        >
          {/* <label for="addproduct" class="form-label">
          Add Product
        </label> */}
          <div class="col-12" style={{ color: "white" }}>
            Add Products
          </div>
          <div class="col-md-8">
            <input
              type="text"
              class="form-control"
              id="addproduct"
              value={prodName}
              placeholder="Enter Product Name"
              onChange={(e) => setProdName(e.target.value)}
            />
          </div>
          <div class="col-md-2">
            <input
              type="number"
              step="0.01"
              min="0"
              class="form-control"
              id="price"
              value={price}
              placeholder="Enter Price"
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
    </div>
  );
}
