import { Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminGroupQuery } from "../../adminApiSlice";
import DeleteButton from "../actions/DeleteButton";
import GetStatus from "../../../utils/GetStatus";
import GetMultipleReportType from "../../../utils/GetMultipleReportType";
import { getAvatar } from "../../../utils/utils";

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
                        <Image src={getAvatar(group.avatar)} alt="avatar" thumbnail />
                    </div>
                    <div className="info">
                        <ul>
                            <li>Group name: {group.name}</li>
                            <li>Creator: {group.creatorUsername}</li>
                            <li>Visibility: {group.public_group ? "Public" : "Private"}</li>
                            <li>Members: {group.noOfMembers} members</li>
                            <li>Posts: {group.noOfPosts}</li>
                            <li>Status: <GetStatus status={group.active ? 'active' : 'banned'}/></li>
                            <li>Reports: <GetMultipleReportType reports={group.reportTitleList}/></li>
                        </ul>
                    </div>
                </div>
                <h4>Gallery</h4>
                <div className="d-flex flex-wrap gap-1">
                    {group.gallery?.map((img, i) =>
                        <Image key={i} src={img} width={'30%'} height={150} className='rounded-2 shadow-lg' />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <DeleteButton
                    caseId={group.id}
                    caseType={"group"}
                    confirmContent={'Are you sure you want to delete this group?'}
                />
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default GroupModal;