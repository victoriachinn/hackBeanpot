import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import welcomeLogo from './assets/cnbLogo.png'; // You can use the same logo as on the WelcomePage

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function HomePage() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate("/welcome");
  };

  return (
    <div style={styles.container}>
      <img src={welcomeLogo} alt="CNB Logo" style={styles.logo} />
      
      <div style={styles.card}>
        <p style={styles.subtitle}>
          Viewing location: <strong>{state?.location || "Unknown"}</strong>
        </p>
        
        <button onClick={handleBack} style={styles.button}>Back to Welcome</button>
      </div>

      {/* Move map outside of the card */}
      <div
        ref={mapRef}
        style={styles.map}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: '#add8e6',
    position: 'relative',
    overflow: 'hidden', 
  },
  logo: {
    width: '400px',
    position: 'absolute',
    top: '10%',
    transform: 'translateY(-50%)',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '350px',
    height: '100px',
    position: 'absolute',
    top: '12.5%',
    transform: 'translateY(50%)',
    zIndex: '1',
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#666',
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
    marginTop: '10px',
  },
  map: {
    width: "80vw",
    height: "400px",
    border: "1px solid black",
    bottom: '20%',
    marginTop: "300px",  // Add some margin between card and map
  }
};
