import React, { useState, useMemo } from 'react';
import config from '../config.js';
import './Celebration.css';

export default function Celebration() {
  const { birthdayPerson, colors, celebration } = config;
  const [poppedBalloons, setPoppedBalloons] = useState({});

  // Generate balloon configurations
  const balloons = useMemo(() => {
    const palette = colors.confetti && colors.confetti.length > 0
      ? colors.confetti
      : ['#FF6B9D', '#FFD1DC', '#C9A96E', '#FF8FB5', '#E0C68F'];

    return [
      { id: 1, left: 8, bottom: -120, size: 55, color: palette[0 % palette.length], duration: 11, delay: 0, swayDuration: 3.5 },
      { id: 2, left: 20, bottom: -130, size: 68, color: palette[1 % palette.length], duration: 13, delay: 2, swayDuration: 4.2 },
      { id: 3, left: 34, bottom: -110, size: 50, color: palette[2 % palette.length], duration: 10, delay: 4, swayDuration: 3.8 },
      { id: 4, left: 62, bottom: -140, size: 62, color: palette[3 % palette.length], duration: 12, delay: 1, swayDuration: 4.5 },
      { id: 5, left: 78, bottom: -120, size: 54, color: palette[4 % palette.length], duration: 11.5, delay: 3, swayDuration: 3.2 },
      { id: 6, left: 89, bottom: -135, size: 65, color: palette[5 % palette.length] || palette[0], duration: 14, delay: 0.5, swayDuration: 4.0 },
      { id: 7, left: 48, bottom: -125, size: 58, color: palette[6 % palette.length] || palette[1], duration: 12.5, delay: 5, swayDuration: 3.6 },
    ];
  }, [colors.confetti]);

  // Generate confetti pieces
  const confettiPieces = useMemo(() => {
    const palette = colors.confetti && colors.confetti.length > 0
      ? colors.confetti
      : ['#FF6B9D', '#FFD1DC', '#C9A96E', '#FF8FB5', '#E0C68F'];

    const pieces = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const isCircle = i % 3 === 0;
      const size = 6 + (i % 6);
      pieces.push({
        id: i,
        left: `${(i * 3.6 + 2) % 96}%`,
        color: palette[i % palette.length],
        size,
        isCircle,
        duration: 5.5 + (i % 5) * 1.2,
        delay: (i % 7) * 0.8,
        opacity: 0.7 + (i % 4) * 0.08,
      });
    }
    return pieces;
  }, [colors.confetti]);

  const handleBalloonClick = (id) => {
    setPoppedBalloons(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      // Re-inflate balloon after a few seconds for endless fun
      setPoppedBalloons(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 4000);
  };

  return (
    <section className="celebration-container" aria-label="Birthday Celebration">
      {/* Background decorative glows */}
      <div className="celebration-glow celebration-glow-1" />
      <div className="celebration-glow celebration-glow-2" />

      {/* Confetti overlay */}
      <div className="celebration-confetti-container" aria-hidden="true">
        {confettiPieces.map((piece) => (
          <span
            key={piece.id}
            className={`celebration-confetti-item ${piece.isCircle ? 'is-circle' : 'is-rect'}`}
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: piece.isCircle ? `${piece.size}px` : `${piece.size * 1.5}px`,
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
              opacity: piece.opacity,
            }}
          />
        ))}
      </div>

      {/* Floating balloons */}
      <div className="celebration-balloons-container" aria-hidden="true">
        {balloons.map((balloon) => {
          const isPopped = poppedBalloons[balloon.id];
          return (
            <div
              key={balloon.id}
              className={`celebration-balloon-track ${isPopped ? 'is-popped' : ''}`}
              style={{
                left: `${balloon.left}%`,
                animationDuration: `${balloon.duration}s`,
                animationDelay: `${balloon.delay}s`,
              }}
              onClick={() => handleBalloonClick(balloon.id)}
              role="button"
              tabIndex={-1}
              title="Click to pop!"
            >
              <div
                className="celebration-balloon-sway"
                style={{
                  animationDuration: `${balloon.swayDuration}s`,
                }}
              >
                <div
                  className="celebration-balloon-body"
                  style={{
                    width: `${balloon.size}px`,
                    height: `${balloon.size * 1.25}px`,
                    backgroundColor: balloon.color,
                    boxShadow: `inset -6px -6px 12px rgba(0, 0, 0, 0.12), inset 6px 6px 12px rgba(255, 255, 255, 0.45)`,
                  }}
                >
                  <div className="celebration-balloon-shine" />
                  <div
                    className="celebration-balloon-knot"
                    style={{ borderTopColor: balloon.color }}
                  />
                  <div className="celebration-balloon-string" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="celebration-content">
        <div className="celebration-badge-wrap">
          <span className="celebration-sparkle celebration-sparkle-left">✨</span>
          <p className="celebration-title">{celebration.title || 'HAPPY BIRTHDAY'}</p>
          <span className="celebration-sparkle celebration-sparkle-right">✨</span>
        </div>

        <h1 className="celebration-name">{birthdayPerson}</h1>

        {celebration.subtitle && (
          <p className="celebration-subtitle">{celebration.subtitle}</p>
        )}

        {celebration.message && (
          <div className="celebration-card">
            <div className="celebration-card-decor celebration-card-decor-top">🎉 💖 🎂</div>
            <p className="celebration-message">{celebration.message}</p>
            <div className="celebration-card-footer">
              <span className="celebration-ribbon">With lots of love 💕</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
