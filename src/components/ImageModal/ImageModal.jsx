import ReactModal from 'react-modal';
import './ImageModal.modal.css';

const ImageModal = ({ isOpen, image, onClose }) => {
  const imageUrl =
    image && image.urls && image.urls.regular ? image.urls.regular : '';
  const altDescription =
    image && image.alt_description
      ? image.alt_description
      : 'Image Description';

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        {imageUrl && <img src={imageUrl} alt={altDescription} />}
      </div>
    </ReactModal>
  );
};

export default ImageModal;
