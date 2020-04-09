import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ImageButton from './ImageButton';

const Notification = (props) => {
  const { type, show, onHide } = props;

  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible !== show) {
      setLoaded(true);
    }
    setVisible(show);
  }, [show, visible]);

  return ReactDOM.createPortal(
    <div
      className={`notification ${type} ${
        loaded ? (show ? 'visible' : 'hidden') : ''
      }`}
    >
      <div className="notification-inner-container">
        <header>
          <ImageButton onClick={onHide}>
            <i className="material-icons">clear</i>
          </ImageButton>
        </header>
        <section>{props.children}</section>
      </div>
    </div>,
    document.getElementById('notification')
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'error']),
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

Notification.defaultProps = {
  type: 'success',
  show: false,
  onHide: () => {},
};

export default Notification;
