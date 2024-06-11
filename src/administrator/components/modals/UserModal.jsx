import { Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminUserQuery } from "../../adminApiSlice";

function UserModal({ open, onClose, username }) {
    if (!username) return

    const { data: user, isLoading } = useAdminUserQuery(username);

    if (!user) return

    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>User</h3>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-2 mb-2">
                    <div className="avatar">
                        <Image src={user.avatar} alt="avatar" thumbnail />
                    </div>
                    <div className="info">
                        <ul>
                            <li>{user.username}</li>
                            <li>{user.noOfFriends} friends</li>
                            <li>{user.noOfPosts} posts</li>
                            <li><small>{user.status}</small></li>
                        </ul>
                    </div>
                </div>
                <h4>Gallery</h4>
                <div className="d-flex flex-wrap gap-1">
                    {user.gallery.map((img, i) =>
                        <Image key={i} src={img} width={'32%'} height={150} style={{ overflow: 'hidden' }} className='rounded-2 shadow-lg' />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default UserModal;