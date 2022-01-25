import React from 'react';
import s from './App.module.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';

class App extends React.Component {
  state = {
    searchName: '',
    page: 1,
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName: searchName, page: 1 });
  };

  onButtonLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchName, page } = this.state;
    const { handleFormSubmit, onButtonLoadMoreClick } = this;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          searchName={searchName}
          page={page}
          onButtonLoadMoreClick={onButtonLoadMoreClick}
        />
      </div>
    );
  }
}
export default App;
