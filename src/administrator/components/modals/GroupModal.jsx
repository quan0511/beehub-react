import { Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminGroupQuery } from "../../adminApiSlice";
import DeleteButton from "../actions/DeleteButton";

function GroupModal({ open, onClose, groupId }) {
    const { data: group, isLoading } = useAdminGroupQuery(groupId, { skip: groupId == '' })

    if (!group) return

    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>Group</h3>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-2 mb-2">
                    <div className="avatar">
                        <Image src={group.image_group || "http://localhost:8080/api/files/group_image.png"} alt="avatar" thumbnail />
                    </div>
                    <div className="info">
                        <ul>
                            <li>{group.groupname}</li>
                            <li>{group.public_group ? "Public" : "Private"}</li>
                            <li>{group.group_members.length} members</li>
                            <li>{group.post_count} posts</li>
                            <li><small>{group.active ? 'active' : 'banned'}</small></li>
                        </ul>
                    </div>
                </div>
                <h4>Gallery</h4>
                <div className="d-flex flex-wrap gap-1">
                    {group.group_medias?.map((img, i) =>
                        <Image key={i} src={img} width={'30%'} height={150} className='rounded-2 shadow-lg' />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <DeleteButton
                    caseId={group.id}
                    caseType={"group"}
                    confirmContent={'Do you sure delete this group?'}
                />
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default GroupModal;