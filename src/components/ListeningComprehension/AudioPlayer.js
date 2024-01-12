import React, { useRef } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} />
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default AudioPlayer;
