import React from 'react';
import PropTypes from 'prop-types';

import ActionModal from '../../helpers/ActionModal';
import FormInput from '../../helpers/FormInput';
import DropZone from '../../helpers/DropZone';

const GameModal = ({ show, onHide, onDone }) => {
  return (
    <ActionModal
      title="Kahoot summary"
      show={show}
      onHide={onHide}
      onDone={onDone}
    >
      <div className="game-form">
        <FormInput type="text" label="Title" required maxLength={50} />
        <FormInput
          variant="textarea"
          type="text"
          label="Description"
          required={false}
          maxLength={250}
        />
        <div className="image-container">
          <span>Cover</span>
          <DropZone />
        </div>
      </div>
    </ActionModal>
  );
};

GameModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default GameModal;
