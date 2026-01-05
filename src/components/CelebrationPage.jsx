import { gsap } from "gsap";
import { useEffect, useState } from "react";
import "./CelebrationPage.css";
import Confetti from "./Confetti";

// Floating hearts
const generateHeartPositions = () =>
  [...Array(15)].map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
  }));

const heartPositions = generateHeartPositions();

function CelebrationPage({ onComplete, musicPlayerRef }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [activatedButtons, setActivatedButtons] = useState({
    lights: false,
    music: false,
    decorate: false,
    balloons: false,
    message: false,
  });
  const [lightsOn, setLightsOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Slides (personalized)
  const slides = [
    {
      icon: "🎂",
      text: "Hey Rashi Baby… today is YOUR day 💖",
      type: "announcement",
    },
    {
      icon: "👀",
      text: "I made something special just for you… wanna see it?",
      type: "question",
      options: [
        { text: "Yes, show me 🥹", value: "yes" },
        { text: "Nope 🙄", value: "no" },
      ],
    },
    {
      icon: "✨",
      text: "Okay… this is just for you 💌",
      type: "announcement",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      gsap.to(".slide-content", {
        opacity: 0,
        y: -30,
        duration: 0.4,
        onComplete: () => {
          setCurrentSlide(currentSlide + 1);
          gsap.fromTo(
            ".slide-content",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        },
      });
    } else {
      gsap.to(".slides-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        onComplete: () => setShowButtons(true),
      });
    }
  };

  const handleAnswer = (value) => {
    if (value === "no") {
      gsap.to(".question-options", {
        rotation: 2,
        duration: 0.1,
        yoyo: true,
        repeat: 6,
      });
    } else {
      handleNext();
    }
  };

  const handleButtonClick = (type) => {
    if (activatedButtons[type]) return;

    const button = document.querySelector(`[data-button="${type}"]`);
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    setActivatedButtons((prev) => ({ ...prev, [type]: true }));

    if (type === "lights") {
      setLightsOn(true);
      gsap.to(".celebration-page", {
        background:
          "linear-gradient(135deg, #1a0a1f 0%, #2d1b3d 50%, #1f0f29 100%)",
        duration: 1.5,
      });
      return;
    }

    if (type === "music") {
      if (musicPlayerRef?.current) {
        musicPlayerRef.current.play();
      }
    }

    if (type === "balloons") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    if (type === "message") {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }
  };

  return (
    <div className={`celebration-page ${lightsOn ? "lights-on" : ""}`}>
      {showConfetti && <Confetti />}

      {/* Floating hearts */}
      <div className="floating-hearts-bg">
        {heartPositions.map((pos, i) => (
          <div
            key={i}
            className="heart-float"
            style={{
              left: `${pos.left}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          >
            💗
          </div>
        ))}
      </div>

      {/* Slides */}
      {!showButtons && (
        <div className="slides-container">
          <div className="slide-content">
            <div className="slide-icon">{slides[currentSlide].icon}</div>
            <h2 className="slide-text">{slides[currentSlide].text}</h2>

            {slides[currentSlide].type === "question" ? (
              <div className="question-options">
                {slides[currentSlide].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-button ${
                      opt.value === "yes" ? "yes-button" : "no-button"
                    }`}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <button className="next-button" onClick={handleNext}>
                {currentSlide < slides.length - 1 ? "Next" : "Let’s Go 💖"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Celebration */}
      {showButtons && (
        <>
          <div className="celebration-buttons">
            <h2 className="celebration-title">Happy Birthday Rashi 💖</h2>
            <p className="celebration-subtitle">
              Let’s make this moment a little magical ✨
            </p>

            <div className="buttons-grid">
              {!activatedButtons.lights && (
                <button
                  className="action-button lights-button"
                  data-button="lights"
                  onClick={() => handleButtonClick("lights")}
                >
                  💡 Set the Mood
                </button>
              )}

              {activatedButtons.lights && !activatedButtons.music && (
                <button
                  className="action-button music-button"
                  data-button="music"
                  onClick={() => handleButtonClick("music")}
                >
                  🎵 Play Our Song
                </button>
              )}

              {activatedButtons.music && !activatedButtons.decorate && (
                <button
                  className="action-button decorate-button"
                  data-button="decorate"
                  onClick={() => handleButtonClick("decorate")}
                >
                  🎨 Make It Pretty
                </button>
              )}

              {activatedButtons.decorate && !activatedButtons.balloons && (
                <button
                  className="action-button balloons-button"
                  data-button="balloons"
                  onClick={() => handleButtonClick("balloons")}
                >
                  🎈 Fill the Air with Love
                </button>
              )}

              {activatedButtons.balloons && (
                <button
                  className="action-button message-button"
                  data-button="message"
                  onClick={() => handleButtonClick("message")}
                >
                  💌 I Have Something to Tell You
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CelebrationPage;
