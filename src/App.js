import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Navbar} from "./Components/Layout/Navbar"
import {HomePage} from './Routes/HomePage';
import {AboutPage} from './Routes/AboutPage';
import {NotFoundPage} from './Routes/NotFoundPage';
import {Footer} from "./Components/Layout/Footer"
     // Import the functions you need from the SDKs you need
     import { initializeApp } from "firebase/app";
     import { getAnalytics } from "firebase/analytics";
import { ReportProvider } from './Context/Report/ReportContext';
import { CreateReportPage } from './Routes/CreateReportPage';
     
function App() {

  // TODO: Add SDKs for Firebase products that you want to use
     // https://firebase.google.com/docs/web/setup#available-libraries
     
     // Your web app's Firebase configuration
     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
     const firebaseConfig = {
      apiKey: "AIzaSyBmGGOD3WXa5Cbax_LnQuW9aE-8b3fuFhk",
      authDomain: "dwtproject-75c16.firebaseapp.com",
      projectId: "dwtproject-75c16",
      storageBucket: "dwtproject-75c16.appspot.com",
      messagingSenderId: "738553500575",
      appId: "1:738553500575:web:5818717f58c32a8e7e23aa",
      measurementId: "G-23PZJGCDK2"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  return (

    <ReportProvider>
    <Router>
    <div className="flex flex-col justify-between h-screen">
    <Navbar />

    <main className="container mx-auto px-3 pb-12">
    

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/createreport" element={<CreateReportPage />} />
           <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />



       


      </Routes>
    </main>
  <Footer/>

  </div>
</Router>
</ReportProvider>
  );
}

export default App;
