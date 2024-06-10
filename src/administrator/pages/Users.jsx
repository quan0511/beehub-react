import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useAdminCreateUserMutation, useAdminUsersQuery } from "../adminApiSlice";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import { IoFemale, IoMale } from "react-icons/io5";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import BeehubSpinner from "../../../src/components/BeehubSpinner";
import { useState } from "react";

const userHeader = [
    { style: { width: 10 }, content: 'id' },
    { content: 'Username' },
    { content: 'Email' },
    { content: 'Full Name' },
    { content: 'Gender' },
    { content: 'No of posts' },
    { content: 'No of friends' },
    { content: 'Role' },
    { content: 'Status' },
    { content: 'Action' },
]

const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'too Short!')
        .max(30, 'too Long!')
        .required('required'),
    email: Yup.string().email('invalid email').required('required'),
    password: Yup.string().required('required'),
});

function Users() {
    const { data: users, isLoading, isFetching } = useAdminUsersQuery()
    const [createUser, { error, isLoading: isCreateLoading, isSuccess }] = useAdminCreateUserMutation()
    const [successMessage, setSuccessMessage] = useState('')
    
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const currentData = users ? users.slice(firstIndex, lastIndex) : []

    const handleCreateUser = async (values, { resetForm }) => {
        try {
            const response = await createUser(values).unwrap()
            setSuccessMessage(response.message)
            resetForm()
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (e) {
            console.log(e)
        }
    }

    const getGender = (gender) => {
        if (gender === 'female') return <IoFemale color="red" />
        if (gender === 'male') return <IoMale color="blue" />
    }

    const getRole = (role) => {
        if (role === 'ROLE_ADMIN') return <Badge bg="primary">admin</Badge>
        if (role === 'ROLE_USER') return <Badge bg="secondary">user</Badge>
    }

    const getStatus = (status) => {
        if (status === 'active') return <Badge bg="success">active</Badge>
        if (status === 'inactive') return <Badge bg="light" text="dark">inactive</Badge>
    }

    return (<>
        <ContentHeader title={'Users'} pageName={'Users'} />

        <div className="admin-content">
            <div className="container-fluid">
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={handleCreateUser}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ errors, touched, resetForm }) => (
                        <Form className="d-md-flex gap-2 mb-4">
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <Field id="username" name="username" className="form-control" placeholder="Enter username" />
                                <small className="text-danger position-absolute ps-2">{touched.username && errors.username && <div>{errors.username}</div>}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <Field id="email" name="email" className="form-control" placeholder="Enter email" />
                                <small className="text-danger position-absolute ps-2">{touched.email && errors.email && <div>{errors.email}</div>}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field type="password" id="password" name="password" className="form-control" placeholder="Enter password" />
                                <small className="text-danger position-absolute ps-2">{touched.password && errors.password && <div>{errors.password}</div>}</small>
                            </div>
                            <div className="form-group d-flex align-items-end ms-3">
                                <Button type="submit" size="md" variant="success" className="">
                                    {isCreateLoading ? <BeehubSpinner /> : 'Add'}
                                </Button>
                                {(errors.username || errors.email || errors.password) && <Button className="ms-2" variant="secondary" onClick={resetForm}>Clear</Button>}
                                <small className="text-danger ms-4">{error?.data?.message}</small>
                                <small className="text-success ms-4">{successMessage}</small>
                            </div>
                        </Form>
                    )}
                </Formik>

                {(isLoading || isFetching) && <div className="d-flex justify-content-center align-items-center h-100"><BeehubSpinner /></div>}

                {(users && users.length > 0) &&
                    <FullWidthTable header={userHeader} total={users.length} perPage={perPage} setCurrentPage={setCurrentPage} currentPage={currentPage}>
                        {currentData.map((u, i) =>
                            <tr key={i}>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.fullName}</td>
                                <td>{getGender(u.gender)}</td>
                                <td className="ps-5">{u.noOfPosts}</td>
                                <td className="ps-5">{u.noOfFriends}</td>
                                <td>{getRole(u.role)}</td>
                                <td>{getStatus(u.status)}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="secondary">Ban</Button>
                                        <Button size="sm" variant="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </FullWidthTable>
                }
            </div>
        </div>
    </>);
}

export default Users;