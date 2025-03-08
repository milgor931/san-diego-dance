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
import ResourcePageTemplate from './components/ResourcePageTemplate';

const resources = [
  { name: "Education", link: "/education", tag: "education", image: "https://live.staticflickr.com/65535/54366553673_ab740a106f_n.jpg" },
  { name: "Spaces", link: "/spaces", tag: "spaces", image: "https://live.staticflickr.com/65535/54365451977_62c35d64a1_n.jpg" },
  { name: "Jobs", link: "/jobs", tag: "job", image: "https://live.staticflickr.com/65535/54365451947_a39223c97b_n.jpg" },
  { name: "Organizations", link: "/organizations", tag: "organization", image: "https://live.staticflickr.com/65535/54365451942_230b107e5d_n.jpg" },
  { name: "Programs", link: "/programs", tag: "program", image: "https://live.staticflickr.com/65535/54366528959_3d829f189c_n.jpg" },
  { name: "Performance Opportunities", link: "/performance-opportunities", tag: "performance-opportunity", image: "https://live.staticflickr.com/65535/54372511434_ece6abe1c5_w.jpg" },
  { name: "Grants", link: "/grants", tag: "grant", image: "https://live.staticflickr.com/65535/54365451972_1b157a8671_n.jpg" },
]

function App() {
  return (
    <Router>
      <Navbar resourceLinks={resources} /> {/* The Navbar will be displayed across all pages */}
      <div className="App">
      <ScrollToTop />
        <Routes> {/* Define the Routes */}
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/events" element={<Events />} /> {/* Events route */}
          <Route path="/resources" element={<Resources resourceLinks={resources} />} /> {/* Resources route */}
          <Route path="/community" element={<Community />} /> {/* Community route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
          
          {/* Resources */}
          { resources.map((resource, index) => 
             <Route key={index} path={resource.link} element={<ResourcePageTemplate title={resource.name} tag={resource.tag} />} />
          )}
          </Routes>
      </div>
      <Footer resourceLinks={resources} />
    </Router>
  );
}

export default App;
