import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { projectcontext } from './context/context';
import { useEffect } from 'react';

export default function Navbar(props) {

  let nav_links=document.querySelectorAll(".nav-link") ;

  nav_links.forEach((nav)=> {
    nav.addEventListener("click" , function() {
      nav_links.forEach((n)=> {
        n.classList.remove("active_nav")
      })
      nav.classList.add("active_nav")
    })
  })
useEffect(()=>{

    const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

},[])

  let {countcart,countfav}=useContext(projectcontext)
  return (
    <div>
         <nav>
      <div class="logo">
        <Link className="logo"  to="/home" >  <img src="https://raw.githubusercontent.com/AhmedRamadan009/FreshCartEcommerce/4aedf8bdafe696ba022c9a00385b60229636c38b/src/assets/images/freshcart-logo.svg" alt="" />
</Link>
      </div>
      <ul>
               {localStorage.getItem("token")?<> 
        <li>
          <Link className="nav-link active"  to="/home" > Home </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/products" > Products </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/brands" > Brands </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/allorders" > All Orders  </Link>
        </li>
          <li>
          <Link className='nav-link c position-relative' to="/cart" > Cart <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' >{countcart}</span> <i className="fa-solid fa-cart-shopping"></i> </Link>
        </li>
        <li>
          <Link className='  nav-link c position-relative' to="/favProducts" > Favs <i className="fa-solid fa-heart"></i>  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'> {countfav} </span> </Link>
        </li>
        <li>
        <Link className=' nav-link c' to="/user" > User <i className='fa-solid fa-user-pen' ></i> </Link>
        </li>
        <li>
          <span className='btn btn-success mx-2' onClick={props.LogOut}   > Logout <i className="fa-solid fa-right-from-bracket"></i>  </span>       
        </li>
         </> : <> 
        <li>
        <Link className='btn btn-success mx-2'  to="/register" > Register </Link>
        </li>
        <li>
        <Link className='btn btn-success mx-2'  to="/login" > Login </Link>
        </li>
         </>}
      </ul>
      <div class="hamburger">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </nav>
    <div class="menubar">
      <ul>

        {localStorage.getItem("token")?<> 
        <li>
          <Link className="nav-link active"  to="/home" > Home </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/products" > Products </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/brands" > Brands </Link>
        </li>
        <li>
          <Link className="nav-link active"  to="/allorders" > All Orders  </Link>
        </li>
          <li>
          <Link className='nav-link c position-relative' to="/cart" > Cart <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' >{countcart}</span> <i className="fa-solid fa-cart-shopping"></i> </Link>
        </li>
        <li>
          <Link className='  nav-link c position-relative' to="/favProducts" > Favs <i className="fa-solid fa-heart"></i>  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'> {countfav} </span> </Link>
        </li>
        <li>
        <Link className=' nav-link c' to="/user" > User <i className='fa-solid fa-user-pen' ></i> </Link>
        </li>
        <li>
          <span className='btn btn-success mx-2' onClick={props.LogOut}   > Logout <i className="fa-solid fa-right-from-bracket"></i>  </span>       
        </li>
         </> : <> 
        <li>
        <Link className='btn btn-success mx-2'  to="/register" > Register </Link>
        </li>
        <li>
        <Link className='btn btn-success mx-2'  to="/login" > Login </Link>
        </li>
         </>}


      </ul>
    </div>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="logo"  to="/home" > <h3>Fresh-cart  </h3> </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {localStorage.getItem("token")?<> 
          <li className="nav-item">
          <Link className="nav-link active"  to="/home" > Home </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active"  to="/products" > Products </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active"  to="/brands" > Brands </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active"  to="/gategories" > Gategories </Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link c position-relative' to="/cart" > Cart <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' >{countcart}</span> <i className="fa-solid fa-cart-shopping"></i> </Link>
          </li>
          <li className="nav-item">
            <Link className='  nav-link c position-relative' to="/favProducts" > Favs <i className="fa-solid fa-heart"></i>  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'> {countfav} </span> </Link>
          </li>
          <li className="nav-item">
          <Link className=' nav-link c' to="/user" > User <i className='fa-solid fa-user-pen' ></i> </Link>
          </li>
          <li className="nav-item">
  <span className='btn btn-success mx-2' onClick={props.LogOut}   > Logout <i className="fa-solid fa-right-from-bracket"></i>  </span>        </li>

        </>:""}
        </ul>
          {localStorage.getItem("token")?"" : <> 
          <Link className='btn btn-success mx-2'  to="/register" > Register </Link>
          <Link className='btn btn-success mx-2'  to="/login" > Login </Link>
          </>}
          {localStorage.getItem("token")?<>
          <Link className='nav-link c position-relative' to="/cart" > Cart <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' >{countcart}</span> <i className="fa-solid fa-cart-shopping"></i> </Link>
          <Link className='  nav-link c position-relative' to="/favProducts" > Favs <i className="fa-solid fa-heart"></i>  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'> {countfav} </span> </Link>
          <Link className=' nav-link c' to="/user" > User <i className='fa-solid fa-user-pen' ></i> </Link>
          <span className='btn btn-success mx-2' onClick={props.LogOut}   > Logout <i className="fa-solid fa-right-from-bracket"></i>  </span></>:""}
      </div>
    </div>
  </nav> */}
    </div>
  )
}
