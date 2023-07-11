import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Vans from './routes/Vans/Vans';
import VansDetail from './routes/Vans/VansDetail';

import "../server"
import Layout from './components/Layout';


function App() {
  return (
    
    <BrowserRouter> 
        <Routes>
          <Route element={<Layout/>}> {/* This is for layout route: This Route is the parent  */}
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/vans" element={<Vans/>}/>
            <Route path="vans/:id" element={<VansDetail/>}/>
          </Route>
        </Routes>      
    </BrowserRouter>
    
      
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);