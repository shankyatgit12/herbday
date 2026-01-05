import { useState } from "react";
import "./App.css";

import Countdown from "./components/Countdown";
import CelebrationPage from "./components/CelebrationPage";
import MessageCard from "./components/MessageCard";
import Gallery from "./components/Gallery";
import MusicPlayer from "./components/MusicPlayer";
import Hearts from "./components/Hearts";
import Effects from "./components/Effects";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="app">
      <MusicPlayer />
      <Hearts />
      <Effects />

      {page === 1 && (
        <div className="page">
          <h1>
            Happy Birthday <span className="highlight">Rashi Baby</span> 🎂
          </h1>
          <p>The day the most beautiful soul was born 💖</p>

          <Countdown />

          <button className="celebrate-btn" onClick={() => setPage(2)}>
            🎀 Let’s Celebrate You
          </button>
        </div>
      )}

      {page === 2 && (
        <div className="page">
          <CelebrationPage onComplete={() => setPage(3)} />
        </div>
      )}

      {page === 3 && (
        <div className="page">
          <button className="back-btn" onClick={() => setPage(2)}>
            ← Back
          </button>

          <MessageCard />

          <button className="page-nav-btn" onClick={() => setPage(4)}>
            📸 Our Memories
          </button>
        </div>
      )}

      {page === 4 && (
        <div className="page">
          <button className="back-btn" onClick={() => setPage(3)}>
            ← Back
          </button>

          <Gallery />

          <h2 className="final-message">💖 Forever yours, Rashi Baby 💖</h2>
          <p className="final-subtitle">— Shashank</p>
        </div>
      )}
    </div>
  );
}

export default App;
