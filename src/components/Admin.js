import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";

const Admin = () => {
  const [lng, setLng] = useState(85.80884255117307);
  const [lat, setLat] = useState(20.33);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postal, setPostal] = useState(null);
  const [state, setState] = useState(null);

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
        .post("http://localhost:8000/api/prop", prop_data)
        .then((res) => {
          console.log(res.data.id);
          return res.data.id;
        })
        .catch((err) => {
          console.log(err);
        }),
      axios
        .post("http://localhost:8000/api/geo", geo_data)
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
    await axios
      .post("http://localhost:8000/api/store", store_data)
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="admin">
      <Map
        latitude={lat}
        onLatChange={setLat}
        longitude={lng}
        onLongChange={setLng}
      />
      <div>
        JSON Structure:
        <div style={{ textAlign: "left", marginLeft: "45%" }}>
          <pre>{JSON.stringify(prop_data, null, 2)}</pre>
          <pre>{JSON.stringify(geo_data, null, 2)}</pre>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="phone">Phone: </label>
        <input
          type="text"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />

        <label htmlFor="address">Address: </label>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <label htmlFor="name">City: </label>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />

        <label htmlFor="name">Postal Code: </label>
        <input
          type="text"
          placeholder="postalcode"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
        <br />

        <label htmlFor="name">State: </label>
        <input
          type="text"
          placeholder="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />

        {/* <label htmlFor="latitude">Latitude: </label>
        <input type="text" placeholder="latitude" value={lat} />
        <br />

        <label htmlFor="longitude">Latitude: </label>
        <input type="text" placeholder="longitude" value={lng} /> */}
        <button type="submit">Submit</button>
      </form>
      <div>mapbox</div>
    </div>
  );
};

export default Admin;
