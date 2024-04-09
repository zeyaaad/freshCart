import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Orders() {
    const [orders, setOrders] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getOrders() {
    setisloading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders`)
    setOrders(data.data);
    setisloading(false)
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
        <div className="row">
      {isloading ? (
       <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>
      ) : (
        <>
          {orders?.map((order) => (
            <div key={order._id} className="col-lg-3 col-md-4 col-12 text-center clienrcont">
                  <h4 className='text-main text-success fw-bold font-sm'>Client Name: {order?.user?.name} </h4>
                  <div className="text-center">
                    <h4>Total Price:{order?.totalOrderPrice}</h4>
                    <p className='text-muted'> Payment Method: <span className='h5'> {order?.paymentMethodType}</span> </p>
                  </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
