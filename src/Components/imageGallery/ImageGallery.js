import React from 'react';
import PropTypes from 'prop-types';
import { getImagesWithAxios } from '../../services/getimageswithaxios.js';
import ImageGalleryItem from './ImageGalleryItem';
import { Watch } from 'react-loader-spinner';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import s from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    dataImages: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const config = {
      url: 'https://pixabay.com/api/',
      params: {
        key: '24632076-61665c6939d01412ec2d82576',
        q: this.props.searchName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '12',
        page: this.props.page,
      },
    };

    const prevSearchName = prevProps.searchName;
    const nextSearchName = this.props.searchName;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevSearchName !== nextSearchName || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      getImagesWithAxios(config).then(dataImages => {
        if (!dataImages) {
          this.setState({ status: 'idle' });
          return;
        }

        this.setState({ dataImages, status: 'resolved' });
      });
    }
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalImage = id => {
    this.setState(prevState => ({
      largeImageURL: prevState.dataImages.find(dataImage => dataImage.id === id).largeImageURL,
      alt: prevState.dataImages.find(dataImage => dataImage.id === id).tags,
    }));

    this.togleModal();
  };

  render() {
    const { dataImages, status, showModal, largeImageURL, alt } = this.state;
    const { onButtonLoadMoreClick } = this.props;

    if (status === 'idle') {
      return <ul className={s.ImageGallery}></ul>;
    }

    if (status === 'pending') {
      return (
        <div className={s.Loader}>
          <Watch color="#00BFFF" height={80} width={80} />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && <Modal onClose={this.togleModal} largeImageURL={largeImageURL} alt={alt} />}
          <ul className={s.ImageGallery}>
            {dataImages.map(dataImage => {
              const { id, webformatURL, tags } = dataImage;
              return (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  alt={tags}
                  id={id}
                  onClick={this.handleModalImage}
                />
              );
            })}
          </ul>
          <div className={s.Btn}>
            <Button onButtonLoadMoreClick={onButtonLoadMoreClick} />
          </div>
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  onButtonLoadMoreClick: PropTypes.func.isRequired,
  searchName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
