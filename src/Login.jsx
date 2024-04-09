 import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';

export default function Login(props) {

   const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
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
      setErrors(errorsObj);
      setLoading(false);
    }
  }

  async function check(values) {
    try {
      const { data } = await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      if (data.message === "success") {
      localStorage.setItem("token" , data.token)
      localStorage.setItem("userdata" , JSON.stringify(data.user))
      props.userdatatoken()
        navigate('/home');
      }
    } catch (err) {
      setErrors({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='w-75 w-sm-100 mx-auto form'>
      

    <h1 className='mt-3' >Log In :</h1>
      <form onSubmit={handleSubmit}>
        {errors.message && <p className='alert alert-danger bold'>{errors.message}</p>}
        <label className='mt-2' htmlFor="email">Email</label>
        <input onChange={handleChange} className='form-control' type="email" name="email" id="email" />
        {errors.email && <p className="alert alert-danger m-1">{errors.email}</p>}
        <label className='mt-2' htmlFor="password">Password</label>
        <input onChange={handleChange} className='form-control' type="password" name="password" id="password" />
        {errors.password && <p className="alert alert-danger m-1">{errors.password}</p>}
        <p className='mt-2' ><Link to="/resetpass" className='text-primary' > Forget Password ?  </Link></p>
        <button type="submit" className='btn btn-primary m-2' disabled={loading}>
          {loading ? <i className='fas fa-spinner fa-spin' /> : "Log in"}
        </button>
      </form>

    

    </div>
  )
}
