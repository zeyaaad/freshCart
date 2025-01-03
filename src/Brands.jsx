import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Brands() {
  let [loading , setloadin]=useState(false)
  let [brands , setbrands]=useState(null)

  async function getbrands() {
    setloadin(true)
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/brands') 
    setbrands(data.data)
    setloadin(false)
  }

  useEffect(()=> {
    getbrands()
  } , [])
  return (
    <div className='container'>
      {loading!==true && brands !==null ? <> 
      <h2> All Brands </h2>
      <div className='row'>
        {brands.map((brand,i)=> <div className='col-lg-3 col-md-4 col-12 clienrcont' key={i}>
          <img src={brand.image} className='w-100' alt="" />
            <h3> {brand.name}  </h3>
        </div>)}
      </div>
      </> : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>}
    </div>
  )
}
