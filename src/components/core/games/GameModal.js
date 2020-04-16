import React from 'react';
import PropTypes from 'prop-types';

import ActionModal from '../../helpers/ActionModal';
import FormInput from '../../helpers/FormInput';
import DropZone from '../../helpers/DropZone';

const GameModal = ({ show, onHide, onDone, onChange, onFileChange }) => {
  return (
    <ActionModal
      title="Kahoot summary"
      show={show}
      onHide={onHide}
      onDone={onDone}
    >
      <div className="game-form">
        <FormInput
          type="text"
          name="title"
          label="Title"
          required
          maxLength={50}
          onChange={onChange}
        />
        <FormInput
          variant="textarea"
          type="text"
          name="description"
          label="Description"
          required={false}
          maxLength={250}
          onChange={onChange}
        />
        <div className="image-container">
          <span>Cover</span>
          <DropZone onFileChange={onFileChange} />
        </div>
      </div>
    </ActionModal>
  );
};

GameModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default GameModal;
