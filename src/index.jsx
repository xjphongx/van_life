import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './routes/About';


function App() {
  return (
    <>
      <Navbar></Navbar>
    </>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
    
  );