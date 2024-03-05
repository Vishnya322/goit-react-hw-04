import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import ImageModal from './ImageModal/ImageModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const accessKey = 'i3pHdLQy2TjLJVZoPeWgDjlGIKbeJ4MRJWtoiz2Y8Z8';

  useEffect(() => {
    const apiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=12&orientation=landscape&client_id=${accessKey}`;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setImages(prevImages =>
          page === 1
            ? response.data.results
            : [...prevImages, ...response.data.results]
        );
      } catch (error) {
        setError('Error fetching images. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchImages();
    }
  }, [searchTerm, page, accessKey]);

  const handleSearch = value => {
    if (!value.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setSearchTerm(value);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    if (!modalIsOpen) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {images.length > 0 && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          image={selectedImage}
          onClose={closeModal}
          style={customStyles}
        />
      )}
      <Toaster />
    </div>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
