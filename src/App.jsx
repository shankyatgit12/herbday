import { useState } from "react";
import "./App.css";

import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="app">
      <MusicPlayer />
      <Hearts />
      <Effects />

      {/* PAGE 1 */}
      {currentPage === 1 && (
        <div className="page">
          <section className="hero">
            <h1>
              Happy Birthday <span className="highlight">Rashi Baby</span> 🎂
            </h1>
            <p>
              Today isn’t just another day.  
              It’s the day the most beautiful soul was born 💖
            </p>
          </section>

          <Countdown birthdayReached={true} />

          <button
            className="celebrate-btn"
            onClick={() => setCurrentPage(2)}
          >
            🎀 Let’s Celebrate You
          </button>
        </div>
      )}

      {/* PAGE 2 */}
      {currentPage === 2 && (
        <div className="page">
          <CelebrationPage onComplete={() => setCurrentPage(3)} />
          <button className="back-btn" onClick={() => setCurrentPage(1)}>
            ← Back
          </button>
        </div>
      )}

      {/* PAGE 3 */}
      {currentPage === 3 && (
        <div className="page">
          <MessageCard />
          <button className="page-nav-btn" onClick={() => setCurrentPage(4)}>
            📸 Our Memories
          </button>
          <button className="back-btn" onClick={() => setCurrentPage(2)}>
            ← Back
          </button>
        </div>
      )}

      {/* PAGE 4 */}
      {currentPage === 4 && (
        <div className="page">
          <Gallery />
          <section className="final">
            <h2 className="final-message">
              💖 Forever yours, Rashi Baby 💖
            </h2>
            <p className="final-subtitle">
              Always here, always caring — <strong>Yours, Shashank</strong>
            </p>
          </section>
          <button className="back-btn" onClick={() => setCurrentPage(3)}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
