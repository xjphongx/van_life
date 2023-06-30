import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './routes/Home';
import About from './routes/About';
import Vans from './routes/Vans';

import "../server"


function App() {
  return (
    <div className="page-container">
      <BrowserRouter> 
        <header>
          <Navbar/>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/vans" element={<Vans/>}/>
          </Routes>
        </main>
          
        <footer>
          <Footer/>
        </footer>

      </BrowserRouter>
    </div>
      
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);