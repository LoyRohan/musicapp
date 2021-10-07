import React, { useState, useEffect, useRef } from "react";
import AudioControls from "Components/AudioControls";
import {Row, Col} from "reactstrap";
import styled from "styled-components";
import _ from "lodash"

const AudioPlayer = (props) => {
  const [trackIndex, setTrackIndex] = useState(0),
    [trackProgress, setTrackProgress] = useState(0),
    [isPlaying, setIsPlaying] = useState(false); 
  const {title, artist, image, audioSrc} = props.tracks[trackIndex];
  const audioRef = useRef(new Audio(audioSrc));

  // Destructure for conciseness
const { duration } = audioRef.current;

/**
 * Plays the previus track
 */
const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(props.tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

// Refs
const intervalRef = useRef(),
    currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%",
    isReady = useRef(false),
    trackStyling = `
        -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

/**
 * Change the next track
 */
  const toNextTrack = () => {
    if (trackIndex < props.tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  /**
   * start the timer
   */
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  /**
   * Update the track index to play selected song
   */
  useEffect(() => {
    if (!_.isUndefined(props.trackIndex)) {
      setTrackIndex(props.trackIndex);
    }

  }, [props.trackIndex])

  /**
   * Play and pause the songs
   */
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {                      
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    }
  },[])

  /**
   * Renders the song details
   * @returns 
   */
  const renderAlbumDetails = () => {
    return(
      <Row className="align-items-center">
        <Col xs="12" md="4" className="text-center">
          <img src={image}  width="100" height="100" className="rounded-circle"/>
        </Col>
        <Col className="text-white">
          <h4>{title}</h4>
          <h6>{artist}</h6>
        </Col>
      </Row>
    )
  }

  /**
   * Styling the row give gradianet color 
   */
  let StyledRow = styled(Row)`
      {
          background: linear-gradient(135deg, hsl(274, 70%, 71%, 1.65), hsl(220, 80%, 50%, 0.65));
      }
  `

  return (
    <StyledRow className="rounded-top align-items-center py-2">
      <Col>
        {renderAlbumDetails()}
      </Col>
      <Col className="text-center">
        <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
        </Col>
    </StyledRow>
  );
};

export default AudioPlayer;
