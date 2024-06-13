import { useState } from "react";
import * as Yup from 'yup';
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import { IoFemale, IoMale } from "react-icons/io5";
import { Field, Form, Formik } from "formik";
import {
    useAdminCreateUserMutation,
    useAdminPatchUserRoleMutation,
    useAdminUsersQuery
} from "../adminApiSlice";

import BeehubSpinner from "../../../src/components/BeehubSpinner";
import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import UserModal from "../components/modals/UserModal";
import DeleteButton from "../components/actions/DeleteButton";
import BanButton from "../components/actions/BanButton";

const userHeader = [
    { style: { width: 10 }, content: 'id' },
    { content: 'Username' },
    { content: 'Email' },
    { content: 'Full Name' },
    { content: 'Gender' },
    { style: { width: 60 }, content: 'No of posts' },
    { style: { width: 60 }, content: 'No of friends' },
    { style: { width: 110, textAlign: 'center' }, content: 'Role' },
    { content: 'Status' },
    { style: { width: 80, textAlign: 'center' }, content: 'Action' },
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
    const [updateRole, { error: updateError, isLoading: isUpdating }] = useAdminPatchUserRoleMutation()

    const [successMessage, setSuccessMessage] = useState('')

    const [chosenUser, setChosenUser] = useState('')
    const [openUserModal, setOpenUserModal] = useState(false)

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
            console.error(e)
        }
    }

    const getGender = (gender) => {
        if (gender === 'female') return <IoFemale color="red" />
        if (gender === 'male') return <IoMale color="blue" />
    }

    const getStatus = (status) => {
        if (status === 'active') return <Badge bg="success">active</Badge>
        if (status === 'inactive') return <Badge bg="danger">inactive</Badge>
        if (status === 'banned') return <Badge bg="secondary">banned</Badge>
    }

    const handleOpenModal = (e, reportedCase, caseType) => {
        e.preventDefault()
        setChosenUser(reportedCase)
        setOpenUserModal(true)
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
                                <small className="text-danger ms-4">{error?.data?.message || updateError?.data?.message}</small>
                                <small className="text-success ms-4">{successMessage}</small>
                            </div>
                            {(isLoading || isFetching || isUpdating) && <div className="ms-auto d-flex align-items-end"><BeehubSpinner /></div>}
                        </Form>
                    )}
                </Formik>


                {(users && users.length > 0) &&
                    <FullWidthTable
                        header={userHeader}
                        total={users.length}
                        perPage={perPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    >
                        {currentData.map((u, i) =>
                            <tr key={i}>
                                <td>{u.id}</td>
                                <td>
                                    <a href={`user/${u.id}`} onClick={e => handleOpenModal(e, u.id, 'user')}>{u.username}</a>
                                </td>
                                <td>{u.email}</td>
                                <td>{u.fullName}</td>
                                <td className="text-center">{getGender(u.gender)}</td>
                                <td className="text-center">{u.noOfPosts}</td>
                                <td className="text-center">{u.noOfFriends}</td>
                                <td>
                                    <select className="form-select form-select-sm py-0" defaultValue={u.role} onChange={e => updateRole({ id: u.id, role: e.currentTarget.value })}>
                                        <option value="ROLE_ADMIN">Admin</option>
                                        <option value="ROLE_USER">User</option>
                                    </select>
                                </td>
                                <td>{getStatus(u.status)}</td>
                                <td>
                                    <ButtonGroup>
                                        <BanButton size={'sm'} isBanned={u.status === 'banned'} userId={u.id} />
                                        <DeleteButton
                                            caseId={u.id}
                                            caseType={'user'}
                                            confirmContent={'Are you sure you want to delete this user?'}
                                            size={'sm'}
                                        />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </FullWidthTable>
                }
            </div>
        </div>
        <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} userId={chosenUser} />
    </>);
}

export default Users;