import * as React from 'react';

const AnimatedCircleIcon = ({ className }) => {
  const size = 17;
  const centerX = 8.315;
  const centerY = 8.315;
  const radius = 7.535;
  const circumference = 2 * Math.PI * radius;
  const duration = 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth="1.56"
        opacity="0.2"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#FF3838"
        strokeWidth="1.56"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform={`rotate(-90 ${centerX} ${centerY})`}
      >
        <animate
          attributeName="stroke-dashoffset"
          values={`${circumference};0`}
          dur={`${duration}s`}
          fill="freeze"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default AnimatedCircleIcon;
