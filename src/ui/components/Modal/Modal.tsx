import cx from 'classnames';
import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

import styles from './styles/modal.module.scss';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({
  children,
  onHide,
  isModalShow,
  isSemitransparent,
  isMediaGallery,
}) => {
  return (
    isModalShow && (
      <div className={styles.modal}>
        <div
          className={cx(styles.modal__overlay, {
            [styles['modal__overlay--semitransparent']]: isSemitransparent,
          })}
          onMouseDown={onHide}
        ></div>

        <div
          className={cx(styles.modal__container, styles['animation-modal'], {
            [styles['modal__container--media-gallery']]: isMediaGallery,
          })}
        >
          <div className={styles.modal__close} onClick={onHide}>
            <ImCancelCircle />
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
