import React from "react";
import { ReactComponent as Play } from "Images/play.svg";
import { ReactComponent as Pause } from "Images/pause.svg";
import { ReactComponent as Next } from "Images/next.svg";
import { ReactComponent as Prev } from "Images/prev.svg";
import {Row, Col} from "reactstrap"

const AudioControls = (props) => {
  const renderButton = (style, ariaLabel, onClikcFun, label) => {
    return (
      <button
        type="button"
        className={style}
        onClick={onClikcFun}
        aria-label={ariaLabel}
      >
        {label}
      </button>
    );
  };

  const renderPausePlayButton = () => {
    if (props.isPlaying) return renderButton("pause", "Pause", () => props.onPlayPauseClick(false), <Pause /> );

    return renderButton( "play", "Play", () => props.onPlayPauseClick(true), <Play />);
  };

  return (
    <Row className="audio-controls py-3">
      <Col>
        {renderButton("prev", "Previous", props.onPrevClick, <Prev />)}
      </Col>
      <Col>
        {renderPausePlayButton()}
      </Col>
      <Col>
        {renderButton("next", "Next", props.onNextClick, <Next />)}
      </Col>
    </Row>
  );
};

export default AudioControls;
