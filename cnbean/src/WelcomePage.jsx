import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for programmatic navigation
import { Loader } from "@googlemaps/js-api-loader";
import MapComp from "./MapComp";  // Import MapComp component
import welcomeLogo from './assets/welcomeLogo.png'; 
import cnbLogo from './assets/cnbLogo.png'; 


// API Key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function WelcomePage() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false); // New state to control map visibility
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate

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
      // Navigate to HomePage with coordinates and location as state
      navigate("/home", {
        state: { location: location, coordinates: coordinates },
      });
      setShowMap(true);  // Show the map only when the button is clicked
    } else {
      alert("Please enter a valid location.");
    }
  };

  return (
    <div style={styles.container}>
      <img src={cnbLogo} alt="CNB Logo" style={styles.logo} /> {}
      <img src={welcomeLogo} alt="Welcome Logo" style={styles.logoWelcome} />

      
      <div style={styles.card}>
        <p style={styles.subtitle}>Enter a location to get started:</p>
        
        <input
          type="text"
          ref={autocompleteRef}
          placeholder="Enter a location"
          style={styles.input}
        />

        <button
          onClick={handleStart}
          style={styles.button}
        >
          Show Map
        </button>
      </div>
      
      {/* Only show the map when showMap is true */}
      {showMap && coordinates && (
        <div style={styles.mapContainer}>
          <MapComp coordinates={coordinates} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Align items to the top
    alignItems: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
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
    top: '65%',  // Move card up to position it higher in the view
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
    height: '50vh',  // Give the map container a height for visibility
    position: 'absolute',
    bottom: '0',
    backgroundColor: '#ffffff',
  },
};
