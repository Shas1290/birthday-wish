import { useState, useRef, useEffect } from 'react';
import config from '../config.js';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  // Don't render if no music configured
  if (!config.music.src) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  if (hasError) return null;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={config.music.src}
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />
      <button
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-icon">
          {isPlaying ? '🎵' : '🎵'}
        </span>
        <span className="music-label">{config.music.label}</span>
        {isPlaying && (
          <span className="music-bars">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
        )}
      </button>
    </div>
  );
}
