import { Button } from "react-bootstrap";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";
import { useAdminDeleteGroupMutation, useAdminDeleteUserMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function DeleteButton({ caseId, caseType, size, confirmContent }) {
    const [open, setOpen] = useState(false);
    const [deleteUser, { error: userErr, isLoading: userLoading }] = useAdminDeleteUserMutation()
    const [deleteGroup, { error: groupErr, isLoading: groupLoading }] = useAdminDeleteGroupMutation()

    const handleAction = async () => {
        try {
            if (caseType === 'user') {
                await deleteUser(caseId)
            } else {
                await deleteGroup(caseId)
            }
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {/* {userErr && <small className="text-danger">{userErr.data.message}</small>}
            {groupErr && <small className="text-danger">{groupErr.data.message}</small>} */}
            <Button variant="danger" size={size} onClick={_ => setOpen(true)}>
                {(userLoading || groupLoading) ? <BeehubSpinner /> : 'Delete'}
            </Button>
            <ConfirmModal
                open={open}
                onClose={() => setOpen(false)}
                onAction={handleAction}
                content={confirmContent}
                confirmText={'Do it anyway'}
                errorMessage={userErr}
            />
        </>
    );
}

export default DeleteButton;