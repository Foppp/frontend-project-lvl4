import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Hexlet from '../images/hexlet.png';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
 }),
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm rounded">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={Hexlet} alt="logo" className="col-12 col-md-10 d-flex"></img>
              </div>
              <form className="col-12 col-md-6 mt-3 mt-mb-0 needs-validation" onSubmit={formik.handleSubmit} noValidate>
                <div className="form-floating mb-3 form-group">
                  <input
                    name="userName"
                    autoComplete="username"
                    required
                    placeholder="Nickname"
                    type="text"
                    id="username"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.errors.userName && formik.touched.userName? (
                    <div className="invalid-feedback">{formik.errors.userName}</div>
                  ) : null}
                </div>
                  <div className="form-floating mb-4 form-group">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password? (
                    <div className="invalid-tooltip">{formik.errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Log In</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Don't have account? </span>
                <a href="/signup">Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
