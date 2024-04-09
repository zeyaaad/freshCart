import React from 'react'
import Slider from "react-slick"
export default function Home() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <>
       <div className='container'>
        
        <Slider  {...settings} >
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'   />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
            <img src="https://ahmedramadan009.github.io/FreshCartEcommerce/static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg" className='w-100'alt='img'  />
          

        </Slider>

        </div> 
    </>

) 
}
