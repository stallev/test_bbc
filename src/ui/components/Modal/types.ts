import React from 'react';

export interface ModalProps {
  children: React.ReactNode;
  isModalShow: boolean;
  isMediaGallery?: boolean;
  isSemitransparent?: boolean;
  onHide: () => void;
}
