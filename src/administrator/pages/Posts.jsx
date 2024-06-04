import { useAdminPostsQuery } from "../adminApiSlice";
import ContentHeader from "../components/ContentHeader";
import FullWidthTable from "../components/FullWidthTable";

const header = [
    {content: 'Id'},
    {content: 'Creator'},
    {content: 'Reactions'},
    {content: 'Reports'},
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
                        </tr>
                    )}
                </FullWidthTable>
            </div>
        </div>
    </>
}

export default Posts;