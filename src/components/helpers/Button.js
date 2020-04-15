import React from 'react';
import PropTypes from 'prop-types';

import { v1 as uuid } from 'uuid';

const Button = (props) => {
  const { id, type, className, variant, disabled, onClick } = props;
  const buttonId = id || uuid();

  const onChildClick = (evt) => {
    const { id } = evt.target;
    if (id !== buttonId) {
      evt.stopPropagation();
      const e = { ...evt };
      Object.assign(e, {
        target: document.getElementById(buttonId),
      });
      onClick(e);
    }
  };

  return (
    <button
      id={buttonId}
      type={type}
      className={`${className} button ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span onClick={onChildClick}>{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['one', 'two', 'three', 'four', 'six', '']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  id: '',
  type: 'button',
  className: '',
  variant: '',
  disabled: false,
  onClick: () => {},
};

export default Button;
