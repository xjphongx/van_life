import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './routes/Home';
import Layout from './components/Layout';

import HostLayout from './components/HostLayout';
import Dashboard from './routes/Host/Dashboard';
import Income from './routes/Host/Income';
import HostVans from './routes/Host/HostVans';
import HostVansDetail from './routes/Host/HostVansDetail';
import Review from './routes/Host/Review';

import About from './routes/About';
import Vans from './routes/Vans/Vans';
import VansDetail from './routes/Vans/VansDetail';

import "../server"



function App() {
  return (
    
    <BrowserRouter> 
        <Routes>
          <Route path='/'element={<Layout/>}> {/* This is for layout route: This Route is the parent  */}
            {/* children route of Main layout */}
            <Route index element={<Home/>}/> {/* index places the Home component into the outlet of the parent layout  */}
            <Route path='about' element={<About/>}/>
            <Route path='vans' element={<Vans/>}/>
            <Route path='vans/:id' element={<VansDetail/>}/>

            {/* Below is the parent layout route with child routes */}
            <Route path='host' element={<HostLayout/>}> {/* /host */}
              <Route index element={<Dashboard/>}/> {/* INDEX ROUTE will fix the /host/host conumdrum: Its the default child path */}
              <Route path='income' element={<Income/>}/> {/* /host/income This takes from parent's relative path*/}
              <Route path='host-vans' element={<HostVans/>}/>
              <Route path='host-vans/:id' element={<HostVansDetail/>}/>
              <Route path='review' element={<Review/>}/>
            </Route> 
          </Route>

        </Routes>      
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);