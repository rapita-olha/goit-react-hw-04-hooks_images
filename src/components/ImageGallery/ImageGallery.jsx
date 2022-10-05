import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchImages from 'services/pixabay-api';


import ImageGalleryList from './ImageGalleryList/ImageGalleryList';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ searchImageName }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  const loadImages = (searchImgName, page) => {
    setLoading(true);
    setLastPage(page);

    setTimeout(() => {
      fetchImages(searchImgName, page)
        .then(({ hits, total }) => {
          if (!total) {
            const newError = new Error(
              `There is no picture with ${searchImgName} name, please enter another request`,
            );

            setError(newError);
            setStatus(Status.REJECTED);
          } else {
            setImages(imgs => [...(imgs || []), ...hits]);
            setStatus(Status.RESOLVED);
          }

          if (page !== 1) {
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
            }, 0);
          }
        })
        .catch(newError => {
          setError(newError);
          setStatus(Status.REJECTED);
        });

      setLoading(false);
    }, 500);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onModalOpen = activeModalImg => {
    setActiveModalImg(activeModalImg);
    toggleModal();
  };

  const onBtnClick = () => {
    setLoading(true);
    loadImages(searchImageName, lastPage + 1);
  };

  useEffect(() => {
    if (!searchImageName) {
      return;
    }

    setImages([]);
    setLoading(false);
    loadImages(searchImageName, 1);
  }, [searchImageName]);

  if (status === Status.IDLE) {
    return <div className="errorMessage">Please enter your request</div>;
  }


  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGalleryList images={images} onModalOpen={onModalOpen} />

        {loading && <Loader />}
        <Button onBtnClick={onBtnClick} />

        {showModal && (
          <Modal onModalClose={toggleModal} activeModalImg={activeModalImg} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImageName: PropTypes.string.isRequired,
};
