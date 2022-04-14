import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Navbar} from "./Components/Layout/Navbar"
import {HomePage} from './Routes/HomePage';
import {AboutPage} from './Routes/AboutPage';
import {NotFoundPage} from './Routes/NotFoundPage';
import {Footer} from "./Components/Layout/Footer"

function App() {
  return (
    <Router>
    <div className="flex flex-col justify-between h-screen">
    <Navbar />

    <main className="container mx-auto px-3 pb-12">
    

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />



       


      </Routes>
    </main>
  <Footer/>

  </div>
</Router>
  );
}

export default App;
