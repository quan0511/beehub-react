import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import { useState } from 'react';
import UserModal from '../components/UserModal';
import GroupModal from '../components/GroupModal';
import PostModal from '../components/PostModal';
import { useReportsQuery } from "../adminApiSlice";

const samepleHeader = [
    { style: { width: 10 }, content: '' },
    { content: 'From' },
    { content: 'To' },
    { content: 'Type' },
    { content: 'Timestamp' },
    { style: { width: 40 }, content: 'Status' },
]
const sampleData = [
    {
        id: 1,
        from: {
            username: 'Bumblebee',
            avatar: 'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: true,
            gallery: [
                'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.VIHMP3vrUeXRhNq6yaR9sAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.Eiw8hrGkSx-wxgXOHedEbgHaEp?w=307&h=192&c=7&r=0&o=5&pid=1.7'
            ]
        },
        to: {
            username: 'Optimus',
            avatar: 'https://th.bing.com/th/id/OIP.UhzoNGGIvKYW8YahcshtwAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: false,
            gallery: [
                'https://th.bing.com/th/id/OIP.FGuDQu58aABECzJerNm30wHaEQ?w=326&h=187&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.kPzrHJuZuOnHmgNDs90xOAHaD5?w=324&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.YXGRuNl-quzuxAwT7EEVAAHaEJ?w=319&h=180&c=7&r=0&o=5&pid=1.7'
            ],
            isUser: true
        },
        type: 'Bad Content',
        time: '01/06/24',
        status: 'active'
    },
    {
        id: 2,
        from: {
            username: 'Bumblebee',
            avatar: 'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: true,
            gallery: [
                'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.VIHMP3vrUeXRhNq6yaR9sAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.Eiw8hrGkSx-wxgXOHedEbgHaEp?w=307&h=192&c=7&r=0&o=5&pid=1.7'
            ]
        },
        to: {
            groupName: 'OptimusGang',
            avatar: 'https://th.bing.com/th/id/OIP.UhzoNGGIvKYW8YahcshtwAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: false,
            gallery: [
                'https://th.bing.com/th/id/OIP.FGuDQu58aABECzJerNm30wHaEQ?w=326&h=187&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.kPzrHJuZuOnHmgNDs90xOAHaD5?w=324&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.YXGRuNl-quzuxAwT7EEVAAHaEJ?w=319&h=180&c=7&r=0&o=5&pid=1.7'
            ],
            isGroup: true
        },
        type: 'Bad Content',
        time: '01/06/24',
        status: 'banned',
    },
    {
        id: 3,
        from: {
            username: 'Bumblebee',
            avatar: 'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: true,
            gallery: [
                'https://th.bing.com/th/id/OIP.EmRwBDZe4rBVjntQ1uzpVwHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.VIHMP3vrUeXRhNq6yaR9sAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.Eiw8hrGkSx-wxgXOHedEbgHaEp?w=307&h=192&c=7&r=0&o=5&pid=1.7'
            ]
        },
        to: {
            postName: 'OptimusPost',
            avatar: 'https://th.bing.com/th/id/OIP.UhzoNGGIvKYW8YahcshtwAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
            friends: 1,
            posts: 1,
            active: false,
            gallery: [
                'https://th.bing.com/th/id/OIP.FGuDQu58aABECzJerNm30wHaEQ?w=326&h=187&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.kPzrHJuZuOnHmgNDs90xOAHaD5?w=324&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.YXGRuNl-quzuxAwT7EEVAAHaEJ?w=319&h=180&c=7&r=0&o=5&pid=1.7'
            ],
            isPost: true
        },
        type: 'Bad Content',
        time: '01/06/24',
        status: 'blocked'
    },
]

function Reports() {
    const {data:reports, isLoading,isFetching} = useReportsQuery()

    const [openUserModal, setOpenUserModal] = useState(false)
    const [openGroupModal, setOpenGroupModal] = useState(false)
    const [openPostModal, setOpenPostModal] = useState(false)
    const [chosenUser, setChosenUser] = useState()
    const [chosenGroup, setChosenGroup] = useState()
    const [chosenPost, setChosenPost] = useState()

    const handleOpenUserModal = (e, username) => {
        e.preventDefault()
        setChosenUser(username)
        setOpenUserModal(true)
    }
    const handleOpenGroupModal = (e, groupName) => {
        e.preventDefault()
        setChosenGroup(groupName)
        setOpenGroupModal(true)
    }
    const handleOpenPostModal = (e, postId) => {
        e.preventDefault()
        setChosenPost(postId)
        setOpenPostModal(true)
    }
    if (!reports) return
    return (
        <>
            <ContentHeader pageName={'Reports'} />

            <div className="admin-content">
                <div className="container-fluid">
                    <FullWidthTable title={'Reports'} header={samepleHeader}>
                        {reports.length > 0 &&
                            reports.map((d, i) =>
                                <tr key={i} className="align-middle">
                                    <td>{++i}.</td>
                                    <td>
                                        <a href={d.from} onClick={e => handleOpenUserModal(e, d.from)}>{d.from}</a>
                                    </td>
                                    <td>
                                        {d.user && <a href={d.to} onClick={e => handleOpenUserModal(e, d.to)}>{d.to}</a>}
                                        {d.group && <a href={d.to} onClick={e => handleOpenGroupModal(e, d.to)}>{d.to}</a>}
                                        {d.post && <a href={`post/${d.to}`} onClick={e => handleOpenPostModal(e, d.to)}>PostId_{d.to}</a>}
                                    </td>
                                    <td>{d.type}</td>
                                    <td>{d.timeStamp}</td>
                                    <td>
                                        {d.status==='active' && <span className="badge text-bg-success">Active</span>}
                                        {d.status==='inactive' && <span className="badge text-bg-danger">Banned</span>}
                                        {d.status==='blocked' && <span className="badge text-bg-secondary">Blocked</span>}
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