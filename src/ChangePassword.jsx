import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ChangePassword({ title }) {
  let navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  async function submitResetMail(values) {
    setLoading(true);
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response.data.message, {
          position: "top-right",
        });
      });
    if (data?.token) {
      setLoading(false);
      toast.success("Successfully Updated", {
        position: "top-right",
      });
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),
    newPassword: Yup.string()
      .min(6)
      .required("Password Field is required."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitResetMail,
  });
  return (
    <>
      <div className="row vh-100  justify-content-center align-items-center">
        <div className=" col-md-8 px-md-5 mx-auto  position-relative">
          <h2>Change Password</h2>

          <form
            onSubmit={formik.handleSubmit}
            className="d-flex justify-content-center flex-column gap-2"
          >
            <label htmlFor="email">Enter Your Email:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              className="form-control mb-3"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="form-text text-danger ps-2 mb-3">
                <strong>{formik.errors.email}</strong>
              </p>
            )}
            <label htmlFor="newPassword">Enter New Password:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              className="form-control mb-3"
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="form-text text-danger ps-2 mb-3">
                <strong>{formik.errors.newPassword}</strong>
              </p>
            )}
            {isLoading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-success align-self-md-start"
              >
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-success align-self-md-start"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
         <ToastContainer  />
    </>
  );
}
