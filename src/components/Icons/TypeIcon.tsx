import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const TypeIcon: React.FC<LogoProps> = ({
  width = 21,
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
      viewBox="0 0 21 21"
    >
      <path
        fill={color}
        d="M16.3125 12.5833C16.3125 16.8906 12.8083 20.3958 8.5 20.3958C4.19167 20.3958 0.6875 16.8906 0.6875 12.5833C0.6875 10.2417 1.35625 8.57395 2.92291 7.00624C3.2302 6.69791 3.57813 6.38957 3.93854 6.07082C5.41354 4.76457 6.9375 3.41356 6.9375 1.12398C6.9375 0.932314 7.04376 0.755189 7.21251 0.664564C7.38126 0.573939 7.58647 0.58334 7.74688 0.690631C7.80938 0.732298 13.6198 4.71456 10.6406 11.5562C11.3396 11.1656 12.176 10.525 12.6896 9.53017C13.0188 8.89267 13.1865 8.16773 13.1865 7.37398C13.1865 7.16252 13.3146 6.97188 13.5104 6.89168C13.7042 6.81147 13.9302 6.8573 14.0792 7.00834C15.4989 8.45105 16.3125 10.4833 16.3125 12.5833Z"
      />
    </svg>
  );
};
