import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import axios from 'axios'; // To handle API calls

const response = await axios.post('mongodb://localhost:27017', {
  email,
  password,
});

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // State to store user profile info
  const navigate = useNavigate();

  // Function to fetch user profile after login
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Store user data
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store JWT token
      setShowLogin(false); // Close login popup
      fetchUserProfile(); // Fetch user data
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setUser(null); // Clear user data
    navigate('/'); // Redirect to home
  };

  // Fetch profile on initial load if token exists
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} handleLogin={handleLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={user ? <PlaceOrder /> : <Home />} // Redirect if not logged in
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
