import React from 'react';
// import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ onButtonLoadMoreClick }) => (
  <button type="button" className={s.Button} onClick={onButtonLoadMoreClick}>
    Load more
  </button>
);

// Button.propTypes = {
//   onDeleteContact: PropTypes.func.isRequired,
//   visibleContacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }),
//   ),
// };

export default Button;
