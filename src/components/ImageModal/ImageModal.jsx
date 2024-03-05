import ReactModal from 'react-modal';
import './ImageModal.modal.css';

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        {image && <img src={image.urls.regular} alt={image.alt_description} />}
      </div>
    </ReactModal>
  );
};

export default ImageModal;
