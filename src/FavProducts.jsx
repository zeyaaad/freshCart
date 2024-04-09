import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { projectcontext } from './context/context';
export default function FavProducts() {
  let [loadingdelete,setloadingdelete]=useState(false)
  let [userfav , setuserfav]=useState(null)
  let [loading , setloading]=useState(false)
  let headers = {"token" : localStorage.getItem("token")}
let {setcountcart,setcountfav}=useContext(projectcontext)
  const [loadingbtncart ,setloadingbtncart]=useState(false)
  let allcontext=useContext(projectcontext)
async function getuserfav() {
  setloading(true)
  let products= await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);
    setuserfav(products)
    setloading(false)
}


useEffect(()=> {
  getuserfav()

},[])
async function addtocart(productid){
  if(loadingbtncart!==true) {

    setloadingbtncart(true)
    let response = await allcontext.addtocart(productid)
    setloading(false)
    setcountcart(response.data.numOfCartItems)
    toast.success(`Added successfully to cart` , {
      autoClose: 2000,
      position: "top-center"
    })
    setloadingbtncart(false)
  } else {
      toast.error(`Wait To the Last Added Done` , {
      autoClose: 2000,
      position: "top-center"
    })
  }
  }
  async function delproduct(id) {
    if(loadingdelete!==true) {

      setloadingdelete(true)
      let response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
    setcountfav(response.data.numOfCartItems)
    await getuserfav()
    toast.error(`Product removed successfully`,{
      autoClose: 2000 ,
      position: "top-center"
    })
    setloadingdelete(false)
  }else {
    toast.error(`Wait the the Last Action done ! `,{
      autoClose: 2000 ,
      position: "top-center"
    })
  }
  }
    
  return (
    <div className='container' >
        {loading!==true && userfav?
          <div className='row allcart ' >
              <h1> Your Fav Products : </h1>
              {userfav.data.map((product,i)=><div key={i} className='col-12 cartone d-flex'>
          <div className="image ms-2">
            <Link to={`/productdetalis/${product.id}`}><img src={product.imageCover}  alt="" /></Link>
            <div className='ms-3 detaliscart'>
              <h2> {product.title.split(" ").slice(0, 2).join(" ")} </h2>
              <h5 className='text-success'> Price : {product.price} </h5    >
              <button className='btn btn-danger' onClick= {()=>delproduct(product.id)} > {loadingdelete===true?<i className='fas fa-spinner fa-spin '></i> :"Delete"}</button>
            </div>
          </div>
         <div className='opration'>
            <button className='btn btn-primary' onClick={()=>addtocart(product.id)} >{loadingbtncart===true?<i className='fas fa-spinner fa-spin'  ></i>:"Add To Cart"}  </button>
         </div>
        </div>)}
          </div>
      :
       <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>}
        <ToastContainer  />
    </div>
  )
}
