// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Use HashRouter
import ScrollToTop from './components/ScrollToTop';

// Pages
import Events from './pages/Events';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Contact from './pages/Contact';

// Components
import Navbar from './components/NavBar';
import Footer from './components/Footer';




function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be displayed across all pages */}
      <div className="App">
      <ScrollToTop />
        <Routes> {/* Define the Routes */}
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/events" element={<Events />} /> {/* Events route */}
          <Route path="/resources" element={<Resources />} /> {/* Resources route */}
          <Route path="/community" element={<Community />} /> {/* Community route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
