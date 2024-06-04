import ReactDOM from 'react-dom'
import { Button, Modal } from "react-bootstrap";

function BeehubModal({open, children, onClose}) {
    if (!open) return null

    return ReactDOM.createPortal( 
        <>
            <Modal show={open} onHide={onClose}>
                {children}
            </Modal>
        </>
    , document.getElementById('beehubModal'));
}

export default BeehubModal;