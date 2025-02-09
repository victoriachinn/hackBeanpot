import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cnbLogo from './assets/cnbLogo.png'; 
import cnbTitle from './assets/cnbeanTitle.png'; 


export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username === 'beans' && password === 'SJKDENVKLSDVJN') {
      navigate('/welcome');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <img src={cnbLogo} alt="CNB Logo" style={styles.logo} /> {}
      <img src={cnbTitle} alt="CNB Title" style={styles.logoTitle} /> {}
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignIn} style={styles.button}>Sign In</button>
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
    minHeight: '100vh', // Full viewport height
    minWidth: '100vw', // Full viewport width
    backgroundColor: '#add8e6',
    position: 'relative',
    overflow: 'hidden', 
  },
  logo: {
    width: '500px',
    position: 'absolute',
    top: '15%',
    transform: 'translateY(-50%)',
  },
  logoTitle: {
    width: '500px',
    position: 'absolute',
    top: '35%',
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
    bottom: '35%', // Position in the lower third
    transform: 'translateY(50%)',
    zIndex: '1',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid black', // Black border
    backgroundColor: 'white', // White background
    color: 'black', // Black text
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#add8e6', // Light blue background
    color: 'black', // Black text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};