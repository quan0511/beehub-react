import { Button } from "react-bootstrap";
import { useAdminBlockPostMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function BlockButton({ postId, isBlocked, size }) {
    const [blockPost, { error, isError, isLoading }] = useAdminBlockPostMutation()
    return (<>
        {isError && <small className="text-danger">{error.data.message}</small>}
        <Button onClick={blockPost(postId)} variant="secondary" size={size}>
            {isLoading ? <BeehubSpinner/> : isBlocked ? "Unblock" : "Block"}
        </Button>
    </>);
}

export default BlockButton;