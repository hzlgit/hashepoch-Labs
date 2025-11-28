const IconCopy = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24"
      height="24"
      filter="none"
    >
      <g>
        <path
          d="M20 6H38C39.1046 6 40 6.89543 40 8V30"
          stroke="CurrentColor"
          strokeWidth="4"
          fill="none"
        ></path>
        <path
          d="M8 40V16C8 14.8954 8.89543 14 10 14H30C31.1046 14 32 14.8922 32 15.9968V40.0085C32 41.1131 31.1072 42 30.0026 42H9.99552C8.89095 42 8 41.1046 8 40Z"
          stroke="CurrentColor"
          strokeWidth="4"
          fill="none"
        ></path>
      </g>
    </svg>
  );
};

export default IconCopy;
