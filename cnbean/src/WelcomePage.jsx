import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import MapComp from "./MapComp";  // Import MapComp component

// API Key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function WelcomePage() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
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
      if (autocompleteRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
          types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            setLocation(place.formatted_address);
            const newCoordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            setCoordinates(newCoordinates);
            console.log("Selected Coordinates:", newCoordinates); // Debugging output
          }
        });
      }
    }).catch((error) => console.error("Error loading Google Maps:", error));
  }, []);

  const handleStart = () => {
    if (location && coordinates) {
      console.log("Starting with location:", location);
      // Optionally display or pass coordinates to another component (e.g., MapComp)
    } else {
      alert("Please enter a valid location.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ora ge-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold text-white-800 mb-4">Welcome to Couch n Bean!</h1>
        <p className="text-gray-600 mb-4">Enter a location to get started:</p>

        <input
          type="text"
          ref={autocompleteRef}
          placeholder="Enter a location"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleStart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Show Map
        </button>

        {/* Show the map if coordinates are available */}
        {coordinates && <MapComp coordinates={coordinates} />}
      </div>
    </div>
  );
}
