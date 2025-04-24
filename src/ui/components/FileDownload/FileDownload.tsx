import React from 'react';
import { FiDownload } from 'react-icons/fi';

import { useDownloadClick } from '@/hooks/useDownloadClick';
import useTranslationFunction from '@/hooks/useTranslationFunction';

import { Text } from '../ui-kit';
import styles from './styles/file-download.module.scss';
import { FileDownloadProps } from './types';

const FileDownload: React.FC<FileDownloadProps> = ({ src, label, className = '' }) => {
  const translate = useTranslationFunction();

  const handleDownloadClick = useDownloadClick({ src, label });

  return (
    <div className={`${styles['file-download']} ${className}`}>
      <Text textType="span">{label}</Text>

      <button
        className={styles['file-download__clickable']}
        onClick={handleDownloadClick}
        tabIndex={0}
        aria-label={`Download ${label}`}
      >
        <Text textType="span" className={styles['file-download__label']}>
          {translate('download_label')}
        </Text>

        <FiDownload />
      </button>
    </div>
  );
};

export default FileDownload;
