import ReactDOM from 'react-dom'

import { Button, Modal } from "react-bootstrap";

function BeehubModal({open, children, onClose, centered}) {
    if (!open) return null

    return ReactDOM.createPortal( 
        <>
            <Modal centered={centered} show={open} onHide={onClose}>
                {children}
            </Modal>
        </>
    , document.getElementById('beehubModal'));
}

export default BeehubModal;