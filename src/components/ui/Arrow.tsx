import * as React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {}

const Arrow: React.FC<SvgComponentProps> = (props) => {
  return (
    <svg
      fill="#000"
      viewBox="0 0 24 24"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
      {...props}
    >
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M11 7L8 4 5 7" />
        <path data-name="primary" d="M13 17L16 20 19 17" />
        <path data-name="primary" d="M8 20V4m8 0v16" />
      </g>
    </svg>
  );
};

export default Arrow;