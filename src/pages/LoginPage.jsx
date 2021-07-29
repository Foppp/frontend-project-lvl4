import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index';
import * as Yup from 'yup';
import cn from 'classnames';
import Hexlet from '../images/hexlet.png';

const LoginPage = () => {
  const { t } = useTranslation();
  const inputFocus = useRef(null);

  useEffect(() => inputFocus.current.focus(), []);

  const [loginStatus, setLoginStatus] = useState(null)
  const [error, setError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = async (data) => {
    setLoginStatus('pending')
    try {
      const response = await axios.post('/api/v1/login', data);
      localStorage.setItem('userId', JSON.stringify(response.data));
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
      setLoginStatus('fullfiled');
    } catch (e) {
      setError(true)
      setLoginStatus('rejected');
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
      .required(),
    password: Yup.string()
      .required(),
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
                <img src={Hexlet} alt="logo" className="col-12 col-md-10 d-flex w-75"></img>
              </div>
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h3 className="text-center mb-4">{t('logIn.title')}</h3>
                <div className="form-floating mb-3 form-group">
                  <input
                    ref={inputFocus}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    type="text"
                    id="username"
                    className={className}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    disabled={loginStatus === 'pending'}
                  />
                  <label htmlFor="username">{t('logIn.userName')}</label>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={className}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    disabled={loginStatus === 'pending'}
                  />
                  <label htmlFor="username">{t('logIn.password')}</label>
                  {error && <div className="invalid-tooltip">{t('errors.wrongUsername')}</div>}
                </div>
                <button type="submit" className="w-100 mb-3 mt-3 btn btn-outline-primary" disabled={loginStatus === 'pending'}>{t('buttons.logInButton')}</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('logIn.noAccount')} </span>
                <Link to="/signup">{t('logIn.register')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
