import React, { useEffect, useRef, useState, useMemo } from 'react';
import config from '../config.js';
import './Finale.css';

export default function Finale({ onReplay }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Set of floating hearts with varied positions, sizes, speeds, and delays
  const floatingHearts = useMemo(
    () => [
      { id: 1, left: '6%', size: 18, duration: 13, delay: 0, opacity: 0.35 },
      { id: 2, left: '15%', size: 28, duration: 18, delay: 3, opacity: 0.4 },
      { id: 3, left: '23%', size: 14, duration: 12, delay: 6.5, opacity: 0.3 },
      { id: 4, left: '33%', size: 24, duration: 16, delay: 1.5, opacity: 0.45 },
      { id: 5, left: '44%', size: 32, duration: 21, delay: 4.5, opacity: 0.35 },
      { id: 6, left: '54%', size: 16, duration: 14, delay: 8, opacity: 0.4 },
      { id: 7, left: '63%', size: 26, duration: 17, delay: 2, opacity: 0.3 },
      { id: 8, left: '72%', size: 20, duration: 15, delay: 5.5, opacity: 0.45 },
      { id: 9, left: '81%', size: 30, duration: 19, delay: 0.8, opacity: 0.35 },
      { id: 10, left: '90%', size: 16, duration: 12, delay: 7.2, opacity: 0.4 },
      { id: 11, left: '11%', size: 22, duration: 15, delay: 9.5, opacity: 0.3 },
      { id: 12, left: '49%', size: 20, duration: 16, delay: 11, opacity: 0.35 },
      { id: 13, left: '87%', size: 18, duration: 14, delay: 10, opacity: 0.38 },
      { id: 14, left: '28%', size: 25, duration: 20, delay: 4, opacity: 0.28 },
    ],
    []
  );

  const handleReplay = () => {
    if (typeof onReplay === 'function') {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const titleText = `${config.finale.title}, ${config.birthdayPerson}! ❤️`;
  const signatureText = `${config.finale.signature} ${config.senderName}`;

  return (
    <section
      ref={sectionRef}
      className={`finale-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Birthday Finale"
    >
      {/* Background Floating Hearts */}
      <div className="finale-hearts-container" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              opacity: heart.opacity,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Ambient background glow orb */}
      <div className="finale-ambient-glow" aria-hidden="true" />

      {/* Centered Main Content */}
      <div className="finale-content">
        <div className="finale-badge">
          <span className="badge-sparkle">✨</span>
          <span>Endless Love &amp; Wishes</span>
          <span className="badge-sparkle">✨</span>
        </div>

        <h1 className="finale-heading">{titleText}</h1>

        <p className="finale-message">{config.finale.message}</p>

        <div className="finale-actions">
          <button
            type="button"
            className="finale-replay-btn"
            onClick={handleReplay}
            aria-label="Celebrate again from the beginning"
          >
            <span className="replay-icon" aria-hidden="true">↺</span>
            <span className="replay-text">{config.finale.replayButton}</span>
          </button>
        </div>

        <footer className="finale-footer">
          <p className="finale-signature">
            {signatureText} <span className="signature-heart">❤️</span>
          </p>
        </footer>
      </div>
    </section>
  );
}
