import React from 'react';

import styles from './styles/donation-form.module.scss';

const DonationForm:React.FC = () => {

  return (
    <div className={styles['donation-form']}>
      <iframe
        src="https://wallet.subsplash.com/ui/embed/XFPQJH/"
        title="Donate to Bible Baprist Church"
        width="100%"
        height="630"
        frameBorder="0"
        allow="accelerometer; clipboard-write;gyroscope; picture-in-picture; web-share"
        data-src="https://wallet.subsplash.com/ui/embed/XFPQJH/"
        scrolling="no"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default DonationForm;
