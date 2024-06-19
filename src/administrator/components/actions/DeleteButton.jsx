import { Button } from "react-bootstrap";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";
import { useAdminDeleteGroupMutation, useAdminDeleteUserMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function DeleteButton({ caseId, caseType, size, confirmContent }) {
    const [open, setOpen] = useState(false);
    const [deleteUser, { error: userErr, isLoading: userLoading, isSuccess: deleteUserSuccess }] = useAdminDeleteUserMutation()
    const [deleteGroup, { error: groupErr, isLoading: groupLoading, isSuccess: deleteGroupSuccess }] = useAdminDeleteGroupMutation()
    const [errMsg, setErrMsg] = useState('')
    const handleAction = async () => {
        try {
            if (caseType === 'user') {
                await deleteUser(caseId).unwrap()
            } else {
                await deleteGroup(caseId).unwrap()
            }
            setOpen(false)
        } catch (e) {
            setErrMsg(e.data.message)
        }
    }
    return (
        <>
            <Button variant="danger" size={size} onClick={_ => setOpen(true)}>
                Delete
            </Button>
            <ConfirmModal
                open={open}
                onClose={() => setOpen(false)}
                onAction={handleAction}
                content={confirmContent}
                confirmText={'Do it anyway'}
                errorMessage={errMsg}
            />
        </>
    );
}

export default DeleteButton;