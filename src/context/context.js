import axios from "axios";
import { createContext, useState } from "react";

export let projectcontext=createContext(0)
export default function ContextPrivider(props) {
    let [countcart , setcountcart]=useState(0)
    let [countfav , setcountfav]=useState(0)
    
    
    let headers = {"token" : localStorage.getItem("token")}


    async function getusercart() {
    let products= await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers:headers
  }).then((response)=>response).catch((error)=>error);
    if(products.data) {
      setcountcart(products.data.numOfCartItems)
    } 
    }
    async function getuserfav() {
        let products= await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: localStorage.getItem("token")
        },
    }).then(({ data }) => data).catch(err => err);
     setcountfav(products.count)
}
    getuserfav()
    getusercart()
    async function addtocart(productid) {
     return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId:productid
    },{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
    }

    async function addtofav(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:productId
    },{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
    }
    return <projectcontext.Provider value={{addtocart,addtofav,countcart,setcountcart,countfav,setcountfav}}>
        {props.children}
    </projectcontext.Provider>
}