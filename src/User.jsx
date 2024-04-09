import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import * as yup from 'yup';
export default function User() {
    let [errorbach , seterrorback]=useState(null)
    let [errorbach2 , seterrorback2]=useState(null)
    let [errors , setErrors]= useState({})
    let [errors2 , setErrors2]= useState({})
    let userdata =JSON.parse(localStorage.getItem("userdata"))
    let [loadingbtn , setloadingbtn]=useState(false)
    let [loadingbtn2 , setloadingbtn2]=useState(false)
    const [user, setUser] = useState({
        currentPassword: 'lolo',
        password: 'lololo',
        rePassword: 'lololo'
  });
  const [updateuserdat , setupdateuserdata]=useState( {
    name:"" ,
    email:""

  } )
    useEffect(() => {
    validateUserData(user) ;
    validateUserData2(updateuserdat)
}, [user,updateuserdat]);

    function appercontpass() {
        let contpass=document.getElementById("contpass");
        contpass.classList.replace("d-none" , "d-block");
        closecontdata()
    }
    function closecontpass() {
         let contpass=document.getElementById("contpass");
        contpass.classList.replace( "d-block","d-none" );
        document.getElementById("currentPassword").value="" ;
        document.getElementById("password").value="" ;
        document.getElementById("rePassword").value="" ;
        setErrors({})
        seterrorback(null)
    }
    function appercontdata() {
        let contdata=document.getElementById("contdata");
        contdata.classList.replace("d-none" , "d-block");
        closecontpass()

    }
    function closecontdata() {
         let contdata=document.getElementById("contdata");
        contdata.classList.replace( "d-block","d-none" );
        document.getElementById("name").value="" ;
        document.getElementById("email").value="" ;
        setErrors2({})
        seterrorback2(null)
    }

const schema = yup.object().shape({
    currentPassword: yup.string().required().min(6),
    password: yup.string().required().min(6),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});


     function getdata(e){
        let newuser={...user}
        const { name, value } = e.target;
        newuser[name]=value
        setUser(newuser);   
        
    } 

    function change(values){
        if (Object.keys(errors).length === 0) {
        setloadingbtn(true)
        axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            if (data.message === "success") {
                toast.success(" Your password changed successfully")
                localStorage.removeItem("token");
                localStorage.setItem("token", data.token)
                setloadingbtn(false)
                closecontpass()
            }
        }).catch(err => {
            setloadingbtn(false)
            seterrorback(err?.response?.data?.errors?.msg)

        })} else {
            alert("front Errors")
        }
    }
async function validateUserData(value) {
    try {
        await schema.validate(value, { abortEarly: false });
        setErrors( {} ); 
    } catch (error) {
        const errors = error.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
        }, {});
        setErrors( errors );
    }
}


    const schema2 = yup.object().shape({
    name: yup.string().required().matches(/^[a-zA-Z0-9\s]+$/, 'Invalid name format'),
    email: yup.string().email().required(),
  });


    function getuserdata(e){
            let newuser={...updateuserdat}
            const { name, value } = e.target;
            newuser[name]=value
            setupdateuserdata(newuser); 
    }
async function validateUserData2(value) {
    try {
        await schema2.validate(value, { abortEarly: false });
        setErrors2( {} ); 
    } catch (error) {
        const errors = error.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
        }, {});
        setErrors2( errors );
    }
}

    function change2(values){
        if (Object.keys(errors2).length === 0) {
        setloadingbtn2(true)
        axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            if (data.message === "success") {
                toast.success(" Your password changed successfully")
                localStorage.removeItem("userdata");
                localStorage.setItem("userdata", JSON.stringify(data.user))
                setloadingbtn2(false)
                closecontdata()
            }
        }).catch(err => {
            setloadingbtn2(false)
            seterrorback2(err?.response?.data?.errors?.msg)

        })} else {
            alert("front Errors")
        }
    }




  return (
    <div>
        <div className="contchangepass d-none" id='contpass'>
            <button onClick={closecontpass} className='btn btn-close closecont' ></button>
            <h2> Update Your Password : </h2>
            <hr className='mt-0 mb-4' /> 
            {errorbach? <p className='alert alert-danger p-3 mt-1' > {errorbach} </p>:""}
            <label> CurrentPasword : </label>
            <input onChange={getdata} id='currentPassword' type="password" name='currentPassword' className='form-control' />
            {errors.currentPassword? <p className='alert alert-danger p-1' > {errors.currentPassword} </p>:""}
            <hr />
            <label> NewPasswprd : </label>
            <input onChange={getdata} id='password' type="password" name='password' className='form-control' />
            {errors.password? <p className='alert alert-danger p-1 mt-1' > {errors.password} </p>:""}
            <label> rePassword : </label>
            <input onChange={getdata} type="password" id='rePassword' name='rePassword' className='form-control' />
            {errors.rePassword? <p className='alert alert-danger p-1 mt-1' > {errors.rePassword} </p>:""}

                <div className='mt-3' >
                <button 
                className={Object.keys(errors).some(key => errors[key]) || loadingbtn ? "btn btn-success disabled" : "btn btn-success"} 
                onClick={() => change(user)}
                        >   
                    {loadingbtn !== true ? "Change" : <i className='fas fa-spinner fa-spin'></i>}
                        </button>

                <button className='btn btn-success ms-2' onClick={closecontpass} > Close </button>
            </div>
        </div>
        <div className="contchangepass d-none" id='contdata' >
            <button className='btn btn-close closecont' onClick={closecontdata} ></button>
            <h2> Update Your Data : </h2>
            {errorbach2? <p className='alert alert-danger p-3 mt-1' > {errorbach2} </p>:""}
            <hr className='mt-0 mb-4' /> 
            <label> New Name : </label>
            <input type="text" id='name' onChange={getuserdata} name='name' className='form-control' />
             {errors2.name? <p className='alert alert-danger p-1' > {errors2.name} </p>:""}
            <hr />
            <label> New Email : </label>
            <input type="email" id='email' onChange={getuserdata} name='email' className='form-control' />
            {errors2.email? <p className='alert alert-danger p-1' > {errors2.email} </p>:""}
            <div className='mt-3' >
                <button 
                className={Object.keys(errors2).some(key => errors2[key]) || loadingbtn2 ? "btn btn-success disabled" : "btn btn-success"} 
                onClick={() => change2(updateuserdat)}
                        >   
                    {loadingbtn2 !== true ? "Change" : <i className='fas fa-spinner fa-spin'></i>}
                        </button>
                <button className='btn btn-success ms-2' onClick={closecontdata} > Close </button>
            </div>
        </div>
     <div className='container w-md-75 mx-auto mt-4        ' >
        <h2 className='alert alert-success' > Welcome {userdata.name}   </h2>
        <h2   className='alert alert-success'  > Your Email : {userdata.email}  </h2>
        <h2   className='alert alert-success'  > Your Role : {userdata.role}  </h2>
        <div className="btns">
            <button className='btn btn-success mt-3' onClick={appercontpass} > Change Password </button>
            <button className='btn btn-success ms-md-2 mt-3' onClick={appercontdata} > Change My data </button>
        </div>
     </div>
     <ToastContainer/>
    </div>
  )
}
