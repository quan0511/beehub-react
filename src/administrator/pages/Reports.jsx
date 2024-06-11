import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useState } from 'react';
import UserModal from '../components/modals/UserModal';
import GroupModal from '../components/modals/GroupModal';
import PostModal from '../components/modals/PostModal';
import { useReportsQuery } from "../adminApiSlice";
import dateFormat from "dateformat";
import { Badge, Button, ButtonGroup } from "react-bootstrap";
import BeehubSpinner from "../../components/BeehubSpinner";

const tableHeader = [
    { style: { width: 10 }, content: 'Id' },
    { content: 'Reporter' },
    { content: 'Case' },
    { content: 'Type' },
    { content: 'Timestamp' },
    { content: 'Status' },
    { style: { width: 40, textAlign: 'center' }, content: 'Action' },
]

function Reports() {
    const { data: reports, isLoading, isFetching } = useReportsQuery()

    const [openUserModal, setOpenUserModal] = useState(false)
    const [openGroupModal, setOpenGroupModal] = useState(false)
    const [openPostModal, setOpenPostModal] = useState(false)
    const [chosenUser, setChosenUser] = useState('')
    const [chosenGroup, setChosenGroup] = useState('')
    const [chosenPost, setChosenPost] = useState('')

    const handleOpenModal = (e, reportedCase, caseType) => {
        e.preventDefault()
        switch (caseType) {
            case "user":
                setChosenUser(reportedCase)
                setOpenUserModal(true)
                break
            case "group":
                setChosenGroup(reportedCase)
                setOpenGroupModal(true)
                break
            case "post":
                setChosenPost(reportedCase)
                setOpenPostModal(true)
                break
            default:
                break
        }
    }

    const getType = (type) => {
        switch (type) {
            case "violence":
            case "involve a child":
                return <Badge bg="danger">{type}</Badge>
            case "drugs":
            case "spam":
            case "nudity":
                return <Badge bg="warning" text="dark">{type}</Badge>
        }
    }

    if (isLoading || isFetching) return <div className="d-flex justify-content-center align-items-center h-100"><BeehubSpinner/></div>
    if (!reports) return
    return (
        <>
            <ContentHeader pageName={'Reports'} />

            <div className="admin-content">
                <div className="container-fluid">
                    <FullWidthTable title={'Reports'} header={tableHeader}>
                        {reports.length > 0 &&
                            reports.map(d =>
                                <tr key={d.id} className="align-middle">
                                    <td>{d.id}.</td>
                                    <td>
                                        <a href={d.reporter} onClick={e => handleOpenModal(e, d.reporter, 'user')}>{d.reporter}</a>
                                    </td>
                                    <td>
                                        {d.caseType}: {d.caseType === 'user' && <a href={d.reportedCase} onClick={e => handleOpenModal(e, d.reportedCase, d.caseType)}>{d.reportedCase}</a>}
                                        {d.caseType === 'group' && <a href={d.reportedCase} onClick={e => handleOpenModal(e, d.id, d.caseType)}>{d.reportedCase}</a>}
                                        {d.caseType == 'post' && <a href={`post/${d.reportedCase}`} onClick={e => handleOpenModal(e, d.reportedCase, d.caseType)}>PostId_{d.reportedCase}</a>}
                                    </td>
                                    <td>{getType(d.type)}</td>
                                    <td>{dateFormat(d.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                    <td>
                                        {d.status === 'active' && <span className="badge text-bg-success">Active</span>}
                                        {d.status === 'inactive' && <span className="badge text-bg-danger">Banned</span>}
                                        {d.status === 'blocked' && <span className="badge text-bg-secondary">Blocked</span>}
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size='sm' variant="secondary">Ban</Button>
                                            <Button size='sm' variant="danger">Delete</Button>
                                            <Button size='sm' variant="secondary">Block</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        }
                    </FullWidthTable>
                </div>
            </div>

            <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} username={chosenUser} />
            <GroupModal open={openGroupModal} onClose={() => setOpenGroupModal(false)} groupname={chosenGroup} />
            <PostModal open={openPostModal} onClose={() => setOpenPostModal(false)} postId={chosenPost} />
        </>
    );
}

export default Reports;