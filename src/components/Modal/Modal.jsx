import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({
  onModalClose,
  activeModalImg: { largeImageURL, tags },
}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // очистить
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      onModalClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} className="modalImg" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  activeModalImg: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
