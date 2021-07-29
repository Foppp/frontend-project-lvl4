import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import useAuth from '../hooks/index';
import * as Yup from 'yup';
import cn from 'classnames';
import Hexlet from '../images/hexlet.png';

const SignupPage = () => {
  const { t } = useTranslation();
  const inputFocus = useRef(null);

  useEffect(() => inputFocus.current.focus(), []);

  const [signupStatus, setSignupStatus] = useState(null)
  const [signupError, setSignupError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = async (data) => {
    setSignupStatus('pending')
    try {
      const response = await axios.post('/api/v1/signup', data);
      localStorage.setItem('userId', JSON.stringify(response.data));
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
      setSignupStatus('fullfiled');
    } catch (e) {
      setSignupStatus('rejected');
      if (e.response.status === 409) {
        setSignupError(t('errors.userExist'));
        return;
      }
        setSignupError('errors.unknown');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ username, password }) => {
      handleSubmit({ username, password });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required()
        .min(3)
        .max(20),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
    }),
  });

  const userNameClassName = cn('form-control', {
    'is-invalid': signupError || (_.has(formik.errors, 'username') && formik.touched.username),
  });
  const passClassName = cn('form-control', {
    'is-invalid': _.has(formik.errors, 'password') && formik.touched.password,
  });
  const confirmPassClassName = cn('form-control', {
    'is-invalid': _.has(formik.errors, 'confirmPassword') && formik.touched.confirmPassword,
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
                <h3 className="text-center mb-4">{t('signUp.title')}</h3>
                <div className="form-floating mb-4 form-group">
                  <input
                    ref={inputFocus}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signUp.userName')}
                    type="text"
                    id="username"
                    className={userNameClassName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    disabled={signupStatus === 'pending'}
                  />
                  <label htmlFor="username">{t('signUp.userName')}</label>
                  <div className="invalid-tooltip">{signupError || formik.errors.username}</div>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('signUp.password')}
                    type="password"
                    id="password"
                    className={passClassName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    disabled={signupStatus === 'pending'}
                  />
                  <label htmlFor="password">{t('signUp.password')}</label>
                  <div className="invalid-tooltip">{formik.errors.password}</div>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    name="confirmPassword"
                    autoComplete="confirm-password"
                    required
                    placeholder={t('signUp.confirmPassword')}
                    type="password"
                    id="confirmPassword"
                    className={confirmPassClassName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    disabled={signupStatus === 'pending'}
                  />
                  <label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</label>
                  <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 mt-3 btn btn-outline-primary"
                  disabled={signupStatus === 'pending'}
                >
                  {t('buttons.signUpButton')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
