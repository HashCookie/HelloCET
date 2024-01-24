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
    <div className="flex flex-col items-center justify-center">
      <audio ref={audioRef} src={src} className="w-full mb-4" />
      <button onClick={handlePlayPause} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play/Pause
      </button>
    </div>
  );
};

export default AudioPlayer;
