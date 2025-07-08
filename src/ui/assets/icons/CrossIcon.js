import * as React from 'react';

const CrossIcon = ({ className }) => (
  <svg
    width={40}
    height={40}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    role="presentation"
  >
    <circle cx="19.7659" cy="19.7659" r="19.2659" stroke="#373737" />
    <line x1="9.99543" y1="11.9835" x2="29.7612" y2="29.1138" stroke="#373737" />
    <line
      y1="-0.5"
      x2="26.1559"
      y2="-0.5"
      transform="matrix(-0.755689 0.654931 0.654931 0.755689 30.6582 12.3613)"
      stroke="#373737"
    />
  </svg>
);

export default CrossIcon;
