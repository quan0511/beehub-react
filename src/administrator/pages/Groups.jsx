import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useAdminGroupsQuery } from "../adminApiSlice";
import { Button } from "react-bootstrap";
import dateFormat from "dateformat";

const groupHeaders = [
    { style: { width: 10 }, content: 'Id' },
    { content: 'Group Name' },
    { content: 'Visibility' },
    { content: 'Members' },
    { content: 'Create Date' },
    { content: 'Status' },
    { content: 'Action' },
]

function Groups() {
    const {data: groups, isLoading} = useAdminGroupsQuery()
    if (!groups) return
    return (<>
        <ContentHeader pageName={'Groups'} />

        <div className="admin-content">
            <div className="container-fluid">
                <FullWidthTable title={"Groups"} header={groupHeaders}>
                    {groups.map(g => 
                        <tr key={g.id}>
                            <td>{g.id}.</td>
                            <td>{g.groupname}</td>
                            <td>{g.public_group ? "Public" : "Private"}</td>
                            <td>{g.member_count}</td>
                            <td>{dateFormat(g.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                            <td>{g.active ? "Active" : "Inactive"}</td>
                            <td><Button size="sm" variant="danger">Block</Button></td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
    </>);
}

export default Groups;