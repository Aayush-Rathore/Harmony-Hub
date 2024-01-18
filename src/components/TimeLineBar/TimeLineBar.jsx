import { useRef } from "react";
import "./TimeLineBar.css";

// eslint-disable-next-line react/prop-types
const TimeLineBar = ({ timeLine, audioEl, duration }) => {
  const timeLineRef = useRef();
  const changeDuration = (e) => {
    let width = timeLineRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    // eslint-disable-next-line react/prop-types
    audioEl.current.currentTime = (divProgress / 100) * duration;
  };

  return (
    <div className="time-line" ref={timeLineRef} onClick={changeDuration}>
      <div
        className="time-line-bar"
        style={{ width: timeLine ? timeLine : "0px" }}
      ></div>
    </div>
  );
};

export default TimeLineBar;
