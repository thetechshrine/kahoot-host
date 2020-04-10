import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const { type, className } = props;

  return <div className={`badge ${type} ${className}`}>{props.children}</div>;
};

Badge.propTypes = {
  type: PropTypes.oneOf(['one', 'two', '']),
  className: PropTypes.string,
};

Badge.defaultProps = {
  type: 'one',
  className: '',
};

export default Badge;
