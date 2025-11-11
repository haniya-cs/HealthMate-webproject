import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import BMI from "./pages/BMI";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css"
import Dietplan from "./pages/Dietplan";
import Nutrition from "./pages/Nutrition";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import Home from './pages/Home.js';
import Login from "./Components/Login.js";

const App = () => {

  return (
   
    <div className="App">
      <title>HealthMate</title>
     <BrowserRouter>
     <Navbar/>
     
     <Routes>
    <Route path ="/" element={<Home/>}/>
    <Route path ="/bmi" element={<BMI/>}/>
    <Route path ="/dietplan" element={<Dietplan/>}/>
    <Route path ="/nutrition" element={<Nutrition/>}/>
    <Route path ="/about" element={<About/>}/>
    <Route path ="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>

   <Footer/>
     </BrowserRouter>


 
    </div>


  
  );

}
export default App;