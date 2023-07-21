import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider}
  from 'react-router-dom';

import Home from './routes/Home';
import Layout from './components/Layout';

import HostLayout from './components/HostLayout';
import Dashboard from './routes/Host/Dashboard';
import Income from './routes/Host/Income';
import HostVans from './routes/Host/HostVans';
import HostVansDetail from './routes/Host/HostVansDetail';
import HostVanInfo from './routes/Host/HostVanInfo';
import HostVanPricing from './routes/Host/HostVanPricing';
import HostVanPhotos from './routes/Host/HostVanPhotos';

import Review from './routes/Host/Review';

import About from './routes/About';
import NotFoundPage from './routes/NotFoundPage';

import Vans, {loader as vanPageLoader } from './routes/Vans/Vans'; //importing loader from Vans.jsx

import VansDetail from './routes/Vans/VansDetail';

import "../server"



function App() {
  
  //New way to use BrowserRouter
  const router = createBrowserRouter(createRoutesFromElements( //createRoutesFromElements will turn Routes into Route Objects for the next method
    <Route path='/'element={<Layout/>}> {/* This is for layout route: This Route is the parent  */}
      {/* children route of Main layout */}
      <Route index element={<Home/>}/> {/* index places the Home component into the outlet of the parent layout  */}
      <Route path='about' element={<About/>}/>
      <Route path='vans' element={<Vans/>} loader={vanPageLoader}/>
      <Route path='vans/:id' element={<VansDetail/>}/>
      {/* Below is the parent layout route with child routes */}
      <Route path='host' element={<HostLayout/>}> {/* /host */}
        <Route index element={<Dashboard/>}/> {/* INDEX ROUTE will fix the /host/host conumdrum: Its the default child path */}
        <Route path='income' element={<Income/>}/> {/* /host/income This takes from parent's relative path*/}
        <Route path='vans' element={<HostVans/>}/>
        <Route path='vans/:id' element={<HostVansDetail/>}>
          <Route index element={<HostVanInfo/>}/>
          <Route path='pricing' element={<HostVanPricing/>}/>
          <Route path='photos' element= {<HostVanPhotos/>}/>
        </Route>
        <Route path='review' element={<Review/>}/>
      </Route> 
      {/* Catch all route */}
      <Route path='*' element={<NotFoundPage/>}/>        
    </Route>
  ))
  
  return (
    //RouterProvider will allow me to use Data APIs
    <RouterProvider router={router}/>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);