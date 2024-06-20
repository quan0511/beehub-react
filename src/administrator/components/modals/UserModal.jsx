import { Button, Image, Modal } from "react-bootstrap";
import dateFormat from "dateformat";
import BeehubModal from "../../../components/BeehubModal";
import { useAdminUserQuery } from "../../adminApiSlice";
import APIService from "../../../features/APIService";
import BeehubSpinner from "../../../components/BeehubSpinner";
import DeleteButton from "../actions/DeleteButton";
import BanButton from "../actions/BanButton";
import UpdateRole from "../actions/UpdateRole";
import GetStatus from "../../../utils/GetStatus";
import GetGender from "../../../utils/GetGender";
import GetMultipleReportType from "../../../utils/GetMultipleReportType";

function UserModal({ open, onClose, userId }) {

    const { data: user, isLoading } = useAdminUserQuery(userId, { skip: userId == '' });

    if (!user) return

    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>User</h3>
                {(isLoading) && <span className="ms-auto"><BeehubSpinner /></span>}
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
                            <li>Username: {user.username}</li>
                            <li>Email: {user.email}</li>
                            <li>Full name: {user.fullName}</li>
                            <li>Gender: <GetGender gender={user.gender}/> {user.gender}</li>
                            <li>Friends: {user.noOfFriends}</li>
                            <li>Posts: {user.noOfPosts}</li>
                            <li>Status: <GetStatus status={user.status}/></li>
                            <li>Role: <UpdateRole id={user.id} role={user.role} /></li>
                            <li>Report: <GetMultipleReportType reports={user.reportTitleList}/></li>
                            <li>Member since: {dateFormat(user?.createdAt, "dd/mm/yyyy")}</li>
                        </ul>
                    </div>
                </div>
                <h4>Gallery</h4>
                <hr/>
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