import dateFormat from "dateformat";
import { useState } from 'react';
import { ArrowRight } from "react-bootstrap-icons";
import { ButtonGroup } from "react-bootstrap";
import { useReportsQuery } from "../adminApiSlice";

import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import UserModal from '../components/modals/UserModal';
import GroupModal from '../components/modals/GroupModal';
import PostModal from '../components/modals/PostModal';
import BeehubSpinner from "../../components/BeehubSpinner";
import DeleteButton from "../components/actions/DeleteButton";
import BanButton from "../components/actions/BanButton";
import BlockButton from "../components/actions/BlockButton";
import GetReportType from "../../utils/GetReportType";
import GetStatus from "../../utils/GetStatus";

const tableHeader = [
    { style: { width: 10 }, content: 'Id' },
    { style: { color: 'blue' }, content: 'Reporter' },
    { style: { color: 'red' }, content: <><ArrowRight /> Case</> },
    { content: 'Type' },
    { content: 'Timestamp' },
    { content: 'Status' },
    { style: { width: 100 }, content: 'Action' },
]

function Reports() {
    const { data: reports, isLoading, isFetching } = useReportsQuery()

    const [openUserModal, setOpenUserModal] = useState(false)
    const [openGroupModal, setOpenGroupModal] = useState(false)
    const [openPostModal, setOpenPostModal] = useState(false)
    const [chosenUser, setChosenUser] = useState('')
    const [chosenGroup, setChosenGroup] = useState('')
    const [chosenPost, setChosenPost] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(12)

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const currentData = reports ? reports.slice(firstIndex, lastIndex) : []

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

    if (!reports) return
    return (
        <>
            <ContentHeader pageName={'Reports'} title={(isLoading || isFetching) && <BeehubSpinner />} />

            <div className="admin-content">
                <div className="container-fluid">
                    <FullWidthTable
                        title={'Reports'}
                        header={tableHeader}
                        total={reports.length}
                        perPage={perPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    >
                        {currentData.length > 0 &&
                            currentData.map(d =>
                                <tr key={d.id} className="align-middle">
                                    <td>{d.id}</td>
                                    <td>
                                        <a href={d.reporter} onClick={e => handleOpenModal(e, d.reporterId, 'user')}>{d.reporter}</a>
                                    </td>
                                    <td>
                                        {d.caseType}: {' '}
                                        {d.caseType === 'user' &&
                                            <a href={`user/${d.reportedCaseName}`}
                                                onClick={e => handleOpenModal(e, d.reportedCaseId, d.caseType)}
                                            >{d.reportedCaseName}</a>}
                                        {d.caseType === 'group' &&
                                            <a href={`group/${d.reportedCaseName}`}
                                                onClick={e => handleOpenModal(e, d.reportedCaseId, d.caseType)}
                                            >{d.reportedCaseName}</a>}
                                        {d.caseType === 'post' &&
                                            <a href={`post/${d.reportedCaseName}`}
                                                onClick={e => handleOpenModal(e, d.reportedCaseId, d.caseType)}
                                            >Post#{d.reportedCaseName}</a>}
                                    </td>
                                    <td>{<GetReportType type={d.type}/>}</td>
                                    <td>{dateFormat(d.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                    <td>
                                        <GetStatus status={d.status}/>
                                    </td>
                                    <td>
                                        {d.caseType === 'user' &&
                                            <ButtonGroup>
                                                <BanButton size={'sm'} isBanned={d.status === "banned"} userId={d.reportedCaseId} />
                                                <DeleteButton
                                                    caseId={d.reportedCaseId}
                                                    caseType={d.caseType}
                                                    confirmContent={'Are you sure you want to delete this user?'}
                                                    size={'sm'}
                                                />
                                            </ButtonGroup>}
                                        {d.caseType === 'group' &&
                                            <DeleteButton
                                                caseId={d.reportedCaseId}
                                                caseType={d.caseType}
                                                confirmContent={'Are you sure you want to delete this group?'}
                                                size={'sm'}
                                            />}
                                        {d.caseType === 'post' &&
                                            <BlockButton isBlocked={d.status === "blocked"} postId={d.reportedCaseId} size={'sm'} />}
                                    </td>
                                </tr>
                            )
                        }
                    </FullWidthTable>
                </div>
            </div>

            <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} userId={chosenUser} />
            <GroupModal open={openGroupModal} onClose={() => setOpenGroupModal(false)} groupId={chosenGroup} />
            <PostModal open={openPostModal} onClose={() => setOpenPostModal(false)} postId={chosenPost} />
        </>
    );
}

export default Reports;