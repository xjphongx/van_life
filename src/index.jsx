import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './routes/About';


function App() {
  return (
    <>
      <Navbar></Navbar>
      <main className='main-container'>
        <h1>You got the travbel plans, we got the travel vans.</h1>
        <h3>Add adventure to your life by joinging the #vanlife movment. &#10; Rent the perfect van to make your perfect road trip.</h3>
        <button>Find your van</button>
      
      </main> 
      <Footer></Footer>
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