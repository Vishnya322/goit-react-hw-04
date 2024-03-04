import Modal from 'react-modal';

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div>
        {image && <img src={image.urls.regular} alt={image.alt_description} />}
      </div>
    </Modal>
  );
};

export default ImageModal;
