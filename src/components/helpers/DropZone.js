import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v1 as uuid } from 'uuid';

import Button from './Button';
import { useEffect } from 'react';

const DropZone = ({ id, types, initValue, onFileChange }) => {
  const inputId = id || uuid();
  const deleteButtonId = uuid();

  const [active, setActive] = useState(false);
  const [src, setSrc] = useState('');

  const preventDefaultEvent = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  const loadFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setSrc(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  };

  const dispactchEvent = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file instanceof File && file.type.includes('image')) {
        loadFile(file);
        // dispatch event
        onFileChange({ file, deleted: false });
      }
    }
  };

  const onDragEnter = (evt) => {
    preventDefaultEvent(evt);
    setActive(true);
  };

  const onDragOver = (evt) => {
    preventDefaultEvent(evt);
    setActive(true);
  };

  const onDragLeave = (evt) => {
    preventDefaultEvent(evt);
    setActive(false);
  };

  const onDrop = (evt) => {
    preventDefaultEvent(evt);
    setActive(false);

    const { files } = evt.dataTransfer;
    dispactchEvent(files);
  };

  const onChange = (evt) => {
    const { files } = evt.target;
    dispactchEvent(files);
  };

  const onClick = (evt) => {
    const { id } = evt.target;
    if (id === deleteButtonId) {
      setSrc('');
      onFileChange({ deleted: true });
    }
  };

  useEffect(() => {
    setSrc(initValue);
    if (initValue) {
      if (typeof initValue === 'string') {
        setSrc(initValue);
      } else if (initValue instanceof File) {
        loadFile(initValue);
      }
    }
  }, [initValue]);

  return (
    <div
      className="dropzone"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        onChange={onChange}
        className="input-file"
        id={inputId}
      />
      <label
        htmlFor={inputId}
        className={`input-file-label ${active ? 'active' : 'inactive'}`}
      >
        {src ? (
          <div className="image-block">
            <img src={src} alt="" />
            <div className="delete-container">
              <Button variant="two" id={deleteButtonId} onClick={onClick}>
                <i className="material-icons">delete_outline</i>
              </Button>
            </div>
          </div>
        ) : (
          <span>
            <i className="material-icons">wallpaper</i>
            Drag and drop or click to import an image from your computer
          </span>
        )}
      </label>
    </div>
  );
};

DropZone.propTypes = {
  id: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.string),
  initValue: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  onFileChange: PropTypes.func,
};

DropZone.defaultProps = {
  id: '',
  initValue: null,
  onFileChange: () => {},
};

export default DropZone;
