import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { projectcontext } from './context/context';
import { ToastContainer, toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


export default function ProductDetalis() {
  let {setcountcart,setcountfav}=useContext(projectcontext)
  const [product, setProduct] = useState(null);
  const [loading, setloading] = useState(false);
  const params = useParams();
  const [loadingbtncart ,setloadingbtncart]=useState(false)
  const [loadingbtnfav ,setloadingbtnfav]=useState(false)
  let allcontext=useContext(projectcontext)
  async function getData(id) {
    setloading(true)
    try {
      
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
      setloading(false)
    } catch (error) {
      console.error("Error fetching product:", error);
      setloading(false)
    }
  }

  useEffect(() => {
    getData(params.idproduct);
  }, [params.idproduct]);

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
  async function addtofav(id) {
    if(loadingbtnfav!==true) {

      setloadingbtnfav(true)
      let response =  await allcontext.addtofav(id)
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
    <div className='container'>
      {product!==null && loading !==true && product.images? 
      <div className="row mx-auto w-md-75 mt-5 contproductdetails">
        <div className="col-md-4">
          <div className='slider-container p-2'>
                 {product.images?<Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {product.images.map((image, id) => (
                  <div key={id}>
                    <SwiperSlide> <img src={image} className='w-100' alt={`Product Image ${id}`} /></SwiperSlide>
                  </div>
                  ))}
                </Swiper>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin '></i>        
        </div>}
            
          </div>
        </div>
        <div className="col-md-8 pt-5">
            <div className='pt-5'>
              <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
              <h6 className='py-4'>{product.description}</h6>
              <div className='d-flex justify-content-between py-2'>
                <span className='p-1 h5' > Price : <span className='text-success '>{product.price} EGB </span>  </span>
                <span><i className="fa-solid fa-star"></i>{product.ratingsAverage}</span>
              </div>
                    <div className="btnsdetalis">
                        <button className='btn btn-outline-success ' onClick={()=>addtofav(product._id)}>{loadingbtnfav===true?<i className='fas fa-spinner fa-spin'  ></i>:"Add To Fav"}</button>
                        <button className='btn btn-outline-primary ms-2 'onClick={()=>addtocart(product._id)} >{loadingbtncart===true?<i className='fas fa-spinner fa-spin'  ></i>:"Add To Cart"}</button>
                    </div>
            </div>
        </div>
      </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-2x'></i>        
        </div>}
        <ToastContainer/>
    </div>
  );
}
