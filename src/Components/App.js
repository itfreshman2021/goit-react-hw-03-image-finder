import React from 'react';
import s from './App.module.css';
import { getImagesWithAxios } from '../services/getimageswithaxios';
import Searchbar from './searchbar/Searchbar';
import { Watch } from 'react-loader-spinner';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Modal from './modal/Modal';

class App extends React.Component {
  state = {
    searchName: '',
    page: 1,
    dataImages: [],
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const config = {
      url: 'https://pixabay.com/api/',
      params: {
        key: '24632076-61665c6939d01412ec2d82576',
        q: this.state.searchName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '12',
        page: this.state.page,
      },
    };

    const prevSearchName = prevState.searchName;
    const nextSearchName = this.state.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchName !== nextSearchName || prevPage !== nextPage) {
      getImagesWithAxios(config).then(dataImages => {
        if (!dataImages) {
          this.setState({ isLoading: false });
          return;
        }
        this.setState(prevState => ({
          dataImages: [...prevState.dataImages, ...dataImages],
          isLoading: false,
        }));
        if (nextPage > prevPage && prevSearchName === nextSearchName) {
          const { height: cardHeight } = document
            .querySelector('#ul1')
            .lastElementChild.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      });
    }
  }

  handleFormSubmit = searchName => {
    this.setState({
      searchName: searchName,
      page: 1,
      dataImages: [],
      showModal: false,
      isLoading: true,
    });
  };

  onButtonLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };
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
    const { dataImages, isLoading, showModal, largeImageURL, alt } = this.state;
    const { handleFormSubmit, onButtonLoadMoreClick, togleModal, handleModalImage } = this;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {isLoading && (
          <div className={s.Loader}>
            <Watch color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {showModal && <Modal onClose={togleModal} largeImageURL={largeImageURL} alt={alt} />}
        {dataImages.length > 0 && (
          <>
            <ImageGallery onClick={handleModalImage} dataImages={dataImages} />
            {!isLoading && (
              <div className={s.Btn}>
                <Button onButtonLoadMoreClick={onButtonLoadMoreClick} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
export default App;
