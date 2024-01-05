import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const HamburgerIcon: React.FC<LogoProps> = ({
  width = 24,
  height = 24,
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
      viewBox="0 0 20 21"
    >
      <path
        fill={color}
        d="M9 6C9 5.448 9.448 5 10 5H21C21.552 5 22 5.448 22 6C22 6.552 21.552 7 21 7H10C9.448 7 9 6.552 9 6ZM21 11H3C2.448 11 2 11.448 2 12C2 12.552 2.448 13 3 13H21C21.552 13 22 12.552 22 12C22 11.448 21.552 11 21 11ZM14 17H3C2.448 17 2 17.448 2 18C2 18.552 2.448 19 3 19H14C14.552 19 15 18.552 15 18C15 17.448 14.552 17 14 17Z"
        />
    </svg>
  );
};
