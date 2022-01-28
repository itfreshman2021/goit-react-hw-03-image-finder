import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';

import s from './ImageGallery.module.css';

const ImageGallery = ({ dataImages, onClick }) => (
  <ul className={s.ImageGallery} id="ul1">
    {dataImages.map(dataImage => {
      const { id, webformatURL, tags } = dataImage;
      return <ImageGalleryItem key={id} src={webformatURL} alt={tags} id={id} onClick={onClick} />;
    })}
  </ul>
);

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGallery;
