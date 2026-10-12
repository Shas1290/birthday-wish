import React, { useMemo } from 'react';
import config from '../config.js';
import './Landing.css';

/**
 * Landing Component - The enchanted first impression screen
 * Features a dynamic twinkling starfield, floating sparkles, staggered entrance animations,
 * and an inviting glowing call-to-action button.
 */
export default function Landing({ onStart }) {
  // Generate random floating particles and twinkling stars once on mount
  const particles = useMemo(() => {
    const items = [];
    const particleColors = [
      config.colors.primary,
      config.colors.secondary,
      config.colors.accent,
      config.colors.primaryLight,
      config.colors.white,
    ];

    // Generate 36 ambient floating sparkles and star dust
    for (let i = 0; i < 36; i++) {
      const size = Math.random() * 4 + 2; // 2px - 6px
      const isStar = i % 3 === 0;
      items.push({
        id: i,
        isStar,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        size: `${size.toFixed(1)}px`,
        duration: `${(Math.random() * 6 + 5).toFixed(1)}s`, // 5s - 11s
        delay: `${(Math.random() * 5).toFixed(1)}s`,
        opacity: (Math.random() * 0.6 + 0.3).toFixed(2),
        color: particleColors[i % particleColors.length],
      });
    }
    return items;
  }, []);

  const handleClick = (e) => {
    if (onStart && typeof onStart === 'function') {
      onStart(e);
    }
  };

  return (
    <section className="landing-container" aria-label="Welcome screen">
      {/* Background ambient lighting effects */}
      <div className="landing-ambient-glow glow-top" />
      <div className="landing-ambient-glow glow-bottom" />

      {/* Floating Sparkles & Starfield */}
      <div className="landing-particles-wrapper" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`landing-particle ${p.isStar ? 'particle-star' : 'particle-sparkle'}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size} ${p.color}`,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Main Hero Card & Staggered Typography */}
      <div className="landing-content">
        <div className="landing-badge">
          <span className="landing-badge-icon">✨</span>
          <span className="landing-badge-text">
            A Special Day for {config.birthdayPerson}
          </span>
          <span className="landing-badge-icon">✨</span>
        </div>

        <h1 className="landing-headline">
          {config.landing.headline}
        </h1>

        <p className="landing-subtitle">
          {config.landing.subtitle}
        </p>

        <div className="landing-action">
          <button
            type="button"
            className="landing-cta-button"
            onClick={handleClick}
            aria-label={config.landing.buttonText}
          >
            <span className="button-text">{config.landing.buttonText}</span>
            <span className="button-icon" aria-hidden="true">✨</span>
          </button>
        </div>
      </div>
    </section>
  );
}
