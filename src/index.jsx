import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './routes/Home';
import About from './routes/About';
import Vans from './routes/Vans';
import VansDetail from './routes/VansDetail';

import "../server"


function App() {
  return (
    
    <BrowserRouter> 
      <div className="page-container">
        <header className="header-section">
          <Navbar/>
        </header>
        
        <main className="main-section">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/vans" element={<Vans/>}/>
            <Route path="vans/:id" element={<VansDetail/>}/>
          </Routes>
        </main>
          
        <footer className="footer-section">
          <Footer/>
        </footer>
      </div>
    </BrowserRouter>
    
      
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);