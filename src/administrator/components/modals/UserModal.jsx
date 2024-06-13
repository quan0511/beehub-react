import { Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminBanUserMutation, useAdminPatchUserRoleMutation, useAdminUserQuery } from "../../adminApiSlice";
import APIService from "../../../features/APIService";
import BeehubSpinner from "../../../components/BeehubSpinner";
import DeleteButton from "../actions/DeleteButton";
import BanButton from "../actions/BanButton";

function UserModal({ open, onClose, userId }) {

    const { data: user, isLoading } = useAdminUserQuery(userId, { skip: userId == '' });
    const [updateRole, { error: updateError, isLoading: isUpdating }] = useAdminPatchUserRoleMutation()
    const [banUser, { isLoading: isBanning }] = useAdminBanUserMutation();

    if (!user) return

    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>User</h3>
                {(isLoading || isBanning || isUpdating) && <span className="ms-auto"><BeehubSpinner /></span>}
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-2 mb-2">
                    <div className="avatar">
                        <Image src={user.avatar ? user.avatar :
                            user.gender == 'female' ?
                                APIService.URL_REST_API + "/files/user_female.png" :
                                APIService.URL_REST_API + "/files/user_male.png"} alt="avatar" thumbnail />
                    </div>
                    <div className="info">
                        <ul>
                            <li>{user.username}</li>
                            <li>{user.noOfFriends} friends</li>
                            <li>{user.noOfPosts} posts</li>
                            <li><small>{user.status}</small></li>
                            <li>
                                <select className="form-select form-select-sm py-0" defaultValue={user.role} onChange={e => updateRole({ id: user.id, role: e.currentTarget.value })}>
                                    <option value="ROLE_ADMIN" >Admin</option>
                                    <option value="ROLE_USER" >User</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
                <h4>Gallery</h4>
                <div className="d-flex flex-wrap gap-1">
                    {user.gallery && user.gallery.map((img, i) =>
                        <Image key={i} src={img} width={'32%'} height={150} style={{ overflow: 'hidden' }} className='rounded-2 shadow-lg' />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <BanButton userId={user.id} isBanned={user.status === 'banned'}/>
                <DeleteButton
                    caseId={user.id}
                    caseType={'user'}
                    confirmContent={'Do you sure delete this user?'}
                />
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default UserModal;