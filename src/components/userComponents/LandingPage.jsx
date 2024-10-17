import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'; 
import './css/landingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main className="hero-section">
        <div className="hero-text">
          <h1>Welcome to LinkedIn</h1>
          <p>Connect with professionals around the world.</p>
          <div className="hero-buttons">
            <NavLink to="/register" className="btn btn-primary">Join Now</NavLink>
            <NavLink to="/login" className="btn btn-secondary">Sign In</NavLink>
          </div>
        </div>
        <div className="hero-image">
          <img src="hero-image-url.jpg" alt="Networking" />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 LinkedIn Corporation</p>
      </footer>
    </div>
  );
};

export default LandingPage;
