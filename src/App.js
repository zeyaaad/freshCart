import { Component, useEffect, useState } from "react"
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'

import Home from './Home';
import Navbar from './Navbar';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Brands from './Brands';
import Gategories from './Gategories';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import FavProducts from './FavProducts';
import ProductDetalis from './ProductDetalis';

import { jwtDecode } from 'jwt-decode';
import ContextPrivider from "./context/context";
import User from './User';
import Orders from "./Orders";
import Notfound from "./Notfound";
import ResetPassword from "./Resetpass";
import ChangePassword from "./ChangePassword";


export function APP(){
    
  let [userdata , setuserdata]=useState(null)
  let navigate=useNavigate()
  useEffect(()=> {
      if(localStorage.getItem("token")) {
          userdatatoken()
      }
  }, [])

  
  function LogOut() {
    setuserdata(null)
    localStorage.removeItem("token") ;
    navigate("/login")
  }
  function userdatatoken() {
    let token=localStorage.getItem("token") ;
    let decodetoken=jwtDecode(token)
    setuserdata(decodetoken)
  }
   function ProtectRoute({ children }) {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
    return (
      <div>
        <ContextPrivider>
            

        <Navbar LogOut={LogOut} userData={userdata} />
        <div className="container"> 
            <Routes> 
          <Route path="/home" element={ <ProtectRoute> <Home/> </ProtectRoute> } />
          <Route path="/products" element={ <ProtectRoute> <Products/></ProtectRoute> } />  
        
           <Route path="/productdetalis" element={<ProtectRoute> <ProductDetalis/></ProtectRoute>} > 
              <Route path=":idproduct" element={<ProtectRoute> <ProductDetalis/> </ProtectRoute>} />
           </Route>
          <Route path="/allorders" element={<ProtectRoute> <Orders/></ProtectRoute> } /> 
          <Route path="/brands" element={<ProtectRoute> <Brands/></ProtectRoute> } /> 
          <Route path="/gategories" element={<ProtectRoute>  <Gategories/></ProtectRoute> } /> 
          <Route path="/cart" element={<ProtectRoute>  <Cart/> </ ProtectRoute>} /> 
          <Route path="/user" element={<ProtectRoute>  <User/> </ProtectRoute>} /> 
          <Route path="/favProducts" element={<ProtectRoute>  <FavProducts/> </ProtectRoute> } /> 
          <Route path="/productDetalis" element= {<ProtectRoute>  <ProductDetalis/> </ProtectRoute> } /> 
          <Route path="/" element={<Login userdatatoken={userdatatoken} />} /> 
          <Route path="" element={<Login userdatatoken={userdatatoken} />} /> 
          <Route path="/login" element={<Login userdatatoken={userdatatoken} />} /> 
          <Route path="/register" element={<Register/>} /> 
          <Route path="/resetpass" element={<ResetPassword/>} /> 
          <Route path="/changepass" element={<ChangePassword/>} /> 
          <Route path="*" element={<Notfound/>} /> 
          <Route path="/Frech-Cart" element={<Login userdatatoken={userdatatoken} />} /> 

        </Routes>
        </div>

         
      </ContextPrivider>
        </div>
    )
  
}