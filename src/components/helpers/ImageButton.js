import React from 'react';
import PropTypes from 'prop-types';

const ImageButton = (props) => {
  const { type, onClick } = props;

  return (
    <button className={`image-button ${type}`} onClick={onClick}>
      {props.children}
    </button>
  );
};

ImageButton.propTypes = {
  type: PropTypes.oneOf(['one', '']),
  onClick: PropTypes.func,
};

ImageButton.defaultProps = {
  type: '',
  onClick: () => {},
};

export default ImageButton;
