import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider}
  from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import Home from './routes/Home';
import Layout from './components/Layout';

import HostLayout from './components/HostLayout';
import Dashboard,{loader as dashboardLoader} from './routes/Host/Dashboard';
import Income from './routes/Host/Income';
import HostVans, {loader as hostVanPageLoader} from './routes/Host/HostVans';
import HostVansDetail, {loader as hostVanDetailPageLoader} from './routes/Host/HostVansDetail';
import HostVanInfo from './routes/Host/HostVanInfo';
import HostVanPricing from './routes/Host/HostVanPricing';
import HostVanPhotos from './routes/Host/HostVanPhotos';
import Review from './routes/Host/Review';
import HostVanUpload, {action as hostVanUploadAction} from './routes/Host/HostVanUpload';

import About from './routes/About';
import Vans, {loader as vanPageLoader } from './routes/Vans/Vans'; //importing loader from Vans.jsx
import VansDetail, {loader as vanDetailLoader} from './routes/Vans/VansDetail';
import Login, {loader as loginLoader, action as loginAction} from './routes/Login';
import SignUp, {loader as signUpLoader, action as signUpAction} from './routes/SignUp';

import NotFoundPage from './routes/NotFoundPage';
import Error from './components/Error';
//import "../server"

import { requireAuth } from './utils';
import HostVanLayout from './components/HostVanLayout';
localStorage.removeItem("loggedin")


function App() {
  //New way to use BrowserRouter
  const router = createBrowserRouter(createRoutesFromElements( //createRoutesFromElements will turn Routes into Route Objects for the next method
    <Route path='/' element={<Layout/>} errorElement={<Error/>}> {/* This is for layout route: This Route is the parent  */}
      {/* children route of Main layout */}
      <Route index element={<Home/>}/> {/* index places the Home component into the outlet of the parent layout, this error handles errors for all children  */}
      <Route path='about' element={<About/>}/>
      <Route 
        path='vans' 
        element={<Vans/>} 
        loader={vanPageLoader}
        errorElement={<Error/>}
        />
        
      <Route 
        path='vans/:id' 
        element={<VansDetail/>}
        loader={vanDetailLoader} //load the data first 
        errorElement={<Error/>}

        />
      <Route path='login' element={<Login/>} loader={loginLoader} action={loginAction}/>
      <Route path='signup' element={<SignUp/>} loader={signUpLoader} action={signUpAction}/>

      
      {/* Below is the parent layout route with child routes and protected routes
          CONCEPT: protect routes are using parallel loading */}
      <Route path='host' element={<HostLayout/>}> {/* /host */}
        {/* INDEX ROUTE will fix the /host/host conumdrum: Its the default child path */}
        <Route index 
          element={<Dashboard/>} 
          loader={dashboardLoader}/> 
        {/* /host/income This takes from parent's relative path*/}
        <Route 
          path='income' 
          element={<Income/>} 
          loader={async ({request})=> await requireAuth(request)}/> 
        <Route 
          path='review' 
          element={<Review/>} 
          loader={async ({request})=> await requireAuth(request)}/>
        <Route path='vans' element={<HostVanLayout/>}>
          <Route index
            element={<HostVans/>} 
            loader={hostVanPageLoader}
            errorElement={<Error/>}/>

          <Route
            path='upload'
            element={<HostVanUpload/>}
            action={hostVanUploadAction}
            errorElement={<Error/>}
          />

        </Route>
        
        
        
        <Route 
          path='vans/:id' 
          element={<HostVansDetail/>} 
          loader={hostVanDetailPageLoader}
          errorElement={<Error/>}>
           
          <Route index 
            element={<HostVanInfo/>} 
            loader={async ({request})=> await requireAuth(request)}/>
          <Route 
            path='pricing' 
            element={<HostVanPricing/>} 
            loader={async ({request})=> await requireAuth(request)}/>
          <Route 
            path='photos' 
            element= {<HostVanPhotos/>} 
            loader={async ({request})=> await requireAuth(request)}/>
        </Route>

      </Route> {/* End of HostLayout Route */}
     
      {/* Catch all route */}
      
      <Route path='*' element={<NotFoundPage/>}/>        
    </Route>
  ))
  
  return (
    <>
    {/* Allow the user state to check itsself in the host routes */}
      
        {/* //RouterProvider will allow me to use Data APIs */}
        <RouterProvider router={router}/>
     
    </>
      

    
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App/>);