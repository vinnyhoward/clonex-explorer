import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const HomeIcon: React.FC<LogoProps> = ({
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
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.75 21.875H15.4167C15.2438 21.875 15.1042 21.7354 15.1042 21.5624V17.1875C15.1042 15.749 13.9385 14.5833 12.5 14.5833C11.0615 14.5833 9.89583 15.749 9.89583 17.1875V21.5624C9.89583 21.7354 9.7562 21.875 9.58328 21.875H6.25C4.16667 21.875 3.125 20.8333 3.125 18.75V12.1365C3.125 10.0552 3.66985 9.73547 4.61464 8.9438L10.8271 3.73433C11.7948 2.92287 13.2063 2.92287 14.174 3.73433L20.3865 8.9438C21.3303 9.73547 21.876 10.0552 21.876 12.1365V18.75C21.875 20.8333 20.8333 21.875 18.75 21.875Z"
        fill={color}
      />
    </svg>
  );
};
