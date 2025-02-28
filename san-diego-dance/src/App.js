// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Use HashRouter
import Events from './Events';
import Home from './Home';
import Navbar from './NavBar'; // Your Navbar component

function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be displayed across all pages */}
      <div className="App">
        <Routes> {/* Define the Routes */}
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/events" element={<Events />} /> {/* Events route */}
          {/* <Route path="/contact" element={<Contact />} /> Contact route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
