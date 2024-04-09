import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { projectcontext } from './context/context';
export default function Cart() {
  let [loadingdelete,setloadingdelete]=useState(false)
  let [usercart , setusercart]=useState(null)
  let [loading , setloading]=useState(false)
  let headers = {"token" : localStorage.getItem("token")}
  let [btnsupdate,setbtnsupdate]=useState(false)
  let {setcountcart}=useContext(projectcontext)
async function getusercart() {
  setloading(true)
  let products= await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers:headers
  }).then((response)=>response).catch((error)=>error);
  setcountcart(products?.data?.numOfCartItems)
    if(products?.data) {
      setusercart(products?.data?.data)
      
    } else {
      setusercart([])
    }
    
    setloading(false)
}


async function updatecount(id , count) {
  if(count>0){
    if(btnsupdate!==true) {
      setbtnsupdate(true)    
    let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id} `,{
      count: count
    },{
      headers:headers
    }).then((response)=>response).catch((error)=>error) 
    toast.success(`Update Done successfully`,{
      autoClose: 2000 ,
      position: "top-center"
    })

    setusercart(response.data.data)
    setbtnsupdate(false)
    } else {
      toast.error(`Wait To Apply Last Change !`,{ 
      autoClose: 2000 ,
      position: "top-center"
    })
    }
    
  }else {
    delproduct(id)
  }
}

useEffect(()=> {
  getusercart()
},[])

  async function delproduct(id) {
    if(loadingdelete!==true) {
      setloadingdelete(true)
      let response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:headers
      }).then((reponse)=>reponse)
      .catch((error)=>error)
      setusercart(response.data.data)
      setloadingdelete(false)
      setcountcart(response.data.numOfCartItems)
      toast.error(`Product Deleted successfully`,{
        autoClose: 2000 ,
        position: "top-center"
      })
    } else {
        toast.error(`Wait to the Last action Done`,{
        autoClose: 2000 ,
        position: "top-center"
      })
    }
    }
  async function clearcart() {
    if(loadingdelete!==true) {
      setloadingdelete(true)
      let response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
      }).then((reponse)=>reponse)
      .catch((error)=>error)
      setloadingdelete(false)
      setcountcart(0)
      setusercart(null)
      toast.error(`Cart cleared successfully`,{
        autoClose: 2500 ,
        position: "top-center"
      })
    } else {
        toast.error(`Wait to the Last action Done`,{
        autoClose: 2000 ,
        position: "top-center"
      })
    }
    }
    
    async function payment(cartId) {
      setloading(true)
      let shippingAddress={
      details:'okay',
      phone:'000',
      city:'bns'
      } ;
    let response=  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        shippingAddress:shippingAddress
    }
    ,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
    if (response?.data?.status==='success') {
      window.location.href = response.data.session.url
    } else {
      toast.error(`Try another There is an error !`,{
        autoClose: 2500 ,
        position: "top-center"
      })
    }
    setloading(false)
}
  



  return (
    <div className='container'>
      {loading!==true? <> 
      {usercart?.products?.length>0?<div className="row allcart w-md-75 mx-auto">
        <h1> Shopping Cart : </h1>
        <h4 className='mt-3'> Total Price : <span className='bg-primary text-white  ' >{usercart.totalCartPrice} </span></h4>
        {usercart.products?.map((product,i)=><div key={i} className='col-12 cartone d-flex'>
          <div className="image ms-2">
            <Link to={`/productdetalis/${product.product.id}`}><img className='w-100' src={product.product.imageCover}  alt="" /></Link>
            <div className='ms-3 detaliscart'>
              <h2> {product.product.title.split(" ").slice(0, 2).join(" ")} </h2>
              <h5 className='pricecart'> Price : {product.price} </h5>
              <button className='btn btn-danger' onClick= {()=>delproduct(product.product.id)} > {loadingdelete===true?<i className='fas fa-spinner fa-spin '></i> :"Delete"}</button>
            </div>
          </div>
         <div className='opration'>
            <span className='btn btn-outline-primary' onClick={()=>updatecount(product.product.id , product.count+1)} >{btnsupdate===true?<i className='fas fa-spinner fa-spin '></i>:"+"}</span>
            <span className='btn btn-success ms-2 me-2'>{product.count}</span>
            <span className='btn btn-outline-danger' onClick={()=>updatecount(product.product.id , product.count-1)}>{btnsupdate===true?<i className='fas fa-spinner fa-spin '></i>:"-"}</span>
         </div>
        </div>)}
        <button className='btn btn-danger clearbtn ' onClick={clearcart} > Clear Cart </button>
        <button className='btn btn-primary clearbtn ' onClick={()=>payment(usercart._id)}  > Checkout </button>
      </div>:<h1 className='alert alert-warning mt-4' > Your Cart Is Empty </h1>}
       </>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>}
        <ToastContainer  />
    </div>
  )
}
