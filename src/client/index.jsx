import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider}
  from 'react-router-dom';

//thirdparty componenets
import { Toaster } from 'react-hot-toast';

import Home from './routes/Home';
import Layout from './components/Layout';

import HostLayout from './components/HostLayout';
import HostDashboard,{loader as hostDashboardLoader} from './routes/Host/HostDashboard';
import HostIncome from './routes/Host/HostIncome';
import HostVans, {loader as hostVanPageLoader} from './routes/Host/HostVans';
import HostVansDetail, {loader as hostVanDetailPageLoader} from './routes/Host/HostVansDetail';
import HostVanInfo from './routes/Host/HostVanInfo';
import HostVanPricing from './routes/Host/HostVanPricing';
import HostVanPhotos from './routes/Host/HostVanPhotos';
import HostRequest, {loader as hostRequestPageLoader} from './routes/Host/HostRequest';
import HostRequestDetail,{loader as hostRequestDetailPageLoader} from './routes/Host/HostRequestDetail';
import HostReview, {loader as hostReviewPageLoader} from './routes/Host/HostReview';
import HostVanUpload from './routes/Host/HostVanUpload';

import UserLayout from './components/UserLayout'
import UserDashboard, {loader as userDashboardLoader} from './routes/User/UserDashboard';
import UserVans, {loader as userVansLoader} from './routes/User/UserVans';
import UserVansDetail, {loader as userVansDetailLoader} from './routes/User/UserVansDetail';
import UserVanInfo from './routes/User/UserVanInfo';
import UserVanPricing from './routes/User/UserVanPricing';
import UserVanPhotos from './routes/User/UserVanPhotos';
import UserVanRent, {loader as userVanRentLoader} from './routes/User/UserVanRent';
import UserCurrentVanDetail, {loader as userCurrentVanDetailLoader} from './routes/User/UserCurrentVanDetail';
import UserRequest, {loader as userRequestLoader} from './routes/User/UserRequest';
import UserRequestDetail, {loader as userRequestDetailPageLoader} from './routes/User/UserRequestDetail';


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
//localStorage.removeItem("loggedIn")


export const LoginContext = React.createContext()


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  
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
          element={<HostDashboard/>} 
          loader={hostDashboardLoader}/> 
        {/* /host/income This takes from parent's relative path*/}
        <Route 
          path='income' 
          element={<HostIncome/>} 
          loader={async ({request})=> await requireAuth(request)}/> 
        <Route 
          path='review' 
          element={<HostReview/>} 
          loader={hostReviewPageLoader}/>
        <Route 
          path='request' 
          element={<HostRequest/>} 
          loader={hostRequestPageLoader}/>
        <Route
          path='request/:id'
          element={<HostRequestDetail/>}
          loader={hostRequestDetailPageLoader}>
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

        <Route path='vans' element={<HostVanLayout/>}>
          <Route index
            element={<HostVans/>} 
            loader={hostVanPageLoader}
            errorElement={<Error/>}/>

          <Route
            path='upload'
            element={<HostVanUpload/>}
            loader={async ({request})=> await requireAuth(request)}
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
    
      {/* Below is the parent layout for Users */}
      <Route path='user' element={<UserLayout/>}>
        <Route index 
          element={<UserDashboard/>} 
          loader={userDashboardLoader}/> 
        <Route 
          path='vans' 
          element={<UserVans/>} 
          loader={userVansLoader}/>
        <Route 
          path='vans/:id' 
          element={<UserVansDetail/>} 
          loader={userVansDetailLoader}
          errorElement={<Error/>}>
          <Route index 
            element={<UserVanInfo/>} 
            loader={async ({request})=> await requireAuth(request)}/>
          <Route 
            path='pricing' 
            element={<UserVanPricing/>} 
            loader={async ({request})=> await requireAuth(request)}/>
          <Route 
            path='photos' 
            element= {<UserVanPhotos/>} 
            loader={async ({request})=> await requireAuth(request)}/>
        </Route>
        <Route
            path='vans/rent/:id'
            element={<UserVanRent/>}
            loader={userVanRentLoader}/>
        
        <Route
          path='van'
          element={<UserCurrentVanDetail/>}
          loader={userCurrentVanDetailLoader}
        />

        <Route 
          path='request' 
          element={<UserRequest/>} 
          loader={userRequestLoader}/> 
        
        <Route
          path='request/:id'
          element={<UserRequestDetail/>}
          loader={userRequestDetailPageLoader}>
            <Route index 
              element={<UserVanInfo/>} 
              loader={async ({request})=> await requireAuth(request)}/>
            <Route 
              path='pricing' 
              element={<UserVanPricing/>} 
              loader={async ({request})=> await requireAuth(request)}/>
            <Route 
              path='photos' 
              element= {<UserVanPhotos/>} 
              loader={async ({request})=> await requireAuth(request)}/>
        </Route>
        
        
      </Route>
      {/* Catch all route */}
      
      <Route path='*' element={<NotFoundPage/>}/>        
    </Route>
  ))
  
  return (
    <div>
    {/* Allow the user state to check itsself in the host routes */}
        <Toaster position='top-center' toastOptions={{duration: 2000}}/>
        <LoginContext.Provider value={[loggedIn,setLoggedIn]}>
         
            {/* //RouterProvider will allow me to use Data APIs */}
            <RouterProvider router={router}/>
       
          
        </LoginContext.Provider>
    </div>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
       <App/>
    </React.StrictMode>
  );