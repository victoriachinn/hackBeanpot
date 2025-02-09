import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import welcomeLogo from './assets/cnbLogo.png'; // Use the same logo as on the WelcomePage
import MapComp from "./MapComp";
import "./css/index.css";

export default function HomePage() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();


  if (!state || !state.coordinates) {
    console.error("No location data found. Redirecting...");
    return null;
  }

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
      <div style={{marginBottom:'5px'}}>
      <MapComp coordinates={state.coordinates} />
      </div>
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
      width: '300px',
      marginTop: '80px',
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      width: '350px',
      height: 'auto',
      marginTop: '0px',
      marginBottom: '30px',
      zIndex: '1',
    },
    subtitle: {
      marginBottom: '10px',
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
      width: "85vw",
      height: "500px",
      border: "1px solid black",
      marginTop: '120px', 
    }
  };
  
  