import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from './Button';

const ActionModal = (props) => {
  const {
    size,
    show,
    onHide,
    title,
    onDone,
    doneButtonVariant,
    doneButtonText,
    className,
  } = props;

  return (
    <Modal size={size} show={show} onHide={onHide}>
      <div className={`action-modal-body ${className}`}>
        <header>
          <h5 className="title">{title}</h5>
        </header>
        <main>{props.children}</main>
        <footer>
          <Button onClick={onHide}>Cancel</Button>
          <Button variant={doneButtonVariant} onClick={onDone}>
            {doneButtonText}
          </Button>
        </footer>
      </div>
    </Modal>
  );
};

ActionModal.propTypes = {
  size: PropTypes.oneOf(['small', 'normal', '']),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  doneButtonVariant: PropTypes.string,
  doneButtonText: PropTypes.string,
  className: PropTypes.string,
};

ActionModal.defaultProps = {
  size: 'normal',
  doneButtonVariant: 'four',
  doneButtonText: 'Done',
  className: '',
};

export default ActionModal;
