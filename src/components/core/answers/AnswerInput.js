import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnswerInput = ({ name, type, placeHolder, answer, onChange }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!!answer.title);
  }, [answer.title]);

  const onKeyUp = (evt) => {
    const { value } = evt.target;
    setActive(value && value.length > 0);
  };

  const onLocalChange = (evt) => {
    const { type, name, value, checked } = evt.target;
    if (type === 'checkbox') onChange({ name, value: checked });
    else onChange({ name, value });
  };

  return (
    <div className={`answer-input ${type} ${active ? 'active' : 'inactive'}`}>
      <div
        className={`answer-input-inner-container ${
          active ? 'active' : 'inactive'
        }`}
      >
        <div className="shape-container">
          <div className="shape" />
        </div>
        <input
          name={`${name}-title`}
          type="text"
          className={`input ${active ? 'active' : 'inactive'}`}
          placeholder={placeHolder}
          onKeyUp={onKeyUp}
          onChange={onLocalChange}
          value={answer.title || ''}
        />
        <div className={`checkbox-container ${active ? 'active' : 'inactive'}`}>
          <input
            name={`${name}-isCorrect`}
            type="checkbox"
            className="checkbox"
            onChange={onLocalChange}
            checked={answer.isCorrect === true}
          />
          <div>
            <i className="fas fa-check"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

AnswerInput.propTypes = {
  type: PropTypes.oneOf(['one', 'two', 'three', 'four', '']),
  placeHolder: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    title: PropTypes.string,
    isCorrect: PropTypes.bool,
  }),
};

AnswerInput.defaultProps = {
  type: 'one',
  placeHolder: 'Add answer 1',
  answer: {
    title: null,
    isCorrect: false,
  },
};

export default AnswerInput;
