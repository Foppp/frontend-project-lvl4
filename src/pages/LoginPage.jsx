import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/index';
import * as Yup from 'yup';
import cn from 'classnames';
import Hexlet from '../images/hexlet.png';
// import routes from '../routes';

const LoginPage = () => {
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);
  const [error, setError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();


  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('/api/v1/login', data);
      localStorage.setItem('userId', JSON.stringify(response.data));
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (e) {
      setError(true)
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      handleSubmit(values);
    },
    validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),
    }),
  });
  const className = cn({
    'form-control': true,
    'is-invalid': error,
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
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Log In</h1>
                <div className="form-floating mb-3 form-group">
                  <input
                    ref={inputFocus}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    type="text"
                    id="username"
                    className={className}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <label htmlFor="username">Nickname</label>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={className}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label htmlFor="username">Password</label>
                  <div className="invalid-tooltip">Incorrect Username or Password</div>
                </div>
                <button type="submit" className="w-100 mb-3 mt-3 btn btn-outline-primary">Sign in</button>
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
