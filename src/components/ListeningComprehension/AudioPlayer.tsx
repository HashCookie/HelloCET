import React, { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  playingAudio: string | null; // 允许 null 值
  onAudioPlay: (audioId: string | null) => void;
  audioId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  playingAudio,
  onAudioPlay,
  audioId,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(false);
    setError("");
    setIsPlaying(false); // 当 src 改变时，重置播放状态
  }, [src]);

  useEffect(() => {
    if (playingAudio !== audioId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false); // 如果播放其他音频，停止并重置播放状态
    }
  }, [playingAudio, audioId, isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      setLoading(true);
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true); // 开始播放时设置为 true
            onAudioPlay(audioId); // 通知父组件
          })
          .catch(() => {
            setError("音频加载失败");
            setLoading(false);
          });
      } else {
        audio.pause();
        setIsPlaying(false); // 暂停时设置为 false
        onAudioPlay(null); // 通知父组件
        setLoading(false);
      }
    }
  };

  const handleOnLoadedData = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <audio
        ref={audioRef}
        src={src}
        onLoadedData={handleOnLoadedData}
        onError={() => setError("音频加载失败")}
        onPlay={() => setLoading(false)} // 当音频实际开始播放时停止加载
        onPause={() => setIsPlaying(false)} // 当音频暂停时更新状态
      />
      {loading && <p>正在加载...</p>}
      {isPlaying && <p>正在播放...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioPlayer;
