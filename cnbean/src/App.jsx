import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './SignInPage';  // Import SignInPage
import WelcomePage from './WelcomePage'; // Import WelcomePage
import HomePage from './HomePage'; // Import HomePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} /> {/* Sign In Page */}
        <Route path="/welcome" element={<WelcomePage />} /> {/* Welcome Page */}
        <Route path="/home" element={<HomePage />} /> {/* Home Page */}
      </Routes>
    </Router>
  );
}

export default App;
