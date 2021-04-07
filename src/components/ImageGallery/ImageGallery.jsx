import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id}>
          <ImageGalleryItem webformatURL={webformatURL} largeImageURL={largeImageURL} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};
