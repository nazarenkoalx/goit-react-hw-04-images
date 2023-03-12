import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onModalShow }) => {
  useEffect(() => {
    const onKeydown = evt => {
      if (evt.code === 'Escape') {
        onModalShow();
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onModalShow]);

  const onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onModalShow();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onModalShow: PropTypes.func.isRequired,
};
