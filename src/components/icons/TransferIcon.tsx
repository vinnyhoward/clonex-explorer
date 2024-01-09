import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  rotate?: boolean;
  scale?: number;
  color?: string;
}

export const TransferIcon: React.FC<LogoProps> = ({
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
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
    d="M6.55536 12.1949L2.38971 8.02926C2.29283 7.93239 2.21675 7.81788 2.16362 7.68976C2.05841 7.43559 2.05841 7.14792 2.16362 6.89376C2.21675 6.76563 2.29283 6.65112 2.38971 6.55425L6.55536 2.3886C6.96265 1.98131 7.62105 1.98131 8.02834 2.3886C8.43563 2.79589 8.43563 3.45429 8.02834 3.86158L5.63983 6.25009H17.7085C18.2846 6.25009 18.7502 6.71676 18.7502 7.29176C18.7502 7.86676 18.2846 8.33342 17.7085 8.33342H5.63983L8.02834 10.7219C8.43563 11.1292 8.43563 11.7876 8.02834 12.1949C7.82521 12.398 7.55851 12.5001 7.29185 12.5001C7.02518 12.5001 6.75848 12.398 6.55536 12.1949ZM22.8367 17.3104C22.7836 17.1823 22.7075 17.0678 22.6107 16.9709L18.445 12.8053C18.0377 12.398 17.3793 12.398 16.972 12.8053C16.5647 13.2126 16.5647 13.871 16.972 14.2782L19.3605 16.6668H7.29185C6.71581 16.6668 6.25018 17.1334 6.25018 17.7084C6.25018 18.2834 6.71581 18.7501 7.29185 18.7501H19.3605L16.972 21.1386C16.5647 21.5459 16.5647 22.2043 16.972 22.6116C17.1751 22.8147 17.4418 22.9168 17.7085 22.9168C17.9752 22.9168 18.2419 22.8147 18.445 22.6116L22.6107 18.4459C22.7075 18.3491 22.7836 18.2345 22.8367 18.1064C22.9419 17.8523 22.9419 17.5646 22.8367 17.3104Z"
    fill={color}
      />
    </svg>
  );
};
