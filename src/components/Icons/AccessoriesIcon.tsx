import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const AccessoriesIcon: React.FC<LogoProps> = ({
  width = 19,
  height = 19,
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
      viewBox="0 0 19 19"
      fill="none"
    >
      <path
        d="M17.7916 12.8438L12.8333 17.8125C11.4062 19.2291 9.93756 19.2291 8.52089 17.8125L7.68331 16.9656C7.56144 16.8437 7.56144 16.6458 7.68331 16.5239L16.5126 7.69482C16.6344 7.57295 16.8323 7.57295 16.9542 7.69482L17.7906 8.53126C19.2604 10 19.2083 11.4167 17.7916 12.8438ZM15.4354 6.61666L6.6063 15.4458C6.48442 15.5677 6.28643 15.5677 6.16456 15.4458L1.02082 10.3021C0.44686 9.72815 0.125 8.95101 0.125 8.13955V2.15626C0.125 1.03439 1.03432 0.125 2.1562 0.125H8.1323C8.94272 0.125 9.7198 0.44686 10.2917 1.02082L15.4354 6.17498C15.5573 6.29686 15.5573 6.49479 15.4354 6.61666ZM5.33333 4.29167C5.33333 3.71667 4.8687 3.25 4.2937 3.25H4.28327C3.71036 3.25 3.24898 3.71667 3.24898 4.29167C3.24898 4.86667 3.71977 5.33333 4.29268 5.33333C4.86873 5.33333 5.33333 4.86667 5.33333 4.29167Z"
        fill={color}
      />
    </svg>
  );
};

