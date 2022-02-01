import React from 'react';
import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ onButtonLoadMoreClick }) => (
  <button type="button" className={s.Button} onClick={onButtonLoadMoreClick}>
    Load more
  </button>
);

Button.propTypes = {
  onButtonLoadMoreClick: PropTypes.func.isRequired,
};

export default Button;
