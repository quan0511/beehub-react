import { Button } from "react-bootstrap";
import { useAdminPostsQuery } from "../adminApiSlice";
import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";
import dateFormat from "dateformat";

const header = [
    {content: 'Id'},
    {content: 'Creator'},
    {content: 'Timestamp'},
    {content: 'Status'},
    {content: 'Action'},
]

function Posts() {
    const {data: posts} = useAdminPostsQuery()

    if (!posts) return
    return <>
        <ContentHeader pageName={'Posts'} />

        <div className="admin-content">
            <div className="container-fluid">
                
                <FullWidthTable title={'Posts'} header={header}>
                    {posts.length > 0 && posts.map((p, i) => 
                        <tr key={i}>
                            <td>{p.id}</td>
                            <td>{p.creator}</td>
                            <td>{dateFormat(p.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                            <td>{p.status}</td>
                            <td>
                                <Button variant="secondary" size="sm">block</Button>
                            </td>
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
    </>
}

export default Posts;