import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './signInPage';  // Import SignInPage
import WelcomePage from './WelcomePage'; // Import WelcomePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} /> {/* Sign In Page */}
        <Route path="/welcome" element={<WelcomePage />} /> {/* Welcome Page */}
      </Routes>
    </Router>
  );
}

export default App;
