import { Button, Image, Modal } from "react-bootstrap";
import BeehubModal from "../../../components/BeehubModal";

function PostModal({ open, onClose, post }) {
    return (
        <BeehubModal open={open} onClose={onClose}>
            <Modal.Header>
                <h3>Post</h3>
            </Modal.Header>
            <Modal.Body>
                <p>Optimus Dance</p>
                <div>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/nF_GeASSvIQ?si=3N0GPkw6u4SP_uoG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </BeehubModal>
    );
}

export default PostModal;