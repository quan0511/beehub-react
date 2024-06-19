import { useState } from "react";
import * as Yup from 'yup';
import dateFormat from "dateformat";
import { Button, ButtonGroup } from "react-bootstrap";
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
import GetStatus from "../../utils/GetStatus";
import GetGender from "../../utils/GetGender";
import GetMultipleReportType from "../../utils/GetMultipleReportType";
import UpdateRole from "../components/actions/UpdateRole";

const userHeader = [
    { style: { width: 10 }, content: 'id' },
    { content: 'Username' },
    { content: 'Email' },
    { content: 'Create Date' },
    { content: 'Gender' },
    { style: { width: 60 }, content: 'No of posts' },
    { style: { width: 60 }, content: 'No of friends' },
    { content: 'Reports' },
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
    const { data: users, isLoading } = useAdminUsersQuery()
    const [createUser, { error, isLoading: isCreateLoading }] = useAdminCreateUserMutation()

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

    const handleOpenModal = (e, userId) => {
        e.preventDefault()
        setChosenUser(userId)
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
                            <div className="form-group mb-3 mb-md-0">
                                <label htmlFor="username" className="form-label">Username</label>
                                <Field id="username" name="username" className="form-control" placeholder="Enter username" autoComplete="username" />
                                <small className="text-danger position-absolute ps-2">{touched.username && errors.username && <div>{errors.username}</div>}</small>
                            </div>
                            <div className="form-group mb-3 mb-md-0">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <Field id="email" name="email" className="form-control" placeholder="Enter email" autoComplete="email" />
                                <small className="text-danger position-absolute ps-2">{touched.email && errors.email && <div>{errors.email}</div>}</small>
                            </div>
                            <div className="form-group mb-3 mb-md-0">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field type="password" id="password" name="password" className="form-control" placeholder="Enter password" autoComplete="current-password" />
                                <small className="text-danger position-absolute ps-2">{touched.password && errors.password && <div>{errors.password}</div>}</small>
                            </div>
                            <div className="form-group mb-3 mb-md-0 d-flex align-items-end ms-3">
                                <Button type="submit" size="md" variant="success" className="">
                                    {isCreateLoading ? <BeehubSpinner /> : 'Add'}
                                </Button>
                                {(errors.username || errors.email || errors.password) && <Button className="ms-2" variant="secondary" onClick={resetForm}>Clear</Button>}
                                <small className="text-danger ms-4">{error?.data?.message}</small>
                                <small className="text-success ms-4">{successMessage}</small>
                            </div>
                            {isLoading && <div className="ms-auto d-flex align-items-end"><BeehubSpinner /></div>}
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
                                    <a href={`user/${u.id}`} onClick={e => handleOpenModal(e, u.id)}>{u.username}</a>
                                </td>
                                <td>{u.email}</td>
                                <td>{dateFormat(u.createdAt, "dddd, mmmm dS, yyyy")}</td>
                                <td><GetGender gender={u.gender} /></td>
                                <td>{u.noOfPosts}</td>
                                <td>{u.noOfFriends}</td>
                                <td>
                                    <GetMultipleReportType reports={u.reportTitleList} />
                                </td>
                                <td>
                                    <UpdateRole id={u.id} role={u.role}/>
                                </td>
                                <td>{<GetStatus status={u.status} />}</td>
                                <td>
                                    {u.role === 'ROLE_USER' &&
                                        <ButtonGroup>
                                            <BanButton size={'sm'} isBanned={u.status === 'banned'} userId={u.id} />
                                            <DeleteButton
                                                caseId={u.id}
                                                caseType={'user'}
                                                confirmContent={'Are you sure you want to delete this user?'}
                                                size={'sm'}
                                            />
                                        </ButtonGroup>}
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