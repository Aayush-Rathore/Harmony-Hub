import "./TimeLineBar.css";

// eslint-disable-next-line react/prop-types
const TimeLineBar = ({ duration }) => {
  return (
    <input
      type="range"
      name="songDuration"
      className="timeLineBar"
      value={duration}
    />
  );
};

export default TimeLineBar;
