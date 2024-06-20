import { Button, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";

function ConfirmModal({ open, onClose, onAction, content, confirmText, errorMessage }) {

    return (<BeehubModal open={open} onClose={onClose} centered={true}>
        <Modal.Body>
            {content}
        </Modal.Body>
        <Modal.Footer>
            {errorMessage && <small className="text-danger">{errorMessage}</small>}
            <Button onClick={onAction} variant="danger" disabled={errorMessage ?? false}>{confirmText}</Button>
            <Button onClick={onClose} variant="secondary">Cancel</Button>
        </Modal.Footer>
    </BeehubModal>);
}

export default ConfirmModal;