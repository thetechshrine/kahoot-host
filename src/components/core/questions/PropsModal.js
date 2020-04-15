import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../helpers/Modal';
import Button from '../../helpers/Button';

const PropsModal = ({ show, onHide, title, choices, onDone }) => {
  const [selectedChoice, setSelectionChoice] = useState('');

  const onClick = () => {
    const clone = { ...selectedChoice };
    onDone({ choice: clone });
    onHide();
    setSelectionChoice('');
  };

  return (
    <Modal show={show} onHide={onHide} size="small">
      <div className="props-modal-body">
        <header>
          <h5 className="title">{title}</h5>
        </header>
        <main>
          <ul className="choices">
            {choices.map((choice) => (
              <li
                key={choice.key}
                className={choice.key === selectedChoice.key ? 'active' : ''}
                onClick={() => setSelectionChoice(choice)}
              >
                {choice.value}
              </li>
            ))}
          </ul>

          <div className="actions">
            <Button onClick={onHide}>Cancel</Button>
            <Button variant="four" onClick={onClick}>
              Done
            </Button>
          </div>
        </main>
      </div>
    </Modal>
  );
};

PropsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onDone: PropTypes.func.isRequired,
};

export default PropsModal;
