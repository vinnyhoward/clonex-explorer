import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const JewelryIcon: React.FC<LogoProps> = ({
  width = 25,
  height = 25,
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
      viewBox="0 0 25 25"
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2708 15.1042C19.2708 18.8437 16.2396 21.875 12.5 21.875C8.76042 21.875 5.72917 18.8437 5.72917 15.1042C5.72917 11.3646 8.76042 8.33333 12.5 8.33333C16.2396 8.33333 19.2708 11.3646 19.2708 15.1042ZM21.875 3.125H16.6667L14.4688 6.58751C14.3552 6.76563 14.452 6.99375 14.6562 7.04896C15.8604 7.37604 16.9583 7.96458 17.8791 8.74999C18.0239 8.87291 18.2386 8.84585 18.3407 8.68543L21.875 3.125ZM10.5312 6.58751L8.33333 3.125H3.125L6.66148 8.68645C6.76356 8.84686 6.97814 8.87396 7.12293 8.75104C8.04376 7.96458 9.14063 7.37709 10.3458 7.05001C10.549 6.99376 10.6448 6.76563 10.5312 6.58751Z"
        />
    </svg>
  );
};
