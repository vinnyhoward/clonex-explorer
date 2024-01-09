import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const ThinSearchIcon: React.FC<LogoProps> = ({
  width = 35,
  height = 35,
  scale = 1,
  color = "#FFFFFF",
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  return (
    <svg
      width={scaledWidth}
      height={scaledHeight}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M31.398 29.8521L25.7965 24.2506C27.669 22.0296 28.8021 19.1669 28.8021 16.0417C28.8021 9.00521 23.0781 3.28125 16.0417 3.28125C9.00521 3.28125 3.28125 9.00521 3.28125 16.0417C3.28125 23.0781 9.00521 28.8021 16.0417 28.8021C19.1669 28.8021 22.0296 27.669 24.2507 25.7965L29.852 31.3979C30.065 31.6108 30.345 31.7188 30.625 31.7188C30.905 31.7188 31.185 31.6123 31.398 31.3979C31.8253 30.9721 31.8253 30.2794 31.398 29.8521ZM5.46875 16.0417C5.46875 10.2113 10.2113 5.46875 16.0417 5.46875C21.8721 5.46875 26.6146 10.2113 26.6146 16.0417C26.6146 21.8721 21.8721 26.6146 16.0417 26.6146C10.2113 26.6146 5.46875 21.8721 5.46875 16.0417Z"
        fill={color}
      />
    </svg>
  );
};
