import { Modal } from "react-bootstrap";
function AddLinkModal({ showModal, closeModal }) {
  return (
    <Modal id="add_mylinks" show={showModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Enter Your Details</Modal.Title>
        <button type="button" class="btn-close" onClick={closeModal}></button>
      </Modal.Header>
      <Modal.Body>
        <div class="popup-formdiv">
          <form>
            <div class="form-group mb-3">
              <label>Title</label>
              <input type="text" class="form-control" placeholder="Facebook" />
            </div>
            <div class="form-group mb-3">
              <input type="text" class="form-control" placeholder="Link" />
            </div>
            <div class="form-group">
              <button type="button" class="defaultbtn" data-bs-dismiss="modal">
                Choose an icon
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddLinkModal;
