import dateFormat from "dateformat";
import { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { Badge, Button } from "react-bootstrap";
import { useAdminPostsQuery } from "../adminApiSlice";

import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import PostModal from "../components/modals/PostModal";
import UserModal from "../components/modals/UserModal";
import BlockButton from "../components/actions/BlockButton";
import GetMultipleReportType from "../../utils/GetMultipleReportType";
import GetStatus from "../../utils/GetStatus";

const header = [
    { content: 'Id' },
    { content: 'Creator' },
    { content: 'Timestamp' },
    { content: 'Reports' },
    { content: 'Status' },
    { content: 'Action' },
]

function Posts() {
    const { data: posts, isLoading } = useAdminPostsQuery()
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [chosenPost, setChosenPost] = useState('')
    const [chosenUser, setChosenUser] = useState('')
    const [openPostModal, setOpenPostModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)

    const handleOpenModal = (e, chosenId, caseType) => {
        e.preventDefault()
        switch (caseType) {
            case "user":
                setChosenUser(chosenId)
                setOpenUserModal(true)
                break
            case "post":
                setChosenPost(chosenId)
                setOpenPostModal(true)
                break
            default:
                break
        }
    }

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const currentData = posts ? posts.slice(firstIndex, lastIndex) : []

    if (!posts) return
    return <>
        <ContentHeader pageName={'Posts'} />

        <div className="admin-content">
            <div className="container-fluid">

                <FullWidthTable title={'Posts'} header={header} total={posts.length} perPage={perPage} setCurrentPage={setCurrentPage} currentPage={currentPage}>
                    {currentData.length > 0 && currentData.map((p, i) =>
                        <tr key={i}>
                            <td>{p.id}</td>
                            <td>
                                <a href={`user/${p.creatorId}`} onClick={e => handleOpenModal(e, p.creatorId, 'user')}>{p.creator}</a>
                            </td>
                            <td>{dateFormat(p.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                            <td><GetMultipleReportType reports={p.reportTitleList}/></td>
                            <td><GetStatus status={p.isBlocked ? 'blocked' : 'active'}/></td>
                            <td>
                                <Button className="me-1" size="sm" onClick={(e) => handleOpenModal(e, p.id, 'post')}><Eye /> Content</Button>
                                <BlockButton postId={p.id} isBlocked={p.isBlocked} size={'sm'} />
                            </td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
        <PostModal open={openPostModal} onClose={() => setOpenPostModal(false)} postId={chosenPost} />
        <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} userId={chosenUser} />
    </>
}

export default Posts;