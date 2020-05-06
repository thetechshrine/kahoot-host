import React from 'react';
import PropTypes from 'prop-types';

import ActionModal from './ActionModal';

const DeleteModal = ({ title, message, show, onHide, onDone }) => {
  return (
    <ActionModal
      show={show}
      onHide={onHide}
      onDone={onDone}
      title={title}
      size="small"
      doneButtonText="Delete"
      doneButtonVariant="two"
    >
      {message}
    </ActionModal>
  );
};

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default DeleteModal;
