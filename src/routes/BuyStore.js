import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { add, list } from "cart-localstorage";

import BuyCard from "../components/BuyCard";

export default function BuyStore() {
  let { id } = useParams();

  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [storeName, setStoreName] = useState("");

  function handleAddProduct(e) {
    console.log(e);
    add({ id: e.id, name: e.product_name, price: e.product_price });
    console.log(list());
  }

  function fetchStoreDetils(storeID) {
    axios
      .get(`https://localmart-api.herokuapp.com/api/prop/${storeID}`)
      .then((res) => {
        console.log(res.data[0]);
        setStoreName(res.data[0].store_name);
      });
  }

  useEffect(() => {
    fetchStoreDetils(id);
    localStorage.setItem("buyStoreID", id);
    getInventory(id);
  }, []);

  async function getInventory(id) {
    let inventory_id = await axios
      .get(`https://localmart-api.herokuapp.com/api/inventory/${id}`)
      .then((res) => {
        return res.data[0].id;
      });

    let invData = await axios
      .get(
        `https://localmart-api.herokuapp.com/api/inventory/products/${inventory_id}`
      )
      .then((res) => {
        return res.data;
      });

    console.log(invData);
    setInventory(invData);
  }

  return (
    <div>
      <h1 className="text-center">{storeName}</h1>
      <div className="container">
        {inventory.map((p, index) => {
          return (
            <div>
              <BuyCard details={p} handleAddProduct={handleAddProduct} />
            </div>
          );
        })}
        <button className="btn btn-primary w-100 mt-5">
          <Link to="/checkout" style={{ color: "white" }}>
            Checkout
          </Link>
        </button>
      </div>
    </div>
  );
}
