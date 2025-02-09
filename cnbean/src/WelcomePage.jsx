import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import MapComp from "./MapComp";
import welcomeLogo from './assets/welcomeLogo.png'; 
import cnbLogo from './assets/cnbLogo.png'; 

// API Key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function WelcomePage() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const inputRef = useRef(null);  // Input field reference
  const autocompleteRef = useRef(null);  // Google Autocomplete instance
  const navigate = useNavigate();

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
      if (!inputRef.current) return;

      // Initialize Google Autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], 
        componentRestrictions: { country: "us" },
      });

      // Listen for selection from dropdown
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();

        if (!place.geometry || !place.formatted_address) {
          alert("Invalid address. Please select a valid location from the dropdown.");
          return;
        }

        setLocation(place.formatted_address);
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        console.log("Selected Place:", place);
      });

      // Disable browser autocomplete to prevent conflicts
      inputRef.current.setAttribute("autocomplete", "off");
    }).catch((error) => console.error("Error loading Google Maps:", error));
  }, []);

  const handleStart = () => {
    if (location && coordinates) {
      console.log("Starting with location:", location);
      navigate("/home", { state: { location, coordinates } });
      setShowMap(true);
    } else {
      alert("Please enter a valid location.");
    }
  };

  return (
    <div style={styles.container}>
      <img src={cnbLogo} alt="CNB Logo" style={styles.logo} />
      <img src={welcomeLogo} alt="Welcome Logo" style={styles.logoWelcome} />

      <div style={styles.card}>
        <p style={styles.subtitle}>Enter a location to get started:</p>

        <input
          type="text"
          ref={inputRef}  // Attach the input field reference
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
          style={styles.input}
        />

        <button onClick={handleStart} style={styles.button}>
          Show Map
        </button>
      </div>

      {showMap && coordinates && (
        <div style={styles.mapContainer}>
          <MapComp coordinates={coordinates} />
        </div>
      )}
    </div>
  );
}

// Styling remains unchanged
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    minWidth: '90vw',
    backgroundColor: '#add8e6',
    position: 'relative',
    overflow: 'hidden',
  },
  logoWelcome: {
    width: '700px',
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
  },
  logo: {
    width: '500px',
    position: 'absolute',
    top: '20%',
    transform: 'translateY(-50%)',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '350px',
    position: 'absolute',
    top: '65%',  
    transform: 'translateY(-50%)',
    zIndex: '1',
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#666',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#add8e6',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mapContainer: {
    width: '100%',
    height: '50vh',  
    position: 'absolute',
    bottom: '0',
    backgroundColor: '#ffffff',
  },
};