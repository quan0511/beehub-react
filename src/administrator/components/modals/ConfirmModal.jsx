import { Button, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";

function ConfirmModal({ open, onClose, onAction, content, confirmText }) {

    return (<BeehubModal open={open} onClose={onClose} centered={true}>
        <Modal.Body>
            {content}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onAction} variant="danger">{confirmText}</Button>
            <Button onClick={onClose} variant="secondary">Cancel</Button>
        </Modal.Footer>
    </BeehubModal>);
}

export default ConfirmModal;