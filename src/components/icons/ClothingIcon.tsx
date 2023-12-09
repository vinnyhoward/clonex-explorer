import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const ClothingIcon: React.FC<LogoProps> = ({
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
    >
      <path
        fill={color}
        d="M13.6771 0.156208L18.1875 1.80204C18.6042 1.94788 18.875 2.34371 18.875 2.78121V6.04162C18.875 6.72912 18.2083 7.22912 17.5521 7.04162L15.2292 6.37496V17.3125C15.2292 18.177 14.5312 18.875 13.6667 18.875H5.33333C4.46875 18.875 3.77083 18.177 3.77083 17.3125V6.37496L1.44792 7.04162C0.78125 7.22912 0.125 6.72912 0.125 6.04162V2.78121C0.125 2.34371 0.395833 1.94788 0.8125 1.80204L5.32292 0.156208C5.59375 0.0624581 5.89583 0.197878 5.98958 0.468711C6.29166 1.35413 7.16667 3.09372 9.5 3.09372C11.8333 3.09372 12.7083 1.35413 13.0104 0.468711C13.1042 0.197878 13.4063 0.0624581 13.6771 0.156208Z"
        />
    </svg>
  );
};
