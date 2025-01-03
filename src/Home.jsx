import React from 'react';
import slide1 from "./imgs/img1.jpeg"
import slide2 from "./imgs/img2.jpeg"
import slide3 from "./imgs/img3.jpeg"
import slide4 from "./imgs/img4.jpeg"
import slide5 from "./imgs/img5.jpeg"
import slide6 from "./imgs/img6.jpeg"  
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { projectcontext } from './context/context';
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  const [loadingbtncart ,setloadingbtncart]=useState(false)
  const [loadingbtnfav ,setloadingbtnfav]=useState(false)
  let allcontext=useContext(projectcontext)
  let [dataCatgorie , setdataCatgorie]=useState(null) 
  let [dataproducts , setdataproducts]=useState(null) 
  let [loading , setloading] = useState(false) 
  let {setcountcart,setcountfav}=useContext(projectcontext)
  async function getgat() {
    setloading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setdataCatgorie(data.data)
  }

  async function getproducts() {
    setloading(true)
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setdataproducts(data.data.slice(0,20))
  }
  useEffect(()=>{
    getgat()
    getproducts()
    setloading(false)

  },[])


async function addtocart(productid){
  if(loadingbtncart!==true) {

    setloadingbtncart(true)
    let response = await allcontext.addtocart(productid)
    setloading(false)
    console.log(response);
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
  async function addtofav(id) {
    if(loadingbtnfav!==true) {

      setloadingbtnfav(true)
      let response =  await allcontext.addtofav(id)
      console.log(response)
      setcountfav(response.count)
      toast.success(` Added successfully to fav`,{
        autoClose: 2000 ,
        position: "top-center"
      })
      setloadingbtnfav(false)
    } else {
       toast.error(`Wait To the Last Added Done` , {
      autoClose: 2000,
      position: "top-center"
    })
    }
  }




  return (
    <div className="container"  >
        {loading !==null && dataCatgorie !==null && dataproducts!==null ? <>
    <div className="row mainshw">
          <div className="col-12">
          <Swiper 


        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper mainswip"
      >
        <SwiperSlide><img src={slide1} className='w-100' height={350} alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide2} className='w-100' height={350} alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide3} className='w-100' height={350} alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide4} className='w-100' height={350} alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide5} className='w-100' height={350} alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide6} className='w-100' height={350} alt="" /></SwiperSlide>
      </Swiper>
        </div>
        <div className='col-12 gatsshow' >
          <h3> Show Popular Categories: </h3>
             <Swiper 
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0
            ,
          },
        }}
        watchSlidesProgress={true} autoplay="true"  slidesPerView={4} className="mySwiper"
      >
        {dataCatgorie?.map((val, id) => {
                    return <SwiperSlide key={id} className='slidee' >  <img src={val.image} className='w-100'  height={200} alt="" /> <h5 className='namecat' > {val.name} </h5> </SwiperSlide>
                })}
      </Swiper>

        </div>
        
    </div>
    <div className='row allproductscont ' > 
                {dataproducts.map((product, i) => 
              <div className="product " key={i}>
                  <Link to={`/productdetalis/${product._id}`} > <img src={product.imageCover}  className=" img-wrapper w-100" alt="img" /> </Link>

                  <div className="info">
                    <h4 className='title'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <h4 className="price">{product.price} EGB</h4 >
                  </div>
                  <div className="actions-wrapper">
                  <button  class="btn add-btn wishlist" onClick={()=>addtofav(product._id)}>{loadingbtnfav===true?<i className='fas fa-spinner fa-spin'  ></i>:" Wishlist"}</button>
                  <button class="btn add-btn cart"  onClick={()=>addtocart(product._id)} >{loadingbtncart===true?<i className='fas fa-spinner fa-spin'  ></i>:"Cart"}</button>
                  </div>

              </div>
            )}
    </div>
        </>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>} 
<ToastContainer/>
  </div>
  );
}
