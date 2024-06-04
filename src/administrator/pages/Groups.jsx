import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useAdminGroupsQuery } from "../adminApiSlice";
import { Button } from "react-bootstrap";

const groupHeaders = [
    { style: { width: 10 }, content: '#' },
    { content: 'Group Name' },
    { content: 'Visibility' },
    { content: 'Creator' },
    { content: 'Members' },
    { content: 'Create Date' },
    { content: 'Status' },
    { content: 'Reports' },
    { content: 'Action' },
]

function Groups() {
    const {data: groups, isLoading} = useAdminGroupsQuery()
    if (!groups) return
    return (<>
        <ContentHeader pageName={'Groups'} />

        <div className="admin-content">
            <div className="container-fluid">
                <FullWidthTable header={groupHeaders}>
                    {groups.map((u,i) => 
                        <tr key={i}>
                            <td>{++i}.</td>
                            <td>{u.groupname}</td>
                            <td>{u.public_group ? "Public" : "Private"}</td>
                            <td>{u.creator}</td>
                            <td>{u.member_count}</td>
                            <td>{u.created_at}</td>
                            <td>{u.active ? "Active" : "Inactive"}</td>
                            <td>{u.reports_of_group}</td>
                            <td></td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
    </>);
}

export default Groups;