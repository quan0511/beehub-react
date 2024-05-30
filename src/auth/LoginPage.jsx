import { BiKey, BiUser } from 'react-icons/bi';
import './LoginPage.css'
import { FaLaptop, FaShoppingBasket } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [pwdMsg, setPwdMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const emailRef = useRef()
    const emailErrorRef = useRef()
    const passwordErrorRef = useRef()
    const errRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    const [login, { isLoginLoading }] = useLoginMutation()
    const [logout, { isLogoutLoading }] = useLogoutMutation()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     emailRef.current.focus()
    // }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (values, { setSubmitting }) => {

        try {
            const userData = await login(values).unwrap()
            dispatch(setCredentials({ ...userData }))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (err) {
            console.log(err)
            if (!err.data) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setEmailMsg(err.data?.email)
                setPwdMsg(err.data?.password)
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const message = await logout().unwrap()
            console.log(message)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='position-relative h-100vh'>
            <div className="bg-black">
                <div className="container">
                    <div className="d-flex justify-content-center py-4">
                        <div>
                            <img width={100} src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/07/white-logo.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container mt-md-5">
                <div className="row flex-row-reverse">
                    <div className="col-12 col-md-6 bg-white py-5">
                        <div className="d-flex flex-column align-items-center ">
                            <div className="mb-5">
                                <img width={60} src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/07/logo-icon.svg" alt="" />
                            </div>
                            <h2 className="mb-2 fw-bold">Welcome</h2>
                            <small className="mb-4">Join gazillions of people online</small>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                    errors.email = 'required';
                                    } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                    errors.email = 'Invalid email address';
                                    }
                                    if (!values.password) {
                                    errors.password = 'required';
                                    } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                    errors.email = 'Invalid email address';
                                    }
                                    return errors;
                                }}
                                onSubmit={handleSubmit}
                                validateOnChange={false}
                                validateOnBlur={true}
                            >
                            {({ isSubmitting }) => (
                                !isSubmitting ? 

                                <Form className='login-form'>
                                    <div className="form-group position-relative mb-2">
                                        <label htmlFor="username" className="label-icon">
                                            <BiUser />
                                        </label>
                                        <Field className="form-control rounded-5 ps-5 bg-info-subtle" type="email" name="email" placeholder="Email address" />
                                        <ErrorMessage name="email" component="div" className="mb-0 text-danger small" />
                                    </div>
                                    <div className="form-group position-relative mb-2">
                                        <label htmlFor="password" className="label-icon position-absolute">
                                            <BiKey />
                                        </label>
                                        <Field type="password" name="password" className="form-control rounded-5 ps-5 bg-info-subtle" placeholder="Password" autoComplete="password" />
                                        <ErrorMessage name="password" component="div" className="mb-0 text-danger small" />
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="form-check d-flex">
                                            <input className='form-check-input' id="remember" type="checkbox" />
                                            <label className='ms-1' role="button" htmlFor="remember">Remember</label>
                                        </div>
                                        <div>
                                            <a href="#">Lost Password?</a>
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        className="primary-button rounded-5 fw-normal mb-2"
                                    >Log into your account</button>

                                    <p className="text-center"><a className='small' href='#'>Sign up</a></p>

                                    <button onClick={handleLogout} disabled={isSubmitting} type='button' className='btn btn-danger'>Logout</button>
                                </Form>
                                :
                                <p className='small'>signin...</p>
                            )}
                            </Formik>
                        </div>
                    </div>

                    <div className='col-12 col-md-6 background-primary text-white p-5'>
                        <div className='mb-4 text-center'>
                            <h3 className='fw-bold'>Join the club</h3>
                            <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaLaptop />
                            </div>
                            <h4 className='fw-bold'>Community</h4>
                            <p>At vero eos et accusamus et.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaShoppingBasket />
                            </div>
                            <h4 className='fw-bold'>Online shop</h4>
                            <p>At vero eos et accusamus et.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaBriefcase />
                            </div>
                            <h4 className='fw-bold'>Job search</h4>
                            <p>At vero eos et accusamus et.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg">
                <div className="bg-backup d-md-none"></div>
                <video className='d-none d-md-block' autoPlay muted playsInline loop src="https://mythemestore.com/friend-finder/videos/8.mp4"></video>
                <div className="bg-overlay"></div>
            </div>
        </div>
    );
}

export default LoginPage;