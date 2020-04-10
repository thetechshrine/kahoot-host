import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { type, className, variant, disabled, onClick } = props;

  return (
    <button
      type={type}
      className={`${className} button ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['one', 'two', 'three', 'four', '']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  variant: '',
  disabled: false,
  onClick: () => {},
};

export default Button;
