import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

// API key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComp = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }

    // Loader to get the api 
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly", // Use the latest stable version
      libraries: ["places"], // You can add more libraries if needed
    });

    loader.load().then(() => {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 23, lng: 0 }, //the map position (can change this to make it new jersey)
          zoom: 3, 
          disableDefaultUI: true,
          gestureHandling: "greedy", // has zooms
        });
      }
    }).catch((error) => {
      console.error("Error loading Map:", error);
    });

  }, []);

  return <div ref={mapRef} style={{ width: "100vw", height: "400px", border: "1px solid black" }} />; //style
};

export default MapComp;
