import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Gategories() {
  let [loading , setloadin]=useState(false)
  let [catgeories , setcatgeories]=useState(null)

  async function getcatgeories() {
    setloadin(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories") 
    setcatgeories(data.data)
    setloadin(false)
  }

  useEffect(()=> {
    getcatgeories()
  } , [])
  return (
    <div className='container'>
      {loading!==true && catgeories !==null ? <> 
      <h2> All catgeories </h2>
      <div className='row'>
        {catgeories.map((cat,i)=> <div className='col-lg-3 col-md-4 col-12 clienrcont'  key={i}>
          <img src={cat.image} className='w-100' alt="" height={300} />
            <h3> {cat.name}  </h3>
        </div>)}
      </div>
      </> : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>}
    </div>
  )
}
