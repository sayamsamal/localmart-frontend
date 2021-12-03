import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../styles/Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2F5YW1zYW1hbCIsImEiOiJja3NyN2ZhMXkwY3IyMnZwbmlyeHN1ZW9pIn0.vGXLWLHUQ_i4zpBdGkKXGg";

export default function Map(props) {
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
  });

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
      <div className="sidebar">
        Longitude: {props.longitude} | Latitude: {props.latitude} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
