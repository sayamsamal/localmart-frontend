import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../styles/Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2F5YW1zYW1hbCIsImEiOiJja3NyN2ZhMXkwY3IyMnZwbmlyeHN1ZW9pIn0.vGXLWLHUQ_i4zpBdGkKXGg";

export default function StoresMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    showAccuracyCircle: false,
    trackUserLocation: true,
    showUserHeading: true,
  });

  const marker = new mapboxgl.Marker({
    draggable: true,
  }).setLngLat([props.longitude, props.latitude]);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        props.onLatChange(position.coords.latitude);
        props.onLongChange(position.coords.longitude);
      });
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [props.longitude, props.latitude],
      zoom: zoom,
    });

    marker.addTo(map.current);

    map.current.addControl(geolocate);

    map.current.on("load", () => {
      map.current.addSource("places", {
        type: "geojson",
        data: storeList,
      });
    });
  });

  const storeList = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-20.33245390817005, 85.80876978356315],
        },
        properties: {
          id: "1829-2929-9872",
          name: "A Grocery Store",
          phone: "9857897653",
          address: "VIM 234, Phase 6, Sailashree Vihar",
          city: "Bhubaneswar",
          postalCode: "751021",
          state: "Odisha",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.049766, 38.900772],
        },
        properties: {
          id: "1829-2929-9873",
          name: "B Grocery Store",
          phone: "9857897875",
          address: "VIM 204, Phase 6, Sailashree Vihar",
          city: "Bhubaneswar",
          postalCode: "751021",
          state: "Odisha",
        },
      },
    ],
  };

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      map.current.jumpTo({
        center: [props.longitude, props.latitude],
        zoom: 16,
        essential: true,
      });
      geolocate.trigger();
    });

    map.current.on("move", () => {
      props.onLongChange(map.current.getCenter().lng.toFixed(4));
      props.onLatChange(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      marker.setLngLat(map.current.getCenter());
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
