import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import "../styles/Admin.css";
import Order from "./Order";
import { States } from "../data/states";

const AddStore = () => {
  const [lng, setLng] = useState(85.80884255117307);
  const [lat, setLat] = useState(20.33);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postal, setPostal] = useState(null);
  const [state, setState] = useState(null);

  let navigate = useNavigate();

  var prop_data = {
    store_name: name,
    phone_number: phone,
    store_adress: address,
    store_city: city,
    store_state: state,
    store_postal_code: postal,
  };

  var geo_data = {
    coordinates: [lng, lat],
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const [firstResponse, secondResponse] = await Promise.all([
      axios
        .post("https://localmart-api.herokuapp.com/api/prop", prop_data)
        .then((res) => {
          console.log(res.data.id);
          return res.data.id;
        })
        .catch((err) => {
          console.log(err);
        }),
      axios
        .post("https://localmart-api.herokuapp.com/api/geo", geo_data)
        .then((res) => {
          console.log(res.data.id);
          return res.data.id;
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);

    var store_data = {
      geometry: secondResponse,
      properties: firstResponse,
    };

    console.log(store_data);
    let storeID = await axios
      .post("https://localmart-api.herokuapp.com/api/store", store_data)
      .then((res) => {
        localStorage.setItem("storeID", res.data.id);
        return res.data.id;
      });

    var inventory_data = {
      store_id: storeID,
    };

    await axios
      .post("https://localmart-api.herokuapp.com/api/inventory", inventory_data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("inventoryID", res.data.id);
        navigate("../product-management");
      });
  }

  return (
    <div className="store-add">
      {/* <div>
        JSON Structure:
        <div style={{ textAlign: "left", marginLeft: "45%" }}>
          <pre>{JSON.stringify(prop_data, null, 2)}</pre>
          <pre>{JSON.stringify(geo_data, null, 2)}</pre>
        </div>
      </div> */}
      <div className="container text-start">
        <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
          <div class="col-md-6">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="John Doe"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="phone" class="form-label">
              Phone
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="+911234567890"
              value={phone}
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div class="col-12">
            <label for="address" class="form-label">
              Address
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="House No. 123, Street Name"
              value={address}
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="col-12">
            <label for="city" class="form-label">
              City
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Bhubaneswar"
              value={city}
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="state" class="form-label">
              State
            </label>
            <select
              class="form-select"
              aria-label="Select State"
              onChange={(e) => setState(e.target.value)}
            >
              {States.map((state) => {
                return (
                  <option value={state} key={state}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            {/* <input
              class="form-control"
              type="text"
              placeholder="Odisha"
              value={state}
              id="state"
              onChange={(e) => setState(e.target.value)}
            /> */}
          </div>
          <div class="col-md-6">
            <label for="postal" class="form-label">
              Postal Code
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="11101"
              value={postal}
              id="postal"
              onChange={(e) => setPostal(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label for="map" class="form-label">
              Select your location on the Map:
            </label>
            <Map
              latitude={lat}
              onLatChange={setLat}
              longitude={lng}
              onLongChange={setLng}
              id="map"
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100">
              Add Store
            </button>
          </div>
        </form>
      </div>
      <div>mapbox</div>
      <Order />
    </div>
  );
};

export default AddStore;
