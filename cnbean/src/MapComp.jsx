import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { createBeanMarkers } from "./MapFeatures/BeanMarkers";

// API key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComp = ({ coordinates }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }
    
    // Loader to get the api 
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    if(coordinates) {
    // const loader = new Loader({
    //   apiKey: apiKey,
    //   version: "weekly",
    //   libraries: ["places"],
    // });
  

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 12,
          disableDefaultUI: true,
          gestureHandling: "greedy",
        });
        createBeanMarkers(map); //adds the bean markers on the map
      }
    }).catch((error) => {
      console.error("Error loading Map:", error);
    });
  }
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: "70vw", height: "600px", border: "1px solid black" }} />; //style
};

export default MapComp;
