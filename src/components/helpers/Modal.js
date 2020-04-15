import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { v1 as uuid } from 'uuid';

const Modal = (props) => {
  const { size, show, onHide } = props;

  const modalId = uuid();

  const onClick = (evt) => {
    const { id } = evt.target;
    if (id === modalId) onHide();
  };

  return ReactDOM.createPortal(
    <div className={`modal-container ${show ? 'visible' : ''}`}>
      <div onClick={onClick} id={modalId}>
        <div className={`modal ${size}`} onClick={() => {}}>
          {props.children}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  size: PropTypes.oneOf(['small', 'normal']),
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  size: 'normal',
  show: false,
};

export default Modal;
