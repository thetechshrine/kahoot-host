import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { type, className, variant, onClick } = props;

  return (
    <button
      type={type}
      className={`${className} button ${variant}`}
      onClick={onClick}
    >
      <span>{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['one', 'two', 'three', 'four']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  variant: '',
  onClick: () => {},
};

export default Button;
