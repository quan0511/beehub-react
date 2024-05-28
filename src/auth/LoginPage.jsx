import { BiKey, BiUser } from 'react-icons/bi';
import './LoginPage.css'
import { FaLaptop, FaShoppingBasket } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoginLoading }] = useLoginMutation()
    const [logout, { isLogoutLoading }] = useLogoutMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...userData }))

            setEmail('')
            setPassword('')
            console.log(userData)
            navigate('/')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

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
                            <form className="login-form">
                                <div className="form-group position-relative mb-2">
                                    <label htmlFor="username" className="label-icon">
                                        <BiUser />
                                    </label>
                                    <input ref={emailRef}
                                        value={email}
                                        onChange={handleEmailInput}
                                        id="username"
                                        className="form-control rounded-5 ps-5 bg-info-subtle"
                                        type="text" placeholder="Email or username"
                                    />
                                </div>
                                <div className="form-group position-relative mb-2">
                                    <label htmlFor="password" className="label-icon position-absolute">
                                        <BiKey />
                                    </label>
                                    <input
                                        value={password}
                                        onChange={handlePasswordInput}
                                        id="password"
                                        className="form-control rounded-5 ps-5 bg-info-subtle"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete='password'
                                    />
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
                                    onClick={handleSubmit}
                                    type='button'
                                    className="primary-button rounded-5 fw-normal mb-2"
                                >Log into your account</button>

                                <p className="text-center"><a className='small' href='#'>Sign up</a></p>

                                <button onClick={handleLogout} type='button' className='btn btn-danger'>Logout</button>
                            </form>
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