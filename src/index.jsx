import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './routes/Home';
import About from './routes/About';
import Vans from './routes/Vans';
import VansDetail from './routes/VansDetail';

import "../server"


function App() {
  return (
    
    <BrowserRouter> 
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/vans" element={<Vans/>}/>
            <Route path="vans/:id" element={<VansDetail/>}/>
          </Routes>
          
        <Footer/>
    </BrowserRouter>
    
      
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);