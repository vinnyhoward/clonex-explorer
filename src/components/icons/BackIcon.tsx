import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const BackIcon: React.FC<LogoProps> = ({
  width = 21,
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
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.75 0.385376H4.25C1.73125 0.385376 0.34375 1.77288 0.34375 4.29163V14.7083C0.34375 17.227 1.73125 18.6145 4.25 18.6145H16.75C19.2687 18.6145 20.6562 17.227 20.6562 14.7083V4.29163C20.6562 1.77288 19.2687 0.385376 16.75 0.385376ZM4.25 1.94788H16.75C18.3927 1.94788 19.0937 2.64892 19.0937 4.29163V11.8437L14.3645 7.1145C13.9583 6.70825 13.2917 6.70825 12.8855 7.1145L7.73956 12.2603C7.54164 12.4582 7.20836 12.4582 7.01044 12.2603L6.03121 11.2812C5.62496 10.8749 4.95837 10.8749 4.55212 11.2812L1.90625 13.927V4.29163C1.90625 2.64892 2.60729 1.94788 4.25 1.94788ZM5.03125 6.37496C5.03125 5.65621 5.60838 5.07288 6.32609 5.07288H6.33651C7.05422 5.07288 7.63643 5.65621 7.63643 6.37496C7.63643 7.09371 7.05526 7.67704 6.33651 7.67704C5.6188 7.67704 5.03125 7.09371 5.03125 6.37496Z"
        fill={color}
      />
    </svg>
  );
};

