// ControlPanel.js
import "./ControlPanel.css";
import { useEffect, useRef, useState } from "react";
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";
import TimeLineBar from "../TimeLineBar/TimeLineBar";

const ControlPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Add duration state
  const audioEl = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Update the duration state when the audio metadata is loaded
    audioEl.current.addEventListener("loadedmetadata", () => {
      setDuration(audioEl.current.duration);
    });

    audioEl.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioEl.current.currentTime);
    });

    audioEl.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0); // Reset current time when the song is completed
    });

    return () => {
      audioEl.current.removeEventListener("loadedmetadata", () => {});
      audioEl.current.removeEventListener("timeupdate", () => {});
      audioEl.current.removeEventListener("ended", () => {});
    };
  }, []);

  const ToggelPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="d-sm-flex flex-row-reverse justify-content-center align-items-center position-fixed fixed-bottom w-100 control-panel">
      <audio src="./PAISA.mp3" ref={audioEl} />

      <TimeLineBar
        timeLine={(currentTime / duration) * 100 + "%"}
        audioEl={audioEl}
        duration={duration}
      />

      <div className="controllers d-flex justify-content-center align-items-center gap-4 m-3">
        <IoPlayBack size={45} color="#2a2d3a" />
        <>
          {isPlaying ? (
            <IoPause onClick={ToggelPlay} size={50} color="#2a2d3a" />
          ) : (
            <IoPlay onClick={ToggelPlay} size={50} color="#2a2d3a" />
          )}
        </>
        <IoPlayForward size={45} color="#2a2d3a" />
      </div>
    </div>
  );
};

export default ControlPanel;
