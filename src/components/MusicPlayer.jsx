import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play() {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    },
    pause() {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
  }));

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    setShowPopup(false); // 👈 ONLY closes on click
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop />

      {showPopup && (
        <div className="music-popup">
          <button onClick={handlePlay}>🎵 Play Music</button>
        </div>
      )}

      <button className="music-toggle" onClick={toggleMusic}>
        {isPlaying ? "⏸ Pause Music" : "🎶 Play Music"}
      </button>
    </>
  );
});

export default MusicPlayer;
