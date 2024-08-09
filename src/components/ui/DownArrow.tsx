import * as React from "react";

interface DownArrowProps extends React.SVGProps<SVGSVGElement> {}

const DownArrow: React.FC<DownArrowProps> = (props) => {
  return (
    <svg
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M78.466 35.559L50.15 63.633 22.078 35.317a2 2 0 00-2.84 2.815L48.432 67.58a1.993 1.993 0 001.727.568c.054.008.106.021.16.022a1.991 1.991 0 001.515-.576l29.447-29.196a1.999 1.999 0 10-2.815-2.839z" />
    </svg>
  );
};

export default DownArrow;
