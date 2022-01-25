import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, id, onClick }) => (
  <li className={s.ImageGalleryItem} id={id} onClick={() => onClick(id)}>
    <img className={s.ImageGalleryItemImage} src={src} alt={alt} />
  </li>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
