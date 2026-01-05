import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => handlePlay(),
    pause: () => handlePause(),
  }));

  const handlePlay = () => {
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowPopup(false); // 👈 ONLY hide AFTER click
      })
      .catch(() => {
        // browser blocked — do nothing, popup stays
      });
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <>
      {/* MUSIC FILE */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* POPUP — STAYS UNTIL CLICK */}
      {showPopup && (
        <div className="music-popup">
          <button className="music-btn" onClick={handlePlay}>
            🎵 Play Music
          </button>
        </div>
      )}

      {/* SMALL TOGGLE AFTER START */}
      {isPlaying && (
        <button className="music-toggle" onClick={handlePause}>
          🔇 Pause
        </button>
      )}
    </>
  );
});

export default MusicPlayer;
