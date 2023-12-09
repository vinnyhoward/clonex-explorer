import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const HelmetIcon: React.FC<LogoProps> = ({
  width = 19,
  height = 21,
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
      viewBox="0 0 19 21"
    >
      <path
        fill={color}
        d="M18.875 9.34266C18.875 16.2875 12.9719 19.7594 9.5 20.9167C6.02812 19.7594 0.125 16.2875 0.125 9.34266C0.125 8.1062 0.125 4.39275 0.125 3.20837C5.33333 2.16671 7.18549 1.24067 9.51882 0.083374C11.8157 1.24067 13.6667 2.16671 18.875 3.20837C18.875 4.45212 18.875 8.06662 18.875 9.34266Z"
        />
    </svg>
  );
};
