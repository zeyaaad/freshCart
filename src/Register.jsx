import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function Register() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: ""
  });
  // let [resonse , setresponse]=useState(null)
  const navigate = useNavigate();
  const schema = yup.object().shape({
  name: yup.string().required().matches(/^[a-zA-Z0-9\s]+$/, 'Invalid name format'),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  // rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
});


  function handleChange(e) {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  }

  async function validateField(fieldName, value) {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error.message }));
    }
  }

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true); 
  try {
    await schema.validate(userData, { abortEarly: false });
    setErrors({});
    await check(userData);
  } catch (validationErrors) {
    const errorsObj = {};
    validationErrors.inner.forEach(error => {
      errorsObj[error.path] = error.message;
    });
    setErrors(prevErrors => ({ ...prevErrors, ...errorsObj })); 
    setLoading(false);  
  }
}


  async function check(values) {
    try {
      const { data } = await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (data.message === "success") {
        navigate('/login');
      }
    } catch (err) {
      setErrors({ message: err.response.data.message });
    } finally {
      setLoading(false); 
      
    } 
  }

  return (
    <div className=' w-75 mx-auto form'>
      <h1>Register :</h1>
      <form onSubmit={handleSubmit}>
        {errors.message && <p className='alert alert-danger bold'> {errors.message==="fail"? "rePassword Must match ": <>{errors.message}</>} </p>}
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} className='form-control' type="text" name="name" id="name" />
        {errors.name && <p className="alert alert-danger m-1">{errors.name}</p>}
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} className='form-control' type="email" name="email" id="email" />
        {errors.email && <p className="alert alert-danger m-1">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} className='form-control' type="password" name="password" id="password" />
        {errors.password && <p className="alert alert-danger m-1">{errors.password}</p>}
        <label htmlFor="rePassword">Re-enter Password</label>
        <input onChange={handleChange} className='form-control' type="password" name="rePassword" id="rePassword" />
        <button type="submit"  className={Object.keys(errors).length>0?"btn btn-primary mt-2  ":"btn btn-primary mt-2 "} disabled={loading}>
          {loading ? <i className='fas fa-spinner fa-spin' /> : "Register"}
        </button>
      </form>
    </div>
  );
}
