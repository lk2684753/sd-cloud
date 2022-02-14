export default (props: any) => {
  let styles = {
    cls1: {
      fill: 'transparent',
    },
    cls2: {
      fill: 'url(#126)',
    },
  };
  return (
    <svg
      width="100%"
      height="100%"
      id="ButtonSVG"
      data-name="ButtonSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 119.82 35.74"
    >
      <defs>
        <linearGradient
          id="126"
          x1="59.93"
          y1="35.78"
          x2="59.93"
          y2="0.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#006264" stopOpacity="0.22" />
          <stop offset="0" stopColor="#006264" stopOpacity="0.24" />
          <stop offset="1" stopColor="#5ec3dc" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        stroke="url(#126)"
        strokeWidth={props.width}
        fill="transparent"
        d="M111.33,35.78H8.52A8.51,8.51,0,0,1,0,27.28V8.53A8.51,8.51,0,0,1,8.52,0H111.33a8.51,8.51,0,0,1,8.5,8.5V27.28A8.51,8.51,0,0,1,111.33,35.78ZM8.52,1A7.51,7.51,0,0,0,1,8.53V27.28a7.51,7.51,0,0,0,7.5,7.5H111.33a7.51,7.51,0,0,0,7.5-7.5V8.53a7.51,7.51,0,0,0-7.5-7.5Z"
        // transform="translate(-0.02 -0.03)"
      />
    </svg>
  );
};
