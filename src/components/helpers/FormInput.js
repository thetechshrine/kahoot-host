import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { v1 as uuid } from 'uuid';

const FormInput = (props) => {
  const { type, name, label, required, maxLength, className, onChange } = props;
  const id = uuid();

  const [length, setLength] = useState(0);
  useEffect(() => {
    setLength(maxLength);
  }, [maxLength]);

  const onKeyDown = (evt) => {
    if (maxLength > 0) {
      if (length === 0) {
        const { keyCode } = evt;
        if (keyCode !== 8 && keyCode !== 46) {
          evt.preventDefault();
        }
      }
    }
  };

  const onKeyUp = (evt) => {
    if (maxLength > 0) {
      const { value } = evt.target;
      setLength(maxLength - (value !== null ? value.length : 0));
    }
  };

  const onInputChange = (evt) => {
    const { value } = evt.target;
    if (type === 'number') return onChange({ value: Number(value) });

    return onChange({ value });
  };

  return (
    <div className="form-input">
      <label htmlFor={id} className="label">
        {label}
        {!required && <span>(optional)</span>}
      </label>
      <div className="input-container">
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          className={`input ${className}`}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        {maxLength > 0 && <span className="counter">{length}</span>}
      </div>
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.oneOf(['number', 'text', 'password']),
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

FormInput.defaultProps = {
  type: 'text',
  name: '',
  required: false,
  maxLength: 0,
  className: '',
  onChange: () => {},
};

export default FormInput;
