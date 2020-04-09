import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { size, show, onHide } = props;

  return ReactDOM.createPortal(
    <div
      className={`modal-container ${show ? 'visible' : ''}`}
      onClick={onHide}
    >
      <div className={`modal ${size}`} onClick={() => {}}>
        {props.children}
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
