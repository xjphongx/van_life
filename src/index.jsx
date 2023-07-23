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
import HostVans, {loader as hostVanPageLoader} from './routes/Host/HostVans';
import HostVansDetail, {loader as hostVanDetailPageLoader} from './routes/Host/HostVansDetail';
import HostVanInfo from './routes/Host/HostVanInfo';
import HostVanPricing from './routes/Host/HostVanPricing';
import HostVanPhotos from './routes/Host/HostVanPhotos';
import Review from './routes/Host/Review';

import About from './routes/About';
import Vans, {loader as vanPageLoader } from './routes/Vans/Vans'; //importing loader from Vans.jsx
import VansDetail, {loader as vanDetailLoader} from './routes/Vans/VansDetail';
import Login, {loader as loginLoader} from './routes/Login';

import NotFoundPage from './routes/NotFoundPage';
import Error from './components/Error';
import "../server"

import { requireAuth } from '../utils';


function App() {
  //New way to use BrowserRouter
  const router = createBrowserRouter(createRoutesFromElements( //createRoutesFromElements will turn Routes into Route Objects for the next method
    <Route path='/'element={<Layout/>} errorElement={<Error/>}> {/* This is for layout route: This Route is the parent  */}
      {/* children route of Main layout */}
      <Route index element={<Home/>}/> {/* index places the Home component into the outlet of the parent layout  */}
      <Route path='about' element={<About/>}/>
      <Route 
        path='vans' 
        element={<Vans/>} 
        loader={vanPageLoader}/>
      <Route 
        path='vans/:id' 
        element={<VansDetail/>}
          loader={vanDetailLoader} //load the data first 
        />
      <Route path='login' element={<Login/>} loader={loginLoader}/>


      {/* Below is the parent layout route with child routes and protected routes
          CONCEPT: protect routes are using parallel loading */}
      <Route path='host' element={<HostLayout/>}> {/* /host */}
        {/* INDEX ROUTE will fix the /host/host conumdrum: Its the default child path */}
        <Route index 
          element={<Dashboard/>} 
          loader={async ()=> await requireAuth()}/> 
        {/* /host/income This takes from parent's relative path*/}
        <Route 
          path='income' 
          element={<Income/>} 
          loader={async ()=> await requireAuth()}/> 
        <Route 
          path='review' 
          element={<Review/>} 
          loader={async ()=> await requireAuth()}/>
        <Route 
          path='vans' 
          element={<HostVans/>} 
          loader={hostVanPageLoader}/>
        <Route 
          path='vans/:id' 
          element={<HostVansDetail/>} 
          loader={hostVanDetailPageLoader}>
          <Route index 
            element={<HostVanInfo/>} 
            loader={async ()=> await requireAuth()}/>
          <Route 
            path='pricing' 
            element={<HostVanPricing/>} 
            loader={async ()=> await requireAuth()}/>
          <Route 
            path='photos' 
            element= {<HostVanPhotos/>} 
            loader={async ()=> await requireAuth()}/>
        </Route>

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