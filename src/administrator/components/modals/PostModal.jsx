import { Badge, Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminPostQuery } from "../../adminApiSlice";
import dateFormat from "dateformat";
import BlockButton from "../actions/BlockButton";
import { getAvatar } from "../../../utils/utils";

function PostModal({ open, onClose, postId }) {
    const { data: post, isLoading } = useAdminPostQuery(postId, { skip: postId == "" })

    if (!post) return

    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>Post</h3>
            </Modal.Header>
            <Modal.Body>
                {post.creatorImage &&
                    <Image className="me-2 float-start" src={getAvatar(post.creatorImage)} alt="creator" roundedCircle width={40} />
                }
                <Badge className="float-end" bg={post.isBlocked ? "danger" : "success"}>{post.isBlocked ? "blocked" : "active"}</Badge>
                <span className="fw-bold">{post.creatorUsername}</span>
                <span className="d-block" >{dateFormat(post.timestamp, "h:MM:ss TT, dd/mm/yy")}</span>
                <p>{post.content}</p>
                {post.image &&
                    <Image className="w-100" src={post.image} alt="post image" />
                }
            </Modal.Body>
            <Modal.Footer>
                <BlockButton isBlocked={post.isBlocked} postId={post.id} />
                <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default PostModal;