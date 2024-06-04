import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useAdminUsersQuery } from "../adminApiSlice";
import { Button } from "react-bootstrap";

const sampleHeader = [
    { style: { width: 10 }, content: '#' },
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

function Users() {
    const {data: users, isLoading} = useAdminUsersQuery()
    if (!users) return
    console.log(users)
    return (<>
        <ContentHeader title={'Users'} pageName={'Users'} />

        <div className="admin-content">
            <div className="container-fluid">
                <Button size="lg" variant="success" className="ms-auto mb-3">Add</Button>
                <FullWidthTable header={sampleHeader}>
                    {users.map((u,i) => 
                        <tr key={i}>
                            <td>{++i}.</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.fullName}</td>
                            <td>{u.gender}</td>
                            <td>{u.noOfPosts}</td>
                            <td>{u.noOfFriends}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td>
                                <Button size="sm" variant="danger">Delete</Button>
                            </td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
    </>);
}

export default Users;