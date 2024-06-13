import { Button } from "react-bootstrap";
import { useAdminBlockPostMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function BlockButton({ postId, isBlocked, size }) {
    const [blockPost, { error, isError, isLoading }] = useAdminBlockPostMutation()
    const handleBlock = async (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        await blockPost(postId)
    }
    return (<>
        {/* {isError && <small className="text-danger">{error.data.message}</small>} */}
        <Button onClick={e => handleBlock(e, postId)} variant="secondary" size={size}>
            {isLoading ? <BeehubSpinner/> : isBlocked ? "Unblock" : "Block"}
        </Button>
    </>);
}

export default BlockButton;