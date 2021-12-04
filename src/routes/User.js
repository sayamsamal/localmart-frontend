import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import StoresMap from "./StoresMap";
import StoresCard from "../components/StoresCard";
import axios from "axios";

export default function User() {
  const [lng, setLng] = useState(85.80884255117307);
  const [lat, setLat] = useState(20.33);
  const [properties, setProperties] = useState();
  const [storeList, setStoreList] = useState();
  const [cards, setCards] = useState();

  useEffect(() => {
    let inventoryID = localStorage.getItem("inventoryID");
    let storeID = localStorage.getItem("storeID");
    fetchStores();
  }, []);

  async function fetchStores() {
    let data = await axios
      .get("https://localmart-api.herokuapp.com/api/stores")
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    let stores = data.Stores;
    let properties = data.Properties;
    setCards(
      properties.map((property, index) => {
        return (
          <Link to="">
            <div className="col-6">
              <StoresCard details={property} />
            </div>
          </Link>
        );
      })
    );
    let geometry = data.Geometry;

    let featureslist = [];
    featureslist = stores.map((Store, index) => {
      return {
        type: "Feature",
        geometry: geometry[index],
        properties: properties[index],
      };
    });

    let storesListData = {
      type: "FeatureCollection",
      features: featureslist,
    };
    setStoreList(storesListData);
  }

  return (
    <div className="container mt-5">
      <div className="row g-3">{cards}</div>
      <StoresMap
        storeList={storeList}
        latitude={lat}
        onLatChange={setLat}
        longitude={lng}
        onLongChange={setLng}
      />
      {/* <a href="https://www.freepik.com/vectors/business">
        Business vector created by freepik - www.freepik.com
      </a> */}
    </div>
  );
}
