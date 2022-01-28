import React from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    searchName: '',
  };

  handleSearchNameChange = event => {
    this.setState({ searchName: event.currentTarget.value });
  };

  HandleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.HandleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonlabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleSearchNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
