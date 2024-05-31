import LoginRegisterLayout from './LoginRegisterLayout';
import { setCredentials } from './authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApiSlice';
import { useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope } from 'react-bootstrap-icons';
import { BiKey } from 'react-icons/bi';

import './LoginPage.css'
import { ADMIN } from '../administrator/RequireAdmin';

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()

    const [ errMsg, setErrMsg ] = useState('')
    
    let errField = ['email']

    const handleValidate = values => {
        const errors = {};
        errField = []
        setErrMsg('')

        if (!values.email) {
            errors.email = 'Email is required';
            errField.push('email')
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
            errField.push('email')
        }
        if (!values.password) {
            errors.password = 'Password is required';
            errField.push('password')
        } else if (
            !/^(?=.*\d).{6,20}$/i.test(values.password)
        ) {
            errors.password = 'Password should be from 6 to 20 characters and has at least 1 number';
            errField.push('password')
        }
        return errors;
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            const userData = await login(values).unwrap()
            dispatch(setCredentials({ ...userData }))
            if (userData.roles.includes(ADMIN)) {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (err) {
            if (!err.data) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Email or Password is invalidate')
            } else if (err.status === 401) {
                setErrMsg('Email or password is incorrect');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    return (
        <LoginRegisterLayout>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={handleValidate}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ isSubmitting, errors }) => (

                        <Form className='w-325'>
                            <div className="form-group position-relative mb-3">
                                <label htmlFor="username" className="label-icon"><Envelope /></label>
                                <Field
                                    id="email"
                                    className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.email ? 'border-danger' : ''}`}
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    autoComplete="email"
                                    autoFocus={errField[0] == 'email'}
                                />
                                <ErrorMessage name="email" component="div" className="mb-0 text-danger small text-start" />
                            </div>
                            <div className="form-group position-relative mb-3">
                                <label htmlFor="password" className="label-icon position-absolute"><BiKey /></label>
                                <Field
                                    id="password"
                                    className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.password ? 'border-danger' : ''}`}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    autoFocus={errField[0] == 'password'}
                                />
                                <ErrorMessage name="password" component="div" className="mb-0 text-danger small text-start" />
                            </div>
                            <p className="mb-1 text-danger small text-start">{errMsg}</p>

                            <button
                                disabled={isSubmitting}
                                type='submit'
                                className="primary-button rounded-5 fw-normal mb-2"
                            >Log into your account</button>
                            {isSubmitting && 
                                <p className='small'>sign you in...</p>
                            }
                            <p className="text-center"><Link className='small' to='/register'>Sign up</Link></p>
                        </Form>
                )}
            </Formik>
        </LoginRegisterLayout>
    );
}

export default LoginPage;