import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function HomePage() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!state || !state.coordinates) {
      console.error("No location data found. Redirecting...");
      return;
    }

    const { coordinates } = state;

    if (!apiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 12,
        });

        markerRef.current = new window.google.maps.Marker({
          position: coordinates,
          map: map,
        });
      }
    }).catch((error) => console.error("Error loading Google Maps:", error));
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Home Page</h1>
      <p className="text-gray-600 mb-4">
        Viewing location: <strong>{state?.location || "Unknown"}</strong>
      </p>

      <div
        ref={mapRef}
        style={{ width: "80vw", height: "400px", border: "1px solid black" }}
      />
    </div>
  );
}