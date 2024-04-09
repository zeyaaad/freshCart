import axios from 'axios';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { projectcontext } from './context/context';
export default function Products(){
  const [allProducts, setProducts] = useState(null);
  const[loading , setloading]=useState(false);
  let {setcountcart,setcountfav}=useContext(projectcontext)
  const [loadingbtncart ,setloadingbtncart]=useState(false)
  let allcontext=useContext(projectcontext)
  const [loadingbtnfav ,setloadingbtnfav]=useState(false)
  async function getProducts() {
    try {
      setloading(true)
      const { data } = await Axios.get("https://route-ecommerce.onrender.com/api/v1/products");
      setProducts(data.data);
      setloading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
      setloading(false)
    } 
  }

  useEffect(() => {
    getProducts();
  }, []);


async function addtocart(productid){
  if(loadingbtncart!==true) {

    setloadingbtncart(true)
    let response = await allcontext.addtocart(productid)
    setloading(false)
    console.log();
    setcountcart(response?.data?.numOfCartItems)
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
      {allProducts && loading!==true ? (
        <>
          <div className="row allproductscont">
            {allProducts.map((product, i)=>(
              <div className="product " key={i}>
                  <Link to={`/productdetalis/${product._id}`} > <img src={product.imageCover}  className=" img-wrapper w-100" alt="img" /> </Link>

                  <div className="info">
                    <h4 className='title'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <h4 className="price">{product.price} EGB</h4 >
                  </div>
                  <div className="actions-wrapper">
                  <button  className="btn add-btn wishlist" onClick={()=>addtofav(product._id)}>{loadingbtnfav===true?<i className='fas fa-spinner fa-spin'  ></i>:" Wishlist"}</button>
                  <button className="btn add-btn cart"  onClick={()=>addtocart(product._id)} >{loadingbtncart===true?<i className='fas fa-spinner fa-spin'  ></i>:"Cart"}</button>
                  </div>

              </div>
            ))}
          </div>

        </>
      ) : (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin text-success fa-3x'></i>        
        </div>
      )}
    <ToastContainer/>
    </div>
  );
}
