import { useCallback, useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export default function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      setHasError(false);
    }
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setDuration(0);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.preload = "metadata";

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleError);
      audio.pause();
      setIsPlaying(false);
    };
  }, [audioUrl, handleLoadedMetadata, handleTimeUpdate, handleError]);

  const formatTime = useCallback((time: number) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  if (hasError) {
    return (
      <div className="mb-8 rounded-xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm">
        <h4 className="mb-4 font-semibold text-gray-900 text-lg">{title}</h4>
        <div className="text-gray-500 text-sm">音频资源暂不可用</div>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm">
      <h4 className="mb-4 font-semibold text-gray-900 text-lg">{title}</h4>

      <audio
        className="hidden"
        preload="metadata"
        ref={audioRef}
        src={audioUrl}
      />

      <div className="flex items-center gap-4">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:from-blue-700 hover:to-indigo-700"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                fillRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <input
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            max={duration}
            min={0}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #2563eb ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`,
            }}
            type="range"
            value={currentTime}
          />
          <div className="mt-1 flex justify-between text-gray-500 text-sm">
            <span>{isLoading ? "0:00" : formatTime(currentTime)}</span>
            <span>{isLoading ? "0:00" : formatTime(duration)}</span>
          </div>
        </div>

        <div className="relative">
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setShowVolumeControl(!showVolumeControl)}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {showVolumeControl && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform">
              <input
                className="h-24 w-2 cursor-pointer appearance-none rounded-lg bg-gray-200"
                max={1}
                min={0}
                onChange={handleVolumeChange}
                step={0.1}
                style={{
                  background: `linear-gradient(to top, #2563eb ${volume * 100}%, #e5e7eb ${volume * 100}%)`,
                }}
                type="range"
                value={volume}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
