import { ErrorMessage, Field, Form, Formik } from "formik"
import LoginRegisterLayout from "./LoginRegisterLayout"
import { BiKey, BiUser } from 'react-icons/bi'
import { Envelope } from 'react-bootstrap-icons'
import { useRegisterMutation } from './authApiSlice'
import { useState } from 'react'

import './LoginPage.css'
import { Link } from "react-router-dom"

function RegisterPage() {
    const [register] = useRegisterMutation()

    const [errMsg, setErrMsg] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    let errField = ['fullName']

    const handleValidate = values => {
        const errors = {}
        errField = []
        setErrMsg('')

        if (!values.fullName) {
            errors.fullName = 'Full name is required'
            errField.push('fullName')
        } else if (6 > values.fullName.length || values.fullName.length > 30) {
            errors.fullName = 'Full name should be from 6 to 30 characters'
            errField.push('fullName')
        }
        if (!values.username) {
            errors.username = 'Username is required'
            errField.push('username')
        } else if (6 > values.username.length || values.username.length > 20) {
            errors.username = 'Username should be from 6 to 20 characters'
            errField.push('username')
        }
        if (!values.email) {
            errors.email = 'Email is required'
            errField.push('email')
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
            errField.push('email')
        }
        if (!values.password) {
            errors.password = 'Password is required'
            errField.push('password')
        } else if (
            !/^(?=.*\d).{6,20}$/i.test(values.password)
        ) {
            errors.password = 'Password should be from 6 to 20 characters and has at least 1 number';
            errField.push('password')
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Confirm password is required'
            errField.push('passwordConfirm')
        }
        else if (values.password != values.passwordConfirm) {
            errors.passwordConfirm = 'Confirm password does not match'
            errField.push('passwordConfirm')
        }
        return errors;
    }

    

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            await register(values)
            await waitForSmoothTransition()
        } catch (err) {
            console.log(err)
            if (!err.data) {
                setErrMsg('No Server Response')
            } else if (err.data.message) {
                setErrMsg(err.data.message)
            }
            else {
                setErrMsg('Register Failed')
            }
        }
    }

    const waitForSmoothTransition = () => {
        return new Promise((resolve, _) => {
          setTimeout(() => {
              setIsSuccess(true)
              resolve()
          }, 1500);
        })
    }

    return (
        <LoginRegisterLayout>
            <Formik
                initialValues={{ fullName: '', username: '', email: '', password: '', passwordConfirm: '' }}
                validate={handleValidate}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ isSubmitting, errors }) => (
                    <Form className='w-325'>
                        <div className="form-group position-relative mb-3">
                            <label htmlFor="fullName" className="label-icon">
                                <BiUser />
                            </label>
                            <Field
                                className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.fullName ? 'border-danger' : ''}`}
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                autoFocus={errField[0] == 'fullName'}
                            />
                            <ErrorMessage name="fullName" component="div" className="mb-0 text-danger small text-start" />
                        </div>
                        <div className="form-group position-relative mb-3">
                            <label htmlFor="username" className="label-icon">
                                <BiUser />
                            </label>
                            <Field
                                className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.username ? 'border-danger' : ''}`}
                                type="text"
                                name="username"
                                placeholder="Username"
                                autoFocus={errField[0] == 'username'}
                            />
                            <ErrorMessage name="username" component="div" className="mb-0 text-danger small text-start" />
                        </div>
                        <div className="form-group position-relative mb-3">
                            <label htmlFor="email" className="label-icon">
                                <Envelope />
                            </label>
                            <Field
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
                            <label htmlFor="password" className="label-icon position-absolute">
                                <BiKey />
                            </label>
                            <Field
                                className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.password ? 'border-danger' : ''}`}
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                autoFocus={errField[0] == 'password'}
                            />
                            <ErrorMessage name="password" component="div" className="mb-0 text-danger small text-start" />
                        </div>
                        <div className="form-group position-relative mb-3">
                            <label htmlFor="passwordConfirm" className="label-icon position-absolute">
                                <BiKey />
                            </label>
                            <Field
                                className={`form-control rounded-5 ps-5 bg-info-subtle ${errors.passwordConfirm ? 'border-danger' : ''}`}
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                autoFocus={errField[0] == 'passwordConfirm'}
                            />
                            <ErrorMessage name="passwordConfirm" component="div" className="mb-0 text-danger small text-start" />
                        </div>

                        <p className="mb-1 text-danger small text-start">{errMsg}</p>

                        <button
                            disabled={isSubmitting}
                            type='submit'
                            className="primary-button rounded-5 fw-normal mb-3"
                        >Create your account</button>
                        {isSubmitting &&
                            <p className='small'>signing you up...</p>
                        }
                        {isSuccess ?
                            <p className="text-center text-success small">Sign up successfully, click here to <Link to='/login'>Sign in</Link></p>
                            :
                            <p className="text-center small">Already have an account? <Link to='/login'>Sign in</Link></p>
                        }
                    </Form>
                )}
            </Formik>
        </LoginRegisterLayout>
    );
}

export default RegisterPage