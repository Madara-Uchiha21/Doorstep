import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { loginUser } from '../../services/authService';

const LoginPopup = ({setShowLogin}) => {

  const [currState,setCurrState] = useState("Sign Up")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await loginUser(email, password); // Call the service function
      console.log('Login successful!', data);
      
      // Store token in local storage
      localStorage.setItem('authToken', data.token);
      
      setShowLogin(false); // Close the popup on successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };
  
  const handleClick = () => {
    if (currState === "Login") {
      handleSubmit(); // Trigger login on click if in "Login" state
    } else {
      console.log('Sign Up functionality here');
      // Add signup logic if needed
    }
  };
  
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input type="text" placeholder='Enter Name' required />}
          <input type="text" placeholder='Enter Email' value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Enter Password' value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button onClick={handleClick}>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
          ?<p>Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Click here</span></p>
          :<p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
