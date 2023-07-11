import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './routes/Home';
import Layout from './components/Layout';

import HostLayout from './components/HostLayout';
import Dashboard from './routes/Host/Dashboard';
import Income from './routes/Host/Income';
import Review from './routes/Host/Review';

import About from './routes/About';
import Vans from './routes/Vans/Vans';
import VansDetail from './routes/Vans/VansDetail';

import "../server"



function App() {
  return (
    
    <BrowserRouter> 
        <Routes>
          <Route element={<Layout/>}> {/* This is for layout route: This Route is the parent  */}
            {/* children route of Main layout */}
            <Route path='/' element={<Home/>}/>
            <Route element={<HostLayout/>}>
              <Route path='/host' element={<Dashboard/>}/>
              <Route path='/host/income' element={<Income/>}/>
              <Route path='/host/review' element={<Review/>}/>
            </Route> 

            
    
            <Route path='/about' element={<About/>}/>
            <Route path='/vans' element={<Vans/>}/>
            <Route path='vans/:id' element={<VansDetail/>}/>
          </Route>

          




        </Routes>      
    </BrowserRouter>
    
      
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);